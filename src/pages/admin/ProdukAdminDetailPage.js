import React, { useEffect, useState } from "react";
import MainPage from "../../component/MainPage";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteProdukById, findProdukById } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { APP_BASE_URL } from "../../configs/constants";

const ProdukAdminDetailPage = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

  const [img, setImg] = useState();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await findProdukById(id);
        const _product = response.data;
        setProduct(_product);
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

  const handleDelete = async () => {
    try {
      await deleteProdukById(id);
      navigate("/admin/produk", {
        replace: true
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainPage>
      {loading ?
        <ProgressBar mode="indeterminate"
          className="my-progress-bar" /> :
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Detail Produk {product.name}</h2>
                <div>
                  <Link to="/admin/produk"
                    style={{ textDecoration: "none" }}>
                    <Button label="Kembali"
                      icon="pi pi-chevron-left"
                      className="mr-2" />
                  </Link>

                  <Link to={`/admin/produk/edit/${product.id}`}
                    style={{ textDecoration: "none" }}>
                    <Button label="Edit"
                      icon="pi pi-pencil"
                      className="mr-2" />
                  </Link>

                  <Button label="Hapus"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => setDelDialog(true)}
                  />
                  
                </div>
              </div>
              <div className="content-body">
                <div className="content-detail shadow-1">
                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="grid">
                        <div className="col-fixed detail-label">Nama Produk</div>
                        <div className="col">{product.name}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Kategori</div>
                        <div className="col">{product.category.name}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Deskripsi</div>
                        <div className="col">{product.description}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Harga</div>
                        <div className="col">{product.price}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Stok</div>
                        <div className="col">{product.stock}</div>
                      </div>
                    </div>
                    <div className="flex-none">
                      <div className="image-display-wrapper">
                        {
                          img ?
                          <img src={img}
                          alt="Gambar Produk"
                          className="image-display" /> :
                          <i className="icon-display pi pi-image"></i>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ConfirmDialog visible={delDialog}
                onHide={() => setDelDialog(false)}
                message="Apakah anda yakin akan menghapus data ini?"
                header="Konfirmasi"
                icon="pi pi-exclamation-triangle"
                accept={handleDelete}
              />
            </div>
          </div>
        </div>
      }

    </MainPage>
  )
}

export default ProdukAdminDetailPage;
