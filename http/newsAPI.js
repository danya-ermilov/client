import { authInstance } from "./index.js";

export const get = async () => {
  const { data } = await authInstance.get(`news/get`);
  return data;
};

export const put = async (id, news) => {
  const { data } = await authInstance.put(`news/update/${id}`, news);
  return data;
};

export const post = async (news) => {
  const { data } = await authInstance.post(`news/create`, news);
  return data;
};

export const delete_news = async (id) => {
  const { data } = await authInstance.delete(`news/delete/${id}`);
  return data;
};
