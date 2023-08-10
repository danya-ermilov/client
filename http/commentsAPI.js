import { authInstance } from "./index.js";

export const get = async (id) => {
  const { data } = await authInstance.get(`comment/product/${id}/get`);
  return data;
};

export const put = async (id, comment) => {
  const { data } = await authInstance.put(`comment/update/${id}`, comment);
  return data;
};

export const post = async (id, comment) => {
  const { data } = await authInstance.post(
    `comment/product/${id}/create`,
    comment
  );
  return data;
};

export const delete_comment = async (id) => {
  const { data } = await authInstance.delete(`comment/delete/${id}`);
  return data;
};
