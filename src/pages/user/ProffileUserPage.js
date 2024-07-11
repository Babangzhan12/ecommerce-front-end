import React, { useEffect, useRef, useState } from "react";
import MainPage from "../../component/MainPage";
import { useAuth } from "../../auth/useAuth";
import { findByPenggunaId } from "../../services/PenggunaService";
import { updateKategori } from "../../services/KategoriService";
import {Toast} from "primereact/toast";

const ProffileUserPage = () => {
    const toast = useRef(null);
  const { user } = useAuth();
  const emptyPengguna = {
    id: null,
    nama: "",
    alamat: "",
    email: "",
  };

  const [pengguna, setPengguna] = useState(emptyPengguna);

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    try {
      const response = await findByPenggunaId(user.username);
      setPengguna(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfile = async () => {
    try {
        const response = await updateKategori(pengguna);
        const data = response.data;
        setPengguna(data);
        toast.current.show({
            severity: "info",
            summary: "Info",
            detail: "Profile sukses diupdate"
        });
    } catch (error) {
        console.error(error);
    }   
  }

  return (
      <MainPage>
        <Toast ref={toast} />
        
      </MainPage>
  )
};

export default ProffileUserPage;
