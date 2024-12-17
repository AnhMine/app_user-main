import React from "react";
import "./card-products.scss";

interface CardProProps {
  product: ProductsUserDtos;
}

const Card_pro: React.FC<CardProProps> = ({ product }) => {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "4px",
        overflow: "hidden",
        textAlign: "center",
        marginBottom: "0px",
        height: "auto",
        position: "relative", // Thêm position relative để banner NEW hiển thị đúng vị trí
      }}
    >
      {/* Banner NEW góc trái */}
      <div
        className="new-banner"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "#ffd700",
          color: "black",
          padding: "5px 10px",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "5px",
          zIndex: 10,
          
        }}
      >
        NEW
      </div>

      <div className="product-img" style={{ height: "20rem", overflow: "hidden" }}>
        <img
          src={`https://localhost:7048/${product.imagePrimary}`}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px 4px 0px 0px",
          }}
        />
      </div>
      <div className="product-description">
        <a href={`/detail/${product.id}`}>
          <h6>{product.productName}</h6>
        </a>
        <span> {product.brandName} </span>
        <p className="product-price">
          {product.price.toLocaleString("vi-VN")}.000 VND
        </p>
        <div className="btn-add">
          <a href={`/detail/${product.id}`} className="btn essence-btn">
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card_pro;
