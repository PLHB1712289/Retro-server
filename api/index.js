const axios = require("axios");
const queryString = require("query-string");

const axiosClient = axios.create({
  baseURL: "https://graph.facebook.com",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request
axiosClient.interceptors.request.use((config) => {
  // ..Handle token
  return config;
});

// Handle response
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // ..Handle error

    throw error;
  }
);

module.exports = axiosClient;
