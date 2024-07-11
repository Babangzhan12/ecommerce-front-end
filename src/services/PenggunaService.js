import api from "./api";

export const findPenggunaById = async (id) => {
    return await api.get(`/api/pengguna`)
}

export const updateProfile = async (pengguna) => {
    return await api.put("/api/profile", pengguna);
}