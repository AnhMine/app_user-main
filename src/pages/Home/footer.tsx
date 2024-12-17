import React from 'react'

export const Footer = () => {
  return (
    <div>
      <footer className="footer_area clearfix">
        <div className="container">
          <div className="row">
            {/* Khu vực widget đơn */}
            <div className="col-12 col-md-6">
              <div className="single_widget_area d-flex mb-30">
                {/* Logo */}
                <div className="footer-logo mr-50">
                  <a href="#">
                    <img src="img/core-img/logo2.png" alt="" />
                  </a>
                </div>
                {/* Menu chân trang */}
                <div className="footer_menu">
                  <ul>
                    <li>
                      <a href="shop.html">Cửa hàng</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="contact.html">Liên hệ</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Khu vực widget đơn */}
            <div className="col-12 col-md-6">
              <div className="single_widget_area mb-30">
                <ul className="footer_widget_menu">
                  <li>
                    <a href="#">Trạng thái đơn hàng</a>
                  </li>
                  <li>
                    <a href="#">Tùy chọn thanh toán</a>
                  </li>
                  <li>
                    <a href="#">Vận chuyển và giao hàng</a>
                  </li>
                  <li>
                    <a href="#">Hướng dẫn</a>
                  </li>
                  <li>
                    <a href="#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Điều khoản sử dụng</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            {/* Khu vực widget đơn */}
            <div className="col-12 col-md-6">
              <div className="single_widget_area">
                <div className="footer_heading mb-30">
                  <h6>Đăng ký</h6>
                </div>
                <div className="subscribtion_form">
                  <form action="#" method="post">
                    <input
                      type="email"
                      name="mail"
                      className="mail"
                      placeholder="Email của bạn ở đây"
                    />
                    <button type="submit" className="submit">
                      <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Khu vực widget đơn */}
            <div className="col-12 col-md-6">
              <div className="single_widget_area">
                <div className="footer_social_area">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Facebook"
                  >
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Instagram"
                  >
                    <i className="fa fa-instagram" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Twitter"
                  >
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Pinterest"
                  >
                    <i className="fa fa-pinterest" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Youtube"
                  >
                    <i className="fa fa-youtube-play" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
