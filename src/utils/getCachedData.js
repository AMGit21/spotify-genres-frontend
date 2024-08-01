const getCachedData = (cacheKey) => {
  try {
    const cachedData = localStorage.getItem(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error(`Error parsing JSON for key ${cacheKey}:`, error);
    // Clear the corrupted data to prevent further issues
    localStorage.removeItem(cacheKey);
    return null;
  }
};

export default getCachedData;
