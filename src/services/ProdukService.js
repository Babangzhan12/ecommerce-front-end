import api from "./api";

export const findAllProduk = async() => {
    return await api.get("/api/products");
}

export const findProdukById = async (id) => {
    return await api.get(`/api/products/${id}`);
}

export const createProduk = async (product) => {
    return await api.post("/api/products", product);
}

export const updateProduk = async (product) => {
    return await api.put("/api/products", product);
}

export const deleteProdukById = async (id) => {
    return await api.delete(`/api/products/${id}`);
}