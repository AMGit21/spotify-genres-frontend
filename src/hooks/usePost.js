import { useState, useEffect } from "react";
import axios from "axios";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const sendRequest = (data) => {
    console.log("Sending request data:", data); // Log the request data
    setRequestData(data);
    setTrigger((prev) => !prev); // Trigger useEffect
  };

  useEffect(() => {
    if (!requestData) return;

    const postData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before new request
        const response = await axios.post(url, requestData);
        setData(response.data);
      } catch (err) {
        if (err.response) {
          console.error("Server responded with an error:", err.response.data);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error creating the request:", err.message);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [trigger, url, requestData]); // Dependencies ensure effect runs on changes

  return { data, loading, error, sendRequest };
};

export default usePost;
