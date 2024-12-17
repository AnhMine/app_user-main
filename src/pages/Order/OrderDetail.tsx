import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderDetail.scss";

interface OrderDetailProps {
  orderId: number; // Nhận vào orderId
  onClose: () => void; // Hàm đóng modal
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<OrderDTO>({} as OrderDTO);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Lấy thông tin đơn hàng khi orderId thay đổi
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(""); // Reset error trước khi gọi API
      try {
        const response = await axios.get(
          `https://localhost:7048/api/Order/${orderId}`
        );
        setOrder(response.data);
        caculateFeeShip(response.data);
      } catch (err: any) {
        setError("Đã có lỗi xảy ra khi tải dữ liệu.");
        
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);
  const getStatus = (status: number): { status: string; color: string } => {
    switch (status) {
      case 1:
        return { status: "Chờ xác nhận", color: "orange" }; // Example color
      case 2:
        return { status: "Đang xử lý", color: "blue" }; // Example color
      case 3:
        return { status: "Đang giao hàng", color: "#FFD700" }; // Example color
      case 4:
        return { status: "Hoàn thành", color: "green" }; // Example color
      case 5:
        return { status: "Hủy", color: "red" }; // Example color
      default:
        return { status: "Tất cả", color: "black" }; // Example color
    }
  };

  const [feeShip, setFeeShip] = useState(0);
  const caculateFeeShip = (data: OrderDTO) => {
    let totalPrice = 0;
    data.detailOrder.forEach((item: any) => {
      totalPrice += item.detailProduct.price * item.quantity;
    });
    if (!data.voucher) {
      
      setFeeShip(data.totalPrice - (totalPrice * 1000 - 0));
      return;
    }
    setFeeShip(
      data.totalPrice - (totalPrice * 1000 - data.voucher.discount * 1000)
    );
    console.log(
      data.totalPrice - (totalPrice * 1000 - data.voucher.discount * 1000)
    );
  };
  const formatPrice = (price: number) => {
    // Nhân giá trị với 100 và định dạng với ký hiệu "đ"
    return price.toLocaleString("vi-VN");
  };
  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }
  if (!order) {
    return <div>Không tìm thấy thông tin đơn hàng.</div>; // Hiển thị nếu không có dữ liệu
  }
  return (
    <div className="container-order">
      <div className="container-order-detail">
        <div className="order-detail-header">
          <h5>Chi tiết đơn hàng #{order.orderCode}</h5>
          <button onClick={onClose}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        <div className="order-detail-body">
          <div className="order-detail-info">
            <div className="info-order-content">
              <div className="info-user">
                <h4>{order.fullName}</h4>
                <p>{order.numberPhone}</p>
                <p>{order.address}</p>
              </div>
              <div className="info-order">
                <p style={{ color: getStatus(order.status).color }}>
                  {getStatus(order.status).status}
                </p>
                <div className="">
                  <p>
                    Voucher:{" "}
                    {order.voucher
                      ? `${order.voucher.voucherName} - ${
                          order.voucher.discountType === "Percentage"
                            ? `${order.voucher.discount}%`
                            : `${order.voucher.discount.toLocaleString()},000 VND`
                        }`
                      : "Không có"}
                  </p>
                  <p>Phí giao hàng: {formatPrice(feeShip)} VND</p>
                </div>

                <strong>Tổng tiền: {formatPrice(order?.totalPrice)} VND</strong>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.detailOrder.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="image-table">
                      <img
                        src={
                          item.product.medias.length > 0
                            ? `https://localhost:7048/${item.product.medias[0].link}`
                            : "/default-image.png"
                        }
                        alt={item.product.productName}
                      />
                    </div>
                  </td>
                  <td>{item.product.productName}</td>
                  <td>Size {item.detailProduct.size}</td>
                  <td>{formatPrice(item.detailProduct.price)}.000 VND</td>
                  <td>x {item.quantity}</td>
                  <td>
                    {formatPrice(item.detailProduct.price * item.quantity)}.000
                    VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-detail-footer">
          <button onClick={() => alert("Hủy đơn hàng")}>
            Hủy đơn hàng <i className="ri-close-line"></i>
          </button>
          <button onClick={onClose}>
            Đóng <i className="ri-shut-down-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
