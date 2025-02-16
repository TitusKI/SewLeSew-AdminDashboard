import Cookie from "js-cookie";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { isValidEmail } from "../utils/validators";
import { decodeToken } from "../utils/auth";

export const signIn = async (signinData, onIsLoading, onError, setUser) => {
  onIsLoading(true); // Indicate that the request has started

  try {
    // Determine whether identifier is an email or phone number
    const identifierBody = isValidEmail(signinData.identifier)
      ? { email: signinData.identifier }
      : { phoneNumber: signinData.identifier };

    const reqBody = {
      ...identifierBody,
      password: signinData.password,
    };

    // Make API request
    const { data } = await axiosInstance.post("/auth/local/signin", reqBody);

    // Ensure successful authentication
    if (!data.access_token || !data.refresh_token) {
      throw new Error("Invalid response from server");
    }

    // Store tokens securely in cookies
    Cookie.set("access_token", data.access_token, {
      secure: true,
      sameSite: "Strict",
    });
    Cookie.set("refresh_token", data.refresh_token, {
      secure: true,
      sameSite: "Strict",
    });

    const user = decodeToken("access_token");
    if (user) setUser(user);

    return data;
  } catch (error) {
    onIsLoading(false); // Stop loading on error

    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      onError(errData.message || "Authentication failed.");
      console.error("Sign-in error:", errData);
    } else {
      onError("An unexpected error occurred. Could not sign you in.");
      console.error("Unexpected sign-in error:", error);
    }
    console.log("error", error);
  } finally {
    onIsLoading(false);
  }
};

export const logout = async (removeUser) => {
  try {
    await axiosInstance.post("/auth/logout", {
      headers: {
        Authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });

    // Remove the authentication token from cookies
    Cookie.remove("access_token");
    removeUser();
    // Optional: Redirect to login or home page
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed:", err);
    throw new Error("Failed to log out. Please try again.");
  }
};
