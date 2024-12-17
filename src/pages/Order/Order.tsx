import React, { useEffect, useState } from "react";
import "./Order.scss";
import img from "./../../image/breadcumb.jpg";
import axios from "axios";
import CancelButton from "./Cancel-order/Cancel";
import OrderDetail from "./OrderDetail";

const DonHangUse: React.FC = () => {
  const [order, setOrder] = React.useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState<any | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 4; // Số đơn hàng mỗi trang

  useEffect(() => {
    const storedCustomerInfo = sessionStorage.getItem("user");
    if (storedCustomerInfo) {
      const parsedInfo = JSON.parse(storedCustomerInfo);
      setCustomerInfo(parsedInfo);

      axios
        .get(
          "https://localhost:7048/api/Order/get-by-user/" + parsedInfo.accountId
        )
        .then((response) => {
          setOrder(response.data);
          filterOrdersByStatus();
        })
        .catch((error) => {
          
        });
    }
  }, []);

  useEffect(() => {
    filterOrdersByStatus();
  }, [order]);

  const [isActive, setIsActive] = useState(0);
  const filterOrdersByStatus = (status?: number) => {
    setIsActive(status || 0);
    if (status === undefined || status === null) {
      setFilteredOrders(order);
    } else {
      const filtered = order.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
    setCurrentPage(1); // Reset về trang đầu tiên khi lọc
  };

  const getStatus = (status: number): { status: string; color: string } => {
    switch (status) {
      case 1:
        return { status: "Chờ xác nhận", color: "orange" };
      case 2:
        return { status: "Đang xử lý", color: "blue" };
      case 3:
        return { status: "Đang giao hàng", color: "#FFD700" };
      case 4:
        return { status: "Hoàn thành", color: "green" };
      case 5:
        return { status: "Hủy", color: "red" };
      default:
        return { status: "Tất cả", color: "black" };
    }
  };

  const handleOpenModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  // Phân trang
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

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
                <h2>Đơn hàng</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        className="bg0 p-t-104 p-b-116"
        style={{ textAlign: "center", fontWeight: "bold", marginLeft: "5%" }}
      >
        <div className="container-fluid">
          <div className="flex-w flex-tr">
            <div className="condh bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <div>
                <div className="main-tabs">
                  <button
                    className={`btn-tabs-order ${
                      isActive === 0 ? "btn-tabs-order-active" : ""
                    }`}
                    onClick={() => filterOrdersByStatus()}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`btn-tabs-order ${
                      isActive === 1 ? "btn-tabs-order-active" : ""
                    }`}
                    onClick={() => filterOrdersByStatus(1)}
                  >
                    Chờ xác nhận
                  </button>
                  <button
                    className={`btn-tabs-order ${
                      isActive === 3 ? "btn-tabs-order-active" : ""
                    }`}
                    onClick={() => filterOrdersByStatus(3)}
                  >
                    Đang giao hàng
                  </button>
                  <button
                    className={`btn-tabs-order ${
                      isActive === 4 ? "btn-tabs-order-active" : ""
                    }`}
                    onClick={() => filterOrdersByStatus(4)}
                  >
                    Hoàn thành
                  </button>
                  <button
                    className={`btn-tabs-order ${
                      isActive === 5 ? "btn-tabs-order-active" : ""
                    }`}
                    onClick={() => filterOrdersByStatus(5)}
                  >
                    Đã hủy
                  </button>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên Khách Hàng</th>
                      <th>Địa Chỉ</th>
                      <th>Phương thức thanh toán</th>
                      <th>Số Điện Thoại</th>
                      <th>Tình Trạng</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{customerInfo?.fullName}</td>
                        <td>{item.address}</td>
                        <td>
                          <span
                            className={
                              item.paymend === "Online" ||
                              item.paymend === "Online - Đã thanh toán"
                                ? "paymend"
                                : ""
                            }
                          >
                            {item.paymend}
                          </span>
                        </td>
                        <td>{item.numberPhone}</td>
                        <td style={{ color: getStatus(item.status).color }}>
                          {getStatus(item.status).status}
                        </td>
                        <td>
                          <div className="group-btn">
                            <button
                              className="btn-detail"
                              onClick={() => handleOpenModal(item.id)}
                            >
                              Chi tiết <i className="ri-eye-line"></i>
                            </button>
                            {item.status < 3 && (
                              <CancelButton orderId={item.id} />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <nav aria-label="navigation" style={{ marginLeft: "1%" }}>
                  <ul className="pagination mt-50 mb-70">
                    {/* Nút chuyển về trang trước */}
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                      onClick={() =>
                        currentPage > 1 && changePage(currentPage - 1)
                      }
                    >
                      <a className="page-link">{"<"}</a>
                    </li>

                    {/* Các số trang */}
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          onClick={() => changePage(i + 1)}
                        >
                          {i + 1}
                        </a>
                      </li>
                    ))}

                    {/* Nút chuyển đến trang sau */}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                      onClick={() =>
                        currentPage < totalPages && changePage(currentPage + 1)
                      }
                    >
                      <a className="page-link">{">"}</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && selectedOrderId && (
        <OrderDetail orderId={selectedOrderId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default DonHangUse;

