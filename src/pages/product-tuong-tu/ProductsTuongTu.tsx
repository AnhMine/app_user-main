/* eslint-disable */

import { useEffect, useState } from "react";
import "./productTuongTu.scss";
import axios from "axios";
import Card_pro from "../Card_pro";



const ProductsTuongTu: React.FC<{ idCategory: number }> = ({ idCategory }) => {
  const [products, setProducts] = useState<ProductsUserDtos[]>([]);
  const [, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://cozastore.tryasp.net/api/Products/get-user?maxPageSize=8&Pagesize=8`
      );
      const productsData: any[] = response.data.data; // Dữ liệu sản phẩm
      const filteredProducts = productsData
        .filter((product: any) => product.categoryId === idCategory)
        .slice(0, 4);
      setProducts(filteredProducts);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {products.length > 0 ? (
            products
              .slice(0, 8)
              .map((product) => <Card_pro key={product.id} product={product} />)
          ) : (
            <div>Không có sản phẩm nào để hiển thị.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTuongTu;
