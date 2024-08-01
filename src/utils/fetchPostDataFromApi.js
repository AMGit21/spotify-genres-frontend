import axios from "axios";

const fetchPostDataFromApi = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

export default fetchPostDataFromApi;
