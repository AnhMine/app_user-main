import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.scss";
import ProductsTuongTu from "../product-tuong-tu/ProductsTuongTu";
import Comment from "../Comment/Comment";
import Rating from "../Comment/Rating/Rating";

interface DetailProductDTO {
  id: number;
  Size: string;
  Price: number;
  Quantity: number;
  Gender: string;
  Status: string;
  ColorId: number;
  Color: any;
}

interface ProductDetail {
  id: number;
  ProductName: string;
  Description: string;
  CategoryId: number;
  BrandId: number;
  details: DetailProductDTO[];
}

interface CategoryDetail {
  id: number;
  Image: string;
  CategoryName: string;
}

const Chitiet: React.FC = () => {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [category, setCategory] = useState<CategoryDetail | null>(null);
  const [images, setImages] = useState<ImageDtos[]>([]);
  const [imagePrimary, setImagePrimary] = useState<ImageDtos>({} as ImageDtos);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<DetailProductDTO | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customerInfo, setCustomerInfo] = useState<any | null>(null);
  const [quantily, setQuantily] = useState<number>(1);
  const { id } = useParams();
  const MAX_LENGTH = 500;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [rating, setRating] = useState(0);

  useEffect(() => {
    loadRating();
  }, []);

  const loadRating = async () => {
    

    const repo = await axios.get(
      `https://localhost:7048/api/Comment/get-rating-by-product-id/${id}`
    );

    if (repo) {
      setRating(repo.data);
    }
  };

  // Lấy thông tin khách hàng từ localStorage
  useEffect(() => {
    const storedCustomerInfo = sessionStorage.getItem("user");
    loadRating();
    if (storedCustomerInfo) {
      setCustomerInfo(JSON.parse(storedCustomerInfo));
    }
  }, []);
  const fetchProductsAndCategory = async () => {
    try {
      const [productResponse, detailResponse, arrImage] = await Promise.all([
        axios.get(`https://localhost:7048/api/Products/get-product/${id}`),
        axios.get(
          `https://localhost:7048/api/DetailProduct/get-detailproduct/${id}`
        ),
        axios.get(`https://localhost:7048/api/Medias/get-all-medias/${id}`),
      ]);

      const productData = productResponse.data;

      const detailsData = detailResponse.data;
      

      setImages(arrImage.data);
      setImagePrimary(arrImage.data.find((a: ImageDtos) => a.isImage === true));
      const categoryResponse = await axios.get(
        `https://localhost:7048/api/Category/get-category-by-id/${productData.categoryId}`
      );
      const categoryData = categoryResponse.data;

      const combinedProduct: ProductDetail = {
        id: productData.id,
        ProductName: productData.productName,
        Description: productData.description,
        CategoryId: productData.categoryId,
        BrandId: productData.brandId,
        details: detailsData
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((detail: any) => detail.productId === productData.id)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((detail: any) => ({
            id: detail.id,
            Size: detail.size || "N/A",
            Price: detail.price || 0,
            Quantity: detail.quantity || 0,
            Gender: detail.gender || "Unspecified",
            Status: detail.status || "Unknown",
            ColorId: detail.colorId || 0,
            Color: detail.color,
          })),
      };
      setSelectedProductDetail(combinedProduct.details[0]);
      setProducts([combinedProduct]);
      setCategory({
        id: categoryData.id,
        Image: categoryData.image,
        CategoryName: categoryData.categoryName,
      });
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategory();
  }, []);

  const handleAddToCart = (product: ProductDetail) => {
    if (selectedProductDetail === null) {
      alert("Vui lớn chọn size!");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const image: ImageDtos = images.find(
      (a: ImageDtos) => a.isImage === true
    ) as ImageDtos;
    const item = {
      productId: product.id,
      productName: product.ProductName,
      quantity: quantily,
      price: product.details[0]?.Price,
      maKH: customerInfo?.accountId, // Thêm thông tin khách hàng vào sản phẩm,
      productDetail: selectedProductDetail,
      link: image.link,
    };
    

    const existingIndex = cart.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cartItem: any) =>
        cartItem.productId === item.productId &&
        cartItem.productDetail.id === item.productDetail?.id
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const changeImagePrimary = (image: ImageDtos) => {
    setImagePrimary(image);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      // Chỉ chấp nhận giá trị >= 1
      setQuantily(value);
    }
  };

  const product = products[0];
  return (
    <div className="">
      <div className="container-detail">
        <div className="container-detail-image">
          <div className="container-detail-image-main">
            <img src={`https://localhost:7048/${imagePrimary.link}`} alt="" />
          </div>
          <div className="container-detail-image-other">
            {images.map((item) =>
              item.id === imagePrimary.id ? null : (
                <img
                  onClick={() => changeImagePrimary(item)}
                  key={item.id} // Đảm bảo `key` duy nhất
                  src={`https://localhost:7048/${item.link}`}
                  alt="hình ảnh"
                />
              )
            )}
          </div>
        </div>
        <div className="container-detail-info">
          <div className="">
            <div className="">
              <h4>{product.ProductName}</h4>
              <h5>
                {selectedProductDetail?.Price.toLocaleString("vi-VN")}.000 VND
              </h5>
              <div>
                <div>
                  <Rating rating={rating as number} />
                </div>
              </div>
              <p className="brand">Brand</p>
              <div className="price-quantily">
                <select
                  id="productDetail"
                  onChange={(e) => {
                    const selectedDetailId = parseInt(e.target.value); // Lấy ID từ value
                    

                    const selectedDetail = product.details.find(
                      (detail) => detail.id == selectedDetailId // Tìm detail dựa trên ID
                    );
                    

                    setSelectedProductDetail(selectedDetail || null); // Gán detail vào state
                    
                  }}
                >
                  {product.details.map((detail) => (
                    <option key={detail.id} value={detail.id}>
                      Kích Thước: {detail.Size} - {detail.Gender} -{" "}
                      {detail.Color?.nameColor || "N/A"} - Số lượng:
                      {detail.Quantity}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="quantily"
                  min={1}
                  value={quantily}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="group-btn">
              <button
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="tuong-tu">
      <div
          style={{
            textAlign: "center", // Căn giữa nội dung văn bản
            display: "flex", // Để hỗ trợ căn giữa dọc (nếu cần)
            justifyContent: "center", // Căn giữa theo chiều ngang
            alignItems: "center", // Căn giữa theo chiều dọc (nếu cần)
          }}
        >
          <div className="product-description">
            <p
              dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? product.Description
                  : product.Description.slice(0, MAX_LENGTH) +
                    (product.Description.length > MAX_LENGTH ? "..." : ""),
              }}
            ></p>
            {product.Description.length > MAX_LENGTH && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  onClick={toggleExpand}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Comment
            productId={product.id}
            productDetailId={selectedProductDetail?.id}
          />
        </div>
        <h4>Sản phẩm tương tự của {product.ProductName}</h4>
        <div style={{ marginBottom: "20px" }} className="">
          <ProductsTuongTu idCategory={product.CategoryId} />
        </div>
      </div>
    </div>
  );
};

export default Chitiet;
