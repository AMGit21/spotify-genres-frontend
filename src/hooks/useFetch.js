import { useState, useEffect } from "react";
import fetchDataFromApi from "../utils/fetchDataFromApi";
import getCachedData from "../utils/getCachedData";
import cacheData from "../utils/cacheData";

const useFetch = (url, cacheKey) => {
  const [data, setData] = useState(() => getCachedData(cacheKey));
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDataFromApi(url);
        setData(data);
        cacheData(cacheKey, data); // Cache data in local storage
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [url, cacheKey, data]);

  return { data, loading, error };
};

export default useFetch;
