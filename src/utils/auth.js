import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const decodedToken = decodeToken("access_token");
  if (!decodedToken) return false;
  const isAuthed = decodedToken.exp
    ? decodedToken.exp > Date.now() / 1000
    : false;

  return isAuthed;
};

export function decodeToken(tokenName) {
  const token = Cookie.get(tokenName);

  if (!token) return null;

  const decodedToken = jwtDecode(token);

  return decodedToken;
}
export function getTokenExpiryTime(token) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp ? decoded.exp - now : 0;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return 0; // Treat invalid token as expired
  }
}
