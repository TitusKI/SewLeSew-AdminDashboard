import axios from "axios";
import axiosInstance from "./axiosInstance";
export const getCampaigns = async (page, limit) => {
  try {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    // if (category) params.append("category", category);
    // if (fullName) params.append("for", fullName);

    // If no parameters are set, optionally throw an error or log it
    if (params.toString() === "") {
      console.warn("No query parameters were added to the request.");
    }

    const url = `/campaign/admin?${params.toString()}`;
    const res = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Log the error data for debugging
      console.error("Axios error response:", err.response?.data);
      throw new Error(
        err.response?.data.message ||
          "An error occurred while fetching campaigns."
      );
    }

    // Handle other types of errors
    console.error("Unexpected error:", err);
    throw new Error("An unexpected error occurred");
  }
};

export const getCampaignStats = async () => {
  try {
    const { data } = await axiosInstance.get(`/stats/campaigns/count`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      console.error("fetching error: ", errData);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const changeCampaignStatus = async (id, status) => {
  try {
    const { data } = await axiosInstance.patch(`/campaign/${id}/status`, {
      status,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data;
      console.error("fetching error: ", errData);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
