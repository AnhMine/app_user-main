import React, { useEffect, useState } from "react";
import "./Cart.scss";
import axios from "axios";

interface Order {
  id: number;
  total: number;
  timeOrder: string;
  statusOrder: number;
  paymentMethod: string;
  voucherId: number;
  accountId: number;
}

interface OrderDetail {
  detailProductId: number;
  quantity: number;
  orderId: number;
}

interface CartItem {
  productId: number;
  productName: string;
  size: string;
  colorId: number;
  quantity: number;
  maKH: string; // Account ID
  price: number;
  imageUrl: string; // Image URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productDetail: any; // Product detail with ID
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const updateQuantity = (
    productId: number,
    size: string,
    colorId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.colorId === colorId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: number, size: string, colorId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.colorId === colorId
          )
      )
    );
  };

  const createOrder = async () => {
    try {
      const newOrder: Order = {
        id: 0,
        total: calculateTotal(),
        timeOrder: new Date().toISOString(),
        statusOrder: 1,
        paymentMethod: "string", // Replace with actual payment method
        voucherId: 3,
        accountId: parseInt(cartItems[0].maKH), // Use real account ID
      };

      const response = await axios.post(
        "https://localhost:7048/api/Order/add-order",
        newOrder
      );
      

      const createdOrder = response.data;
      

      setOrder(createdOrder);
      addOrderDetails(createdOrder.orderId);
    } catch (error) {
      
    }
  };

  const addOrderDetails = async (orderId: number) => {
    
    

    try {
      const promises = cartItems.map((item) => {
        const orderDetail: OrderDetail = {
          detailProductId: item.productDetail.id,
          quantity: item.quantity,
          orderId,
        };

        return axios.post(
          "https://localhost:7048/api/DetailOrder/add-detailorder",
          orderDetail
        );
      });

      // Đợi tất cả các request hoàn thành
      await Promise.all(promises);

      // Xóa giỏ hàng khỏi localStorage
      localStorage.removeItem("cart");
      
      alert("Đơn đat mua hàng thành công!");
      location.reload();
    } catch (error) {
      
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  if (cartItems.length === 0) {
    return <div>Giỏ hàng của bạn đang trống!</div>;
  }

  return (
    <section className="cart_area">
      <h2 className="cart_title">Giỏ hàng của bạn</h2>
      <div className="cart_items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart_item">
            <div className="cart_item_image">
              <img src={item.imageUrl} alt={item.productName} />
            </div>
            <div className="cart_item_info">
              <h4>{item.productName}</h4>
              <p>Kích thước: {item.size}</p>
              <p>Màu: {item.colorId}</p>
              <div className="cart_item_controls">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.productId,
                      item.size,
                      item.colorId,
                      item.quantity - 1
                    )
                  }
                  className="quantity_button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.productId,
                      item.size,
                      item.colorId,
                      item.quantity + 1
                    )
                  }
                  className="quantity_button"
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  removeItem(item.productId, item.size, item.colorId)
                }
                className="remove_button"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart_summary">
        <h3>Tổng tiền: {calculateTotal().toLocaleString()} VND</h3>
      </div>
      <button className="checkout_button" onClick={createOrder}>
        Thanh toán
      </button>
    </section>
  );
};

export default Cart;
