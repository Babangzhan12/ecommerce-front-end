import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { findAllProduk } from "../../services/ProdukService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const ProdukAdminListPage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const response = await findAllProduk();
                setProducts(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        load();
    }, []);

    const namaBodyTemplate = (row) => {
        return(
            <Link to={`/admin/produk/detail/${row.id}`} className="cell-link">
                {row.name}
            </Link>
        )
    }

    return (
        <MainPage>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Produk</h2>
                            <div>
                                <Link to="/admin/produk/create"
                                    style={{ textDecoration: "none" }}>
                                    <Button label="Tambah"
                                        icon="pi pi-plus" />
                                </Link>
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable value={products}
                                    size="small"
                                    stripedRows
                                    className="table-view">
                                    <Column field="name" header="Nama Produk" body={namaBodyTemplate}/>
                                    <Column field="category.name" header="Kategori" />
                                    <Column field="price" header="Harga"
                                        style={{ width: "100px" }} />
                                    <Column field="stock" header="Stok"
                                        style={{ width: "100px" }} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainPage>
    )
}

export default ProdukAdminListPage;