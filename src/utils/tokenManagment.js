import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const refreshToken = jwtDecode(data?.access_token);
  localStorage.setItem("refreshTokenTimestamp", refreshToken.exp * 1000);
};

export const shouldRefreshToken = () => {
  const refreshTokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
  if (!refreshTokenTimestamp) return false;

  const currentTime = Date.now();
  const isTokenExpired = currentTime >= parseInt(refreshTokenTimestamp);

  return isTokenExpired;
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
