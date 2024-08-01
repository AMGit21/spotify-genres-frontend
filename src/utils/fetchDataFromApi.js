import axios from "axios";

const fetchDataFromApi = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle specific error types if needed
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with error:", error.response.data);
      // Handle the error here, e.g., return an empty array or a default value
      return []; // Or return a default value
    } else if (error.request) {
      // The request was made but no response was received
      // Network error or timeout
      console.error("Network error:", error.message);
      // Handle the error here, e.g., return an empty array or a default value
      return []; // Or return a default value
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      // Handle the error here, e.g., return an empty array or a default value
      return []; // Or return a default value
    }
  }
};

export default fetchDataFromApi;
