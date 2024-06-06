import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import {
  createKategori,
  deleteKategoriById,
  findAllKategori,
  updateKategori,
} from "../../services/KategoriService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const KategoriAdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [submitted, setSubmmited] = useState(false);
  const [insertMode, setInsertMode] = useState(false);
  const emptyCategory = {
    id: null,
    name: "",
  };
  const [category, setCategory] = useState(emptyCategory);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const response = await findAllKategori();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  const openNew = () => {
    setInsertMode(true);
    setCategoryDialog(true);
    setSubmmited(false);
    setCategory(emptyCategory);
  };

  const hideDialog = () => {
    setCategoryDialog(false);
    setSubmmited(false);
  };

  const hideDeleteDialog = () => {
    setDeleteCategoryDialog(false);
  };

  const editKategori = (category) => {
    setInsertMode(false);
    setSubmmited(false);
    setCategory({...category});
    setCategoryDialog(true);
  };

  const confirmDeleteCategory = (category) => {
    setCategory(category);
    setDeleteCategoryDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-plain p-mr-2"
          onClick={() => editKategori(rowData)}
        />

        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text p-button-plain"
          onClick={() => confirmDeleteCategory(rowData)}
        />
      </React.Fragment>
    );
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; index < categories.length; i++) {
      if (categories[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const saveCategory = async () => {
    try {
      setSubmmited(true);
      if (category.name.trim()) {
        if (insertMode) {
          const response = await createKategori(category);
          const data = response.data;
          const _categories = [...categories];
          _categories.push(data);
          setCategories(_categories);
        } else {
          const response = await updateKategori(category);
          const data = response.data;
          const _categories = [...categories];
          const index = findIndexById(data.id);
          _categories[index] = data;
          setCategories(_categories);
        }

        setInsertMode(false);
        setCategoryDialog(false);
        setCategory(emptyCategory);
        setSubmmited(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async () => {
    try {
      await deleteKategoriById(category.id);
      let _categories = categories.filter((val) => val.id !== category.id);
      setCategories(_categories);
      setDeleteCategoryDialog(false);
      setCategory(emptyCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const categoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Simpan category"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveCategory}
      />
    </React.Fragment>
  );

  const deleteCategoryDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDialog}
      />
      <Button
        label="Hapus"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteCategory}
      />
    </React.Fragment>
  );

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Kategori</h2>
              <div className="p-d-inline">
                <Button
                  label="Tambah"
                  icon="pi pi-plus"
                  className="p-mr-2"
                  onClick={openNew}
                />
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable
                  value={categories}
                  size="small"
                  className="table-view"
                  stripedRows
                >
                  <Column field="name" header="Nama Kategori"></Column>
                  <Column
                    body={actionBodyTemplate}
                    style={{ width: "120px", textAlign: "right" }}
                  ></Column>
                </DataTable>
              </div>
            </div>

            <Dialog visible={categoryDialog}
            style={{ width: "500px" }}
            header="Category"
            modal
            className="p-fluid"
            onHide={hideDialog}
            footer={categoryDialogFooter}>
                <div className="p-field">
                    <label htmlFor="nama">Nama</label>
                    <InputText id="name"
                    value={category.name}
                    onChange={(e) => {
                        const val = (e.target && e.target.value) || '';
                        const _category = {...category};
                        _category.name = val;
                        setCategory(_category);
                    }}
                    />
                    {submitted && !category.name && <small className="p-error">Nama harus diisi</small>}
                </div>
            </Dialog>
            <Dialog visible={deleteCategoryDialog}
            style={{ width:"500px" }}
            header="Konfirmasi"
            modal
            footer={deleteCategoryDialogFooter}
            onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize:"2rem" }}></i>
                    {category && <span>Apakah anda yakin akan menghapus category <b>{category.name}</b>?</span>}
                </div>
            </Dialog>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default KategoriAdminPage;
