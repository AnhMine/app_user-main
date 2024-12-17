import img from "./../../image/breadcumb.jpg";
import "./Products.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductsUserDtos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [brands, setBrands] = useState<BrandDtos[]>([]);
  const [categorys, setCategorys] = useState<CategoryDtos[]>([]);
  const [actionPrice, setActionPrice] = useState<number>(0);
  const [actionBrand, setActionBrand] = useState<number>(0);
  const [actionCategory, setActionCategory] = useState<number>(0);

  const [isBtnSeeMore, setIsBtnSeeMore] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);

  const fetchProducts = async (action: number) => {
    let a = 1;
    if (action === 1) {
      a = numberPage + 1;
      setNumberPage(a);
    }
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Products/get-user?maxPageSize=${
          a * 16
        }&Pagesize=${a * 16}&PageNumber=1`
      );
      let productsData = response.data.data;

      if (action === 1) {
        if (response.data.pageCount < response.data.pageSize) {
          setIsBtnSeeMore(false);
        }
      } else {
        setIsBtnSeeMore(true);
      }

      const idCate = searchParams.get("id"); // Lấy giá trị của 'id'
      if (idCate) {
        let data: any[] = response.data.data;
        productsData = data.filter(
          (item: any) => item.categoryId === Number(idCate)
        );
      }
      setProducts(productsData);
      setActionBrand(0);
      setActionCategory(0);
      setActionPrice(0);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const sapXepSanPham = (action: number) => {
    setActionPrice(action);
    if (action === 1) {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (action === 2) {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    }
  };

  const sortByBrand = async (brandId: number) => {
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Products/get-user?maxPageSize=${
          numberPage * 16
        }&Pagesize=${numberPage * 16}&PageNumber=1`
      );
      const productsData: any[] = response.data.data;
      const filteredProducts = productsData.filter(
        (a) => a.brandId === brandId
      );
      setProducts(filteredProducts);
      setActionBrand(brandId);
      navigate("/sanpham");
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const sortByCategory = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `https://localhost:7048/api/Products/get-user?maxPageSize=${
          numberPage * 16
        }&Pagesize=${numberPage * 16}&PageNumber=1`
      );
      const productsData: any[] = response.data.data;
      const filteredProducts = productsData.filter(
        (a) => a.categoryId === categoryId
      );

      setProducts(filteredProducts);
      setActionCategory(categoryId);
      navigate("/sanpham");
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const loadDataFilter = async () => {
    try {
      const [category, brand] = await Promise.all([
        axios.get(
          "https://localhost:7048/api/Category/get-all-category?Pagesize=1000"
        ),
        axios.get(
          "https://localhost:7048/api/Brand/get-all-brand?Pagesize=1000"
        ),
      ]);
      setBrands(brand.data.data);
      setCategorys(category.data.data);
    } catch (error) {
      
    }
  };

  // bỏ dấu của chuỗi
  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize("NFD") // Chuẩn hóa chuỗi thành dạng tổ hợp (decomposed)
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự dấu
      .replace(/đ/g, "d") // Thay thế chữ "đ" thường
      .replace(/Đ/g, "D"); // Thay thế chữ "Đ" hoa
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(async () => {
      const value = event.target.value;
      try {
        const response = await axios.get(
          `https://localhost:7048/api/Products/get-user?maxPageSize=${
            numberPage * 16
          }&Pagesize=${numberPage * 16}&PageNumber=1`
        );
        const productsData: any[] = response.data.data;
        const filteredProducts = productsData.filter((a) => {
          const normalizedValue = removeVietnameseTones(
            value.toLowerCase().trim()
          );
          const productName = removeVietnameseTones(
            a.productName.toLowerCase().trim()
          );
          return productName.includes(normalizedValue);
        });
        setProducts(filteredProducts);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  useEffect(() => {
    fetchProducts(0);
    loadDataFilter();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }
  return (
    <>
      <div
        className="breadcumb_area bg-img"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="page-title text-center">
                <h2>Sản Phẩm</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="shop_grid_area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-2">
              <div className="container-filter">
                <button
                  onClick={() => fetchProducts(0)}
                  className={
                    actionPrice === 0 &&
                    actionCategory === 0 &&
                    actionBrand === 0
                      ? "btn-active"
                      : ""
                  }
                >
                  Tất cả
                </button>
                <div className="filer-content">
                  <h5>Khoảng giá:</h5>
                  <button
                    onClick={() => sapXepSanPham(1)}
                    className={actionPrice === 1 ? "btn-active" : ""}
                  >
                    Từ thấp đến cao
                  </button>
                  <button
                    onClick={() => sapXepSanPham(2)}
                    className={actionPrice === 2 ? "btn-active" : ""}
                  >
                    Từ cao đến thấp
                  </button>
                </div>
                <div className="filer-content">
                  <h5>Loại sản phẩm:</h5>
                  {categorys.map((category) => (
                    <button
                      onClick={() => sortByCategory(category.id)}
                      className={
                        actionCategory === category.id ? "btn-active" : ""
                      }
                    >
                      {" "}
                      {category.categoryName}{" "}
                    </button>
                  ))}
                </div>
                <div className="filer-content">
                  <h5>Thương hiệu:</h5>
                  {brands.map((brand) => (
                    <button
                      onClick={() => sortByBrand(brand.id)}
                      className={actionBrand === brand.id ? "btn-active" : ""}
                    >
                      {brand.brandName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-10">
              <div className="shop_grid_product_area">
                <div className="row">
                  <div className="col-12">
                    <div className="product-topbar d-flex align-items-center justify-content-between">
                      <div className="total-products">
                        <p>
                          <span> {products.length} </span>
                          sản phẩm được tìm thấy
                        </p>
                      </div>

                      <div className="content-search">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Tìm kiếm sản phẩm"
                          onChange={handleChange}
                        />
                        <button>
                          <i className="ri-search-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {products.length === 0 ? (
                  <div className="text-center">
                    <h3>Không tìm thấy sản phẩm</h3>
                  </div>
                ) : (
                  <div className="">
                    {/* Load data */}
                    <div className="row">
                    {products.map((product) => (
  <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
    <div className="single-product-wrapper list-products">
      <div className="product-img" style={{ position: 'relative' }}>
        {/* New Banner */}
        <div
          className="new-banner"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#ffd700',
            color: 'black',
            padding: '5px 10px',
            fontWeight: 'bold',
            fontSize: '14px',
            borderRadius: '4px',
          }}
        >
          New
        </div>
        
        <img
          src={`https://localhost:7048/${product.imagePrimary}`}
          alt="Hình sản phẩm"
          style={{
            width: '100%',
            height: '20rem',
            objectFit: 'cover',
          }}
        />
        <img
          className="hover-img"
          src={`https://localhost:7048/${product.imagePrimary}`}
          style={{
            width: '100%',
            height: '20rem',
            objectFit: 'cover',
          }}
          alt="Hình ảnh"
        />
      </div>
      <div className="product-description">
        <span className="btn-name">
          <a href={`/detail/${product.id}`}>{product.productName}</a>
        </span>
        <a className="product-brad">{product.brandName}</a>
        <p className="product-price">{product.price.toLocaleString("vi-VN")}.000 VND</p>
        <div className="add-to-cart-btn">
          <a href={`/detail/${product.id}`} className="btn essence-btn">
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  </div>
))}

                    </div>
                    {/* Pagination */}
                    {isBtnSeeMore && (
                      <div className="btn-see-more">
                        <button onClick={() => fetchProducts(1)}>
                          Xem thêm
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
