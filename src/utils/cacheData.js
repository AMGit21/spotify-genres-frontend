const cacheData = (cacheKey, data) => {
  localStorage.setItem(cacheKey, JSON.stringify(data));
};

export default cacheData;
