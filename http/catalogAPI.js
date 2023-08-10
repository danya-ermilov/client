import { guestInstance, authInstance } from "./index.js";

/*
 * Создание, обновление и удаление категории, получение списка всех категорий
 */
export const createCategory = async (category) => {
  const { data } = await authInstance.post("category/create", category);
  return data;
};

export const updateCategory = async (id, category) => {
  const { data } = await authInstance.put(`category/update/${id}`, category);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await authInstance.delete(`category/delete/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await guestInstance.get("category/getall");
  return data;
};

/*
 * Создание, обновление и удаление бренда, получение списка всех брендов
 */
export const createBrand = async (brand) => {
  const { data } = await authInstance.post("brand/create", brand);
  return data;
};

export const updateBrand = async (id, brand) => {
  const { data } = await authInstance.put(`brand/update/${id}`, brand);
  return data;
};

export const deleteBrand = async (id) => {
  const { data } = await authInstance.delete(`brand/delete/${id}`);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await guestInstance.get("brand/getall");
  return data;
};

/*
 * Создание, обновление и удаление товара, получение списка всех товаров
 */
export const createProduct = async (product) => {
  const { data } = await authInstance.post("product/create", product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await authInstance.put(`product/update/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await authInstance.delete(`product/delete/${id}`);
  return data;
};

export const fetchAllProducts = async (
  categoryId,
  brandId,
  page,
  limit,
  name,
  sort
) => {
  let url = "product/getall";
  // фильтрация товаров по категории и/или бренду
  if (categoryId) url = url + "/categoryId/" + categoryId;
  if (brandId) url = url + "/brandId/" + brandId;
  const { data } = await guestInstance.get(url, {
    params: {
      // GET-параметры для постраничной навигации
      page,
      limit,
      name,
      sort,
    },
  });
  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await guestInstance.get(`product/getone/${id}`);
  return data;
};

export const fetchProdRating = async (id) => {
  const { data } = await guestInstance.get(`rating/product/${id}`);
  return data;
};

export const to_rate = async (id, rate) => {
  const { data } = await authInstance.post(`rating/product/${id}/rate/${rate}`);
  //console.log(data);
  return data;
};

export const rate = async (id) => {
  const data = await authInstance.get(`rating/${id}`);
  return data;
};

export const delete_rate = async (id) => {
  const data = await authInstance.delete(`rating/product/${id}/delete`);
  return data;
};

export const fetchCategory = async (id) => {
  const { data } = await guestInstance.get(`category/getone/${id}`);
  return data;
};

export const fetchBrand = async (id) => {
  const { data } = await guestInstance.get(`brand/getone/${id}`);
  return data;
};

export async function download_zip(product) {
  //const response = await authInstance.get(`product/download/${id}`);
  const response = await fetch(
    process.env.REACT_APP_API_URL + `product/download/${product.id}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${product.name}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
