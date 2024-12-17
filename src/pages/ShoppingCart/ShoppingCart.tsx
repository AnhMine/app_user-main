import React, { useEffect, useState } from "react";
import img from "./../../image/breadcumb.jpg";
import "./ShoppingCart.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDistrict, getProvince, getShipping, getWard } from "./addressApi";
interface Order {
  id: number;
  total: number;
  timeOrder: string;
  statusOrder: number;
  paymentMethod: string;
  voucherId: number | null;
  accountId: number;
}

interface OrderDetail {
  detailProductId: number;
  quantity: number;
  orderId: number;
}
interface EmailRequest {
  accountId: any;
  idOrder: any;
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
  productDetail: DetailProductDtos; // Product detail with ID
  link: string;
}

const GioHang: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [customerInfo, setCustomerInfo] = useState<any | null>(null);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<any | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7048/api/Voucher/get-all-vouchers"
        );
        // 

        setVouchers(response.data.data);
      } catch (error) {
        
      }
    };

    fetchVouchers();
  }, []);

  //#region Tính phí giao hàng
  // GET TỈNH
  const [pronvinces, setProvinces] = useState<ProvinceDtos[]>([]);
  const [district, setDistrict] = useState<DistrictDtos[]>([]);
  const [ward, setWard] = useState<WardDtos[]>([]);

  const [selectedValues] = useState({
    province: "",
    district: "",
    ward: "",
    provinceName: "",
    districtName: "",
    wardName: "",
  });
  const getPronvincesApi = async () => {
    try {
      const res = await getProvince();
      setProvinces(res);
    } catch (error) {
      {
        
      }
    }
  };
  // GET QUẬN HUYỆN
  const getDistrictApi = async (provinceId: number) => {
    try {
      const res = await getDistrict(provinceId);
      setDistrict(res);
    } catch (error) {
      
    }
  };

  // GET XÃ PHƯỜNG
  const getWardsApi = async (districtId: number) => {
    try {
      const res = await getWard(districtId);
      setWard(res);
    } catch (error) {
      
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    if (field === "province") {
      getDistrictApi(parseInt(e.target.value));
      selectedValues.province = e.target.value;
      selectedValues.district = "";
      selectedValues.ward = "";
      setWard([]);
      const selectedProvince = pronvinces.find(
        (province) => province.ProvinceID === parseInt(e.target.value)
      ) as ProvinceDtos;
      selectedValues.provinceName = selectedProvince.NameExtension[1];
    } else if (field === "district") {
      getWardsApi(parseInt(e.target.value));
      selectedValues.district = e.target.value;
      selectedValues.ward = "";
      const selectedDistrict = district.find(
        (province) => province.DistrictID === parseInt(e.target.value)
      ) as DistrictDtos;
      selectedValues.districtName = selectedDistrict.NameExtension[1];
    } else {
      selectedValues.ward = e.target.value;
      const selectedDistrict = ward.find(
        (province) => province.WardCode === e.target.value
      ) as WardDtos;
      selectedValues.wardName = selectedDistrict.NameExtension[1];

      getFeeShippng();
    }
    setAddress(
      ` , ${selectedValues.wardName}, ${selectedValues.districtName}, ${selectedValues.provinceName}`
    );
  };

  const [feeShipping, setFeeShipping] = useState(0);
  const getFeeShippng = async () => {
    const item: items[] = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      name: item.productName,
      height: 2,
      weight: 2,
      length: 2,
      width: 2,
    }));

    // 1552
    // '400101'
    const data: ShippingOrderDtos = {
      items: item,
      service_type_id: 5,
      from_district_id: 1552,
      from_ward_code: "400101",
      to_district_id: Number(selectedValues.district),
      to_ward_code: selectedValues.ward,
      height: 20,
      length: 30,
      weight: 10,
      width: 40,
      insurance_value: 0,
      coupon: null,
    };

    const response = await getShipping(data);
    setFeeShipping(response.total);
  };
  //#endregion

  //#region Thanh toán

  const [paymentMethod, setPaymentMethod] = useState("Offline");

  //#endregion

  const validateForm = () => {
    if (!recipientName.trim()) {
      alert("Tên người nhận không được để trống");
      return false;
    }
    if (!/^\d{9,11}$/.test(phoneNumber)) {
      alert("Số điện thoại phải có 9-11 chữ số và bắt đầu bằng 0");
      return false;
    }
    if (!address.trim()) {
      alert("Địa chỉ không được để trống");
      return false;
    }
    return true;
  };

  useEffect(() => {
    getPronvincesApi();

    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    const storedCustomerInfo = sessionStorage.getItem("user");
    if (storedCustomerInfo) {
      setCustomerInfo(JSON.parse(storedCustomerInfo));
    }
  }, [cartItems]);

  const updateQuantity = (
    productId: number,
    productDetailId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.productDetail.id === productDetailId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productIdDetail: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.productDetail.id !== productIdDetail
      );
      // Debug xem có sản phẩm nào còn lại không
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return [...updatedItems];
    });
  };

  const handleSubmit = async (idOrder: number) => {
    // Dữ liệu từ các ô input
    const model: CreateDeliveryAddress = {
      address: address,
      note: note,
      phone: phoneNumber,
    };

    try {
      const response = await axios.post(
        `https://localhost:7048/api/DeliveryAddress/${idOrder}`,
        model
      );

      
    } catch (error) {
      
    }

    // Xử lý logic tiếp theo tại đây (gửi API, kiểm tra dữ liệu, v.v.)
  };

  const checkQuantityProducts = async () => {
    try {
      let product = undefined;
      const response: any = await axios.get(
        "https://localhost:7048/api/DetailProduct/get-all-detailproduct?maxPageSize=10000&Pagesize=10000"
      );
      const products: Detail[] = response.data.data;
      for (let i = 0; i < cartItems.length; i++) {
        const detail: Detail = products.find(
          (a) => a.id == cartItems[i].productDetail.id
        ) as Detail;
        if (cartItems[i].quantity > detail.quantity) {
          product = cartItems[i];
          break;
        }
      }
      return product;
    } catch (error) {
      
    }
  };
  const createOrder = async () => {
    if (!customerInfo) {
      alert("Vui lòng đăng nhập trước khi đặt hàng!");
      navigate("/login");
      return;
    }
    const product: CartItem | undefined = await checkQuantityProducts();

    if (product) {
      alert(
        `Số lượng sản phẩm ${product.productName.toUpperCase()} lớn hơn số lượng trong kho`
      );
      return;
    }
    if (!validateForm()) return;
    try {
      const newOrder: Order = {
        id: 0,
        total: calculateTotal() - calculateDiscount() + feeShipping,
        timeOrder: new Date().toISOString(),
        statusOrder: 1,
        paymentMethod: paymentMethod, // Replace with actual payment method
        voucherId: selectedVoucher?.id || null,
        accountId: customerInfo.accountId, // Use real account ID
      };

      const response = await axios.post(
        "https://localhost:7048/api/Order/add-order",
        newOrder
      );
      const createdOrder = response.data;
      
      if (paymentMethod === "Online") {
        await thanhToanVnpay({
          id: createdOrder.orderId,
          amount: calculateTotal() - calculateDiscount() + feeShipping,
        });
      }
      setOrder(createdOrder);
      await addOrderDetails(createdOrder.orderId);
      await handleSubmit(createdOrder.orderId);
      await sendEmail(createdOrder.orderId, customerInfo.accountId);
      alert("Đơn đặt mua hàng thành công!");
      location.reload();
    } catch (error) {
      alert("Đơn đặt mua hàng thất bại!");
      
    }
  };

  const thanhToanVnpay = async (data: { id: number; amount: number }) => {
    try {
      const response = await axios.post(
        "https://localhost:7048/api/Order/vnpay-payment-url",
        data
      );
      window.location.href = response.data;
    } catch (error) {
      
    }
  };
  const sendEmail = async (orderId: number, accountId: number) => {
    try {
      const EmailRequest: EmailRequest = {
        idOrder: orderId,
        accountId: accountId,
      };

      

      const response = await axios.post(
        "https://localhost:7048/api/Email/send-email",
        EmailRequest
      );

      
      return response;
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
    } catch (error) {
      
    }
  };

  const caculateItem = (item: any) => {
    return item.quantity * item.productDetail.Price * 1000;
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + caculateItem(item), 0);
  };

  //   Hàm lọc các voucher hợp lệ
  const getFilteredVouchers = () => {
    const total = calculateTotal();
    // 

    // => voucher.min_Order_Value <= total));

    return vouchers.filter((voucher) => {
      if (voucher.max_Discount === 0) {
        

        return voucher.min_Order_Value * 1000 <= total;
      }
      // Kiểm tra cả min_Order_Value và max_Discount_Value
      return (
        
        voucher.min_Order_Value * 1000 <= total &&
          voucher.max_Discount * 1000 >= total
      );
    });
  };
  const calculateDiscount = () => {
    if (!selectedVoucher) return 0; // Nếu không có voucher, không giảm giá

    const total = calculateTotal();
    if (selectedVoucher.discountType == "Percentage") {
      

      // Giảm theo phần trăm
      return (total * selectedVoucher.discount) / 100;
    } else {
      console.log(
        calculateTotal() - selectedVoucher.discount,
        "calculateTotal() - selectedVoucher.discount"
      );
       "calculateTotal()";
      

      // Giảm theo số tiền cố định
      return selectedVoucher.discount * 1000;
    }
  };
  const handleVoucherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voucherId = event.target.value;
    

    const voucher = vouchers.find(
      (v) => v.id.toString() === voucherId.toString()
    );
    setSelectedVoucher(voucher || null);
    
  };
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="">
          <div
            className="breadcumb_area bg-img"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12">
                  <div className="page-title text-center">
                    <h2>Giỏ hàng</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section
            className="bg0 p-t-104 p-b-116"
            style={{ fontWeight: "bold" }}
          >
            <div className="flex-w flex-tr">
              <div className="cond bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                <div
                  className="row"
                  style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}
                >
                  <div className="col-md-8">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Sản Phẩm</th>
                          <th>Size</th>
                          <th>Màu</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Tổng</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr>
                            <td>
                              <div style={{ marginTop: 35 }}>{index + 1}</div>
                            </td>
                            <td style={{ width: 400 }}>
                              <div className="row">
                                <div className="col-4">
                                  <img
                                    src={`https://localhost:7048/${item.link}`}
                                    className="cart-thumb"
                                    alt=""
                                    style={{
                                      width: "78px",
                                      height: "78px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div
                                  className="col-8"
                                  style={{ marginTop: 10 }}
                                >
                                  {item.productName}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ marginTop: 10 }}>
                                SIZE {item.productDetail.Size}
                              </div>
                            </td>
                            <td>
                              <div style={{ marginTop: 10 }}>
                                {item.productDetail?.Color.nameColor}
                              </div>
                            </td>
                            <td>
                              <div style={{ marginTop: 10 }}>
                                {(
                                  item.productDetail.Price * 1000
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                            </td>
                            <td>
                              <div
                                className="wrap-num-product flex-w m-l-auto m-r-0"
                                style={{ marginTop: 10 }}
                              >
                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                  <div className="fs-16 zmdi zmdi-minus" />
                                </div>
                                <input
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.productId,
                                      item.productDetail.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  style={{ color: "black" }}
                                />

                                <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                  <div className="fs-16 zmdi zmdi-plus" />
                                </div>
                              </div>
                            </td>
                            <td>
                              <div style={{ marginTop: 10 }}>
                                {caculateItem(item).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                            </td>
                            <td>
                              <div
                                style={{ marginTop: 10 }}
                                onClick={() =>
                                  removeItem(item.productDetail.id)
                                }
                              >
                                <svg
                                  style={{ width: 20, height: 20 }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                                </svg>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="co-4 bro">
                    <h4>Mã giảm giá</h4>
                    <div className="row">
                      <div className="col-md-8">
                        <select
                          className="form-control"
                          onChange={handleVoucherChange}
                        >
                          <option value="">Chọn voucher</option>
                          {getFilteredVouchers().map((voucher, index) => (
                            <option key={index} value={voucher.id}>
                              {voucher.voucherName} - Giảm{" "}
                              {voucher.discountType === "Percentage"
                                ? `${voucher.discount}%`
                                : `${voucher.discount}k`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          style={{ width: 100, marginTop: 5 }}
                          className="btn btn-primary "
                        >
                          Áp dụng
                        </button>
                      </div>
                    </div>
                    <h4 style={{ marginTop: 20 }}>Thông tin đơn hàng</h4>
                    <hr />
                    <div className="container-form-delivery">
                      <div className="form-infor-delivery">
                        <strong>Tên người nhận:</strong>
                        <input
                          type="text"
                          placeholder="Nhập tên người nhận"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)} // Cập nhật state
                        />
                      </div>
                      <div className="form-infor-delivery">
                        <strong>Số điện thoại:</strong>
                        <input
                          type="text"
                          placeholder="Nhập số điện thoại"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)} // Cập nhật state
                        />
                      </div>
                      <div className="form-infor-delivery">
                        <strong>Ghi chú:</strong>
                        <input
                          type="text"
                          placeholder="Nhập ghi chú"
                          value={note}
                          onChange={(e) => setNote(e.target.value)} // Cập nhật state
                        />
                      </div>
                      <div className="form-infor-delivery">
                        <strong>Phương thức thanh toán:</strong>
                        <select
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="Offline">
                            Thanh toán khi nhận hàng
                          </option>
                          <option value="Online">Thanh toán Vnpay</option>
                        </select>
                      </div>
                      <div className="form-infor-delivery">
                        <strong>Tỉnh/thành phố:</strong>
                        <select onChange={(e) => handleChange(e, "province")}>
                          {pronvinces.map((province, index) => (
                            <option key={index} value={province.ProvinceID}>
                              {province.NameExtension[1]}
                            </option>
                          ))}
                        </select>
                      </div>
                      {district.length > 0 && (
                        <div className="form-infor-delivery">
                          <strong>Quận/huyện:</strong>
                          <select onChange={(e) => handleChange(e, "district")}>
                            {district.map((distrct, index) => (
                              <option key={index} value={distrct.DistrictID}>
                                {distrct.NameExtension[1]}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {ward.length > 0 && (
                        <div className="form-infor-delivery">
                          <strong>Phường/xã:</strong>
                          <select onChange={(e) => handleChange(e, "ward")}>
                            {ward.map((ward, index) => (
                              <option key={index} value={ward.WardCode}>
                                {ward.NameExtension[1]}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {ward.length > 0 && (
                        <div className="form-infor-delivery">
                          <strong>Địa chỉ cụ thể:</strong>
                          <div className="a">
                            <input
                              type="text"
                              placeholder="Nhập địa chỉ"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)} // Cập nhật state
                            />
                            <p>
                              <span>Địa chỉ nhận hàng:</span> {address}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr />
                    <h4 style={{ marginTop: 20 }}>Tổng giỏ hàng</h4>
                    <hr />
                    <div className="row">
                      <div className="col-md-9">
                        <p className="title-money">Tạm tính</p>
                      </div>
                      <div className="col-md-3">
                        <p style={{ color: "blue" }} className="title-money">
                          {calculateTotal().toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-9">
                        <p className="title-money">Giảm giá</p>
                      </div>
                      <div className="col-md-3">
                        <p style={{ color: "blue" }} className="title-money">
                          -
                          {calculateDiscount().toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-9">
                        <p className="title-money">Phí giao hàng</p>
                      </div>
                      <div className="col-md-3">
                        <p style={{ color: "blue" }} className="title-money">
                          {feeShipping.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-9 title-money">
                        <p className="title-money">Tổng</p>
                      </div>
                      <div className="col-md-3">
                        <p style={{ color: "blue" }} className="title-money">
                          {(
                            calculateTotal() -
                            calculateDiscount() +
                            feeShipping
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-order"
                      onClick={createOrder}
                    >
                      Thanh Toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="not-products">
          <h3>Không có sản phẩm trong giỏ hàng</h3>
          <a href="/sanpham">Tiếp tục mua sắm</a>
        </div>
      )}
    </>
  );
};

export default GioHang;
