import axios from "axios";
import { session } from "@/constants";

const getHeaders = function () {
  const jwtToken = sessionStorage.getItem(session.JWT_TOKEN);
  const jwtType = sessionStorage.getItem(session.JWT_TYPE);
  return {
    "Content-type": "application/json",
    Authorization: `${jwtType} ${jwtToken}`,
  };
};

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export { getHeaders, http };
