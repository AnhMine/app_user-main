import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Thêm state để quản lý dropdown
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData?.fullName || "");
      setUserId(userData?.accountId || "");
    }
  }, []);

  const handleLoginClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsDropdownOpen(!isDropdownOpen); // Khi người dùng nhấn tên, thay đổi trạng thái dropdown
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsDropdownOpen(false);
    navigate("/login");
    window.location.reload();
  };

  const handleNavigateToProfile = () => {
    if (userId) {
      setIsDropdownOpen(false);
      navigate(`/TrangCaNhan/${userId}`);
    } else {
      
    }
  };

  return (
    <div>
      <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
          {/* Classy Menu */}
          <nav className="classy-navbar" id="essenceNav">
            {/* Logo */}
            <a className="nav-brand" href="/">
              COZAStore
            </a>
            {/* Navbar Toggler */}
            <div className="classy-navbar-toggler">
              <span className="navbarToggler">
                <span />
                <span />
                <span />
              </span>
            </div>
            {/* Menu */}
            <div className="classy-menu">
              <div className="classycloseIcon">
                <div className="cross-wrap">
                  <span className="top" />
                  <span className="bottom" />
                </div>
              </div>
              <div className="classynav">
                <ul>
                  <li>
                    <a href="/sanpham">Sản phẩm</a>
                  </li>
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                  <li>
                    <a href="/donhang">Đơn hàng</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Header Meta Data */}
          <div className="d-flex clearfix justify-content-end">
            {/* Search Area */}
            <div className="search-area">
              <a
                href="/QrQr"
                className="outlined"
                style={{
                  // position: "absolute",
                  marginTop: "25px",
                  marginRight: "4o0px",
                  // right: "20px",
                  borderRadius: "10%",
                  minWidth: "40px",
                  minHeight: "40px",
                  padding: 0,
                }}
                // onClick={OpenClick}
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/qr-code.png"
                  alt="QR Code"
                  width="30"
                  height="30"
                />
              </a>
            </div>
            {/* Favourite Area */}
            <div className="favourite-area"></div>
            {/* User Login Info */}
            <div className="user-login-info">
              <a href="#" onClick={handleLoginClick}>
                {user ? (
                  <p style={{ paddingTop: "19px" }}>{user}</p>
                ) : (
                  <img src="../../../src/assets/img/core-img/user.svg" alt="" />
                )}
              </a>
              {user && isDropdownOpen && (
                <div className="dropdown-menu show">
                  {" "}
                  {/* Thêm class show */}
                  <ul>
                    <li>
                      <a href="#" onClick={handleNavigateToProfile}>
                        Trang cá nhân
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={handleLogout}>
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Cart Area */}
            <div className="cart-area">
              <a href="/cart" id="essenceCartBtn">
                <img src="../../../src/assets/img/core-img/bag.svg" alt="" />{" "}
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
