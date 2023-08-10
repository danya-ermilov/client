import { authInstance } from "./index.js";

export const fetchBasket = async () => {
  const { data } = await authInstance.get("basket/getone");
  return data;
};

export const append = async (id) => {
  const { data } = await authInstance.put(`basket/product/${id}/append`);
  return data;
};

export const remove = async (id) => {
  const { data } = await authInstance.put(`basket/product/${id}/remove`);
  return data;
};

export const clear = async () => {
  const { data } = await authInstance.put(`basket/clear`);
  return data;
};
