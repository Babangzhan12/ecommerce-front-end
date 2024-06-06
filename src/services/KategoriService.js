import api from "./api";

export const findAllKategori = async() => {
    return await api.get("/api/categories");
}

export const createKategori = async (category) => {
    return await api.post("/api/categories", category);
}

export const updateKategori = async (category) => {
    return await api.put("/api/categories", category);
}

export const deleteKategoriById = async (id) => {
    return await api.delete(`/api/categories/${id}`);
}