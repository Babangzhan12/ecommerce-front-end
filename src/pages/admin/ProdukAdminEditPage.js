import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { useNavigate, useParams } from "react-router-dom";
import { findAllKategori } from "../../services/KategoriService";
import { findProdukById, updateProduk } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { APP_BASE_URL } from "../../configs/constants";
import { FileUpload } from "primereact/fileupload";

const ProdukAdminEditPage = () => {
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmmited] = useState(false);

    const navigate = useNavigate();

    const [img, setImg] = useState();

    const { id } = useParams();

    useEffect(() => {
        const loadKategori = async () => {
            try {
                const response = await findAllKategori();
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadKategori();

        const loadProduct = async () => {
            try {
                const response = await findProdukById(id);
                const _product = response.data;
                setProducts(_product);
                if (_product.gambar) {
                    fetchImage(_product.gambar);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        loadProduct();
        // eslint-disable-next-line
    }, [id]);

    const saveProduk = async () => {
        try {
            setSubmmited(true);
            const response = await updateProduk(products);
            const _product = response.data;
            navigate(`/admin/produk/detail/${_product.id}`, {
                replace: true,
            });
        } catch (error) {
            console.error(error);
        }
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchImage = async (gambar) => {
        const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    }

    const onUpload = async (event) => {
        const [file] = event.files;
        const imageObjectURL = URL.createObjectURL(file);
        setImg(imageObjectURL);
        const response = JSON.parse(event.xhr.response);
        const _products = products;
        _products.gambar = response.fileName;
    }

    const onBeforeSend = (event) => {
        if (user && user.token) {
            event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
        }
    }

    return (
        <MainPage>
            {loading ?
                <ProgressBar mode="indeterminate" className="my-progress-bar" />
                :
                <div className="main-content">
                    <div className="content">
                        <div className="content-inner">
                            <div className="content-header">
                                <h2>Edit Produk</h2>
                            </div>
                            <div className="content-body">
                                <div className="content-form shadow-1">
                                    <div className="flex">
                                        <div className="flex-grow-1">
                                            <div className="p-fluid mb-4">
                                                <div className="p-field mb-3">
                                                    <label htmlFor="nama" className="form-label">
                                                        Nama
                                                    </label>
                                                    <InputText
                                                        value={products.name}
                                                        placeholder="Ketik nama produk"
                                                        id="nama"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || "";
                                                            const _product = { ...products };
                                                            _product.name = val;
                                                            setProducts(_product);
                                                        }}
                                                    />
                                                    {submitted && !products.name && (
                                                        <span className="p-error">
                                                            Nama produk tidak boleh kosong
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="kategori" className="form-label">
                                                        Kategori
                                                    </label>
                                                    <Dropdown
                                                        optionLabel="name"
                                                        optionValue="id"
                                                        id="category"
                                                        value={products.category.id}
                                                        options={categories}
                                                        placeholder="Pilih kategori"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || null;
                                                            const _product = { ...products };
                                                            _product.category.id = val;
                                                            setProducts(_product);
                                                        }}
                                                    />
                                                    {submitted && !products.category.id && (
                                                        <span className="p-error">
                                                            Kategori produk harus dipilih
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="deskripsi" className="form-label">
                                                        Deskripsi
                                                    </label>
                                                    <InputText
                                                        value={products.description}
                                                        placeholder="Ketik deskripsi produk"
                                                        id="description"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || "";
                                                            const _product = { ...products };
                                                            _product.description = val;
                                                            setProducts(_product);
                                                        }}
                                                    />
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="harga" className="form-label">
                                                        Harga
                                                    </label>
                                                    <InputText
                                                        value={products.price}
                                                        placeholder="Ketik harga produk"
                                                        id="price"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || "";
                                                            const _product = { ...products };
                                                            _product.price = val;
                                                            setProducts(_product);
                                                        }}
                                                    />
                                                    {submitted && !products.price && (
                                                        <span className="p-error">
                                                            Harga produk tidak boleh kosong
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="stok" className="form-label">
                                                        Stok
                                                    </label>
                                                    <InputText
                                                        value={products.stock}
                                                        placeholder="Ketik stok produk"
                                                        id="stock"
                                                        onChange={(e) => {
                                                            const val = (e.target && e.target.value) || "";
                                                            const _product = { ...products };
                                                            _product.stock = val;
                                                            setProducts(_product);
                                                        }}
                                                    />
                                                    {submitted && !products.stock && (
                                                        <span className="p-error">
                                                            Stok produk tidak boleh kosong
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <Button
                                                    label="Simpan"
                                                    icon="pi pi-check"
                                                    onClick={saveProduk}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-none ml-6 mt-4"
                                            style={{ textAlign: "center" }}>
                                            <div className="image-display-wrapper">
                                                {
                                                    img ?
                                                        <img src={img}
                                                            alt="Gambar Produk"
                                                            className="image-display"
                                                        /> :
                                                        <i className="icon-display pi pi-image"></i>
                                                }
                                            </div>
                                            <FileUpload
                                                name="file"
                                                url={`${APP_BASE_URL}/api/uploadImage`}
                                                auto
                                                accept="image/*"
                                                onUpload={onUpload}
                                                onBeforeSend={onBeforeSend}
                                                chooseLabel="Pilih Gambar"
                                                mode="basic" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </MainPage>
    )
}

export default ProdukAdminEditPage;
