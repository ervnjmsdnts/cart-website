import client from "./client.js";

const fetcher = async (url) =>
  client.get(url).then((response) => response.data);

const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
};

export default swrConfig;
