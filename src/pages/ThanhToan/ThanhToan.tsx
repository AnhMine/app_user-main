import React from "react";
import img from "./../../image/breadcumb.jpg";
const GioHang: React.FC = () => {
  return (
    <>
      {/* ##### Right Side Cart Area ##### */}
      <div className="cart-bg-overlay" />
      <div className="right-side-cart-area">
        {/* Cart Button */}
        <div className="cart-button">
          <a href="#" id="rightSideCart">
            <img src="img/core-img/bag.svg" alt="" /> <span>3</span>
          </a>
        </div>
        <div className="cart-content d-flex">
          <div className="cart-list">
            <div className="single-cart-item">
              <a href="#" className="product-image">
                <img
                  src="https://myshoes.vn/image/cache/catalog/2023/lacoste/086/giay-lacoste-nivolor-0721-nam-xanh-navy-01-800x800.jpg.webp"
                  className="cart-thumb"
                  alt=""
                />
                <div className="cart-item-desc">
                  <span className="product-remove">
                    <i className="fa fa-close" aria-hidden="true" />
                  </span>
                  <span className="badge">Nike</span>
                  <h6>Giày Nike Court Vision Low Nam - Xanh Dương</h6>
                  <p className="size">Kích thước: S</p>
                  <p className="color">Màu sắc: Xanh Dương</p>
                  <p className="price">1.500.000₫</p>
                </div>
              </a>
            </div>
            <div className="single-cart-item">
              <a href="#" className="product-image">
                <img
                  src="https://myshoes.vn/image/cache/catalog/2023/nike/nk1/giay-nike-air-max-ap-nam-trang-navy-01-800x800.jpg.webp"
                  className="cart-thumb"
                  alt=""
                />
                <div className="cart-item-desc">
                  <span className="product-remove">
                    <i className="fa fa-close" aria-hidden="true" />
                  </span>
                  <span className="badge">Nike</span>
                  <h6>Giày Nike Air Max AP Nam - Trắng Navy</h6>
                  <p className="size">Kích thước: S</p>
                  <p className="color">Màu sắc: Trắng Navy</p>
                  <p className="price">1.500.000₫</p>
                </div>
              </a>
            </div>
            <div className="single-cart-item">
              <a href="#" className="product-image">
                <img
                  src="https://myshoes.vn/image/cache/catalog/2024/puma/pm1/giay-puma-aviate-nam-den-trang-01-800x800.jpg.webp"
                  className="cart-thumb"
                  alt=""
                />
                <div className="cart-item-desc">
                  <span className="product-remove">
                    <i className="fa fa-close" aria-hidden="true" />
                  </span>
                  <span className="badge">Puma</span>
                  <h6>Giày Puma Aviate Nam - Đen Trắng</h6>
                  <p className="size">Kích thước: S</p>
                  <p className="color">Màu sắc: Đen Trắng</p>
                  <p className="price">1.500.000₫</p>
                </div>
              </a>
            </div>
          </div>
          <div className="cart-amount-summary">
            <h2>Tóm tắt</h2>
            <ul className="summary-table">
              <li>
                <span>Tạm tính:</span> <span>4.500.000₫</span>
              </li>
              <li>
                <span>Vận chuyển:</span> <span>Miễn phí</span>
              </li>
              <li>
                <span>Giảm giá:</span> <span>-15%</span>
              </li>
              <li>
                <span>Tổng cộng:</span> <span>4.300.000₫</span>
              </li>
            </ul>
            <div className="checkout-btn mt-100">
              <a href="checkout.html" className="btn essence-btn">
                Thanh toán
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ##### Right Side Cart End ##### */}
      {/* ##### Breadcumb Area Start ##### */}
      <div
        className="breadcumb_area bg-img"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="page-title text-center">
                <h2>Thanh toán</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ##### Breadcumb Area End ##### */}
      {/* ##### Checkout Area Start ##### */}
      <div className="checkout_area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="checkout_details_area mt-50 clearfix">
                <div className="cart-page-heading mb-30">
                  <h5>Địa chỉ thanh toán</h5>
                </div>
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first_name">
                        Tên <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        defaultValue=""
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="last_name">
                        Họ <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        defaultValue=""
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="company">Tên công ty</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="country">
                        Quốc gia <span>*</span>
                      </label>
                      <select className="w-100" id="country">
                        <option value="usa">Hoa Kỳ</option>
                        <option value="uk">Vương quốc Anh</option>
                        <option value="ger">Đức</option>
                        <option value="fra">Pháp</option>
                        <option value="ind">Ấn Độ</option>
                        <option value="aus">Úc</option>
                        <option value="bra">Brazil</option>
                        <option value="cana">Canada</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="street_address">
                        Địa chỉ <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="street_address"
                        defaultValue=""
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="street_address2"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="postcode">
                        Mã bưu điện <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="postcode"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="city">
                        Thành phố <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="state">
                        Tỉnh <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="phone_number">
                        Số điện thoại <span>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone_number"
                        min={0}
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label htmlFor="email_address">
                        Địa chỉ email <span>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email_address"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-12">
                      <div className="custom-control custom-checkbox d-block mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Điều khoản và điều kiện
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox d-block mb-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck2"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck2"
                        >
                          Tạo một tài khoản
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox d-block">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck3"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck3"
                        >
                          Đăng ký nhận bản tin của chúng tôi
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
              <div className="order-details-confirmation">
                <div className="cart-page-heading">
                  <h5>Đơn hàng của bạn</h5>
                  <p>Thông tin chi tiết</p>
                </div>
                <ul className="order-details-form mb-4">
                  <li>
                    <span>Sản phẩm</span> <span>Tổng cộng</span>
                  </li>
                  <li>
                    <span>Váy cocktail màu vàng</span> <span>$59.90</span>
                  </li>
                  <li>
                    <span>Tiền tạm tính</span> <span>$59.90</span>
                  </li>
                  <li>
                    <span>Vận chuyển</span> <span>Miễn phí</span>
                  </li>
                  <li>
                    <span>Tổng cộng</span> <span>$59.90</span>
                  </li>
                </ul>
                <div id="accordion" role="tablist" className="mb-4">
                  <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                      <h6 className="mb-0">
                        <a
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          <i className="fa fa-circle-o mr-3" />
                          Paypal
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin pharetra tempor so dales. Phasellus
                          sagittis auctor gravida. Integ er bibendum sodales
                          arcu id te mpus. Ut consectetur lacus.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <i className="fa fa-circle-o mr-3" />
                          Thanh toán khi giao hàng
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Explicabo quis in veritatis officia inventore,
                          tempore provident dignissimos.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingThree">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <i className="fa fa-circle-o mr-3" />
                          Thẻ tín dụng
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Esse quo sint repudiandae suscipit ab soluta
                          delectus voluptate, vero vitae.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="headingFour">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapseFour"
                          aria-expanded="true"
                          aria-controls="collapseFour"
                        >
                          <i className="fa fa-circle-o mr-3" />
                          Chuyển khoản ngân hàng trực tiếp
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Est cum autem eveniet saepe fugit, impedit
                          magni.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#" className="btn essence-btn">
                  Đặt hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GioHang;
