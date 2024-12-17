import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Errors {
  general?: string;
  usernameLogin?: string;
  passwordLogin?: string;
  usernameRegister?: string;
  passwordRegister?: string;
  email?: string;
  phone?: string;
  fullname?: string;
  address?: string;
}

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    fullname: "",
    address: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const toggleSignup = () => setIsSignup(!isSignup);

  const handleForgotPassword = () => setForgotPasswordOpen(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "login") {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    //Xóa lỗi
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const navigate = useNavigate();

  //Kiểm lỗi đăng nhập
  const validateLogin = () => {
    const newErrors: Errors = {};

    if (!loginData.username)
      newErrors.usernameLogin = "Tên đăng nhập không được để trống.";
    if (!loginData.password)
      newErrors.passwordLogin = "Mật khẩu không được để trống.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Kiểm lỗi đăng ký
  const validateSignup = () => {
    const newErrors: Errors = {};
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    const fullnameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

    /*const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // Mật khẩu mạnh
    */
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,}$/;

    // Kiểm tra Username
    if (!signupData.username) {
      newErrors.usernameRegister = "Tên đăng nhập không được để trống.";
    } else if (!usernameRegex.test(signupData.username)) {
      newErrors.usernameRegister =
        "Tên đăng nhập không được chứa dấu hoặc khoảng trắng.";
    }

    // Kiểm tra Email
    if (!signupData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!emailRegex.test(signupData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    // Kiểm tra Password
    if (!signupData.password) {
      newErrors.passwordRegister = "Mật khẩu không được để trống.";
    } else if (!passwordRegex.test(signupData.password)) {
      newErrors.passwordRegister =
        "Hãy sử dụng mật khẩu mạnh hơn(ví dụ: abc123@)";
    }

    // Kiểm tra Phone
    if (!signupData.phone) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (!phoneRegex.test(signupData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Kiểm tra Fullname
    if (!signupData.fullname) {
      newErrors.fullname = "Họ và tên không được để trống.";
    } else if (!fullnameRegex.test(signupData.fullname)) {
      newErrors.fullname = "Họ và tên chỉ được chứa chữ cái và khoảng trắng.";
    } else if (signupData.fullname.length < 3) {
      newErrors.fullname = "Họ và tên phải có ít nhất 3 ký tự.";
    }

    // Kiểm tra Address
    if (!signupData.address) {
      newErrors.address = "Địa chỉ không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7048/api/Login/login",
        {
          UserName: loginData.username,
          Password: loginData.password,
        }
      );

      navigate("/"); // Di chuyển sang trang chính sau khi đăng nhập thành công
      window.location.reload();
      toast.success("Đăng nhập thành công!");
      
      setErrors({});
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage = error.response?.data;

        if (!errorMessage) {
          toast.error("Tên tài khoản hoặc mật khẩu không đúng");
        } else {
          toast.error(
            "Tài khoản đã bị khóa vui lòng liên hệ email (champhan625@gmail.com)"
          );
        }
      } else {
        setErrors({ general: "Đã xảy ra lỗi." });
        toast.error("Đã xảy ra lỗi."); // Hiển thị thông báo lỗi mặc định
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7048/api/Login/register",

        {
          UserName: signupData.username,
          Password: signupData.password,
          Email: signupData.email,
          Phone: signupData.phone,
          FullName: signupData.fullname,
          Address: signupData.address,
          Role: 2,
        }
      );
      window.location.reload();
      navigate("/login");

      toast.success("Đăng ký thành công!");
      
      setErrors({});
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage = error.response?.data;
        
        if (errorMessage) {
          toast.error("Tên tài khoản đã tồn tại.");
        } else {
          toast.error("Đăng ký thất bại");
        }
      } else {
        toast.error("Đã xảy ra lỗi.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7048/api/Account/ForgotPassword",
        {
          Email: signupData.email,
        }
      );
      alert(response.data.Message || "Liên kết đặt lại mật khẩu đã được gửi.");
      setForgotPasswordOpen(false);
      setErrors({});
    } catch (error: unknown) {
      setErrors({ email: "Email không hợp lệ hoặc không tồn tại!" });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`cont ${isSignup ? "s--signup" : ""}`}>
        <div className="form sign-in">
          <h2>Chào mừng</h2>
          <label>
            <span>Tên đăng nhập</span>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={(e) => handleInputChange(e, "login")}
            />
            {errors.usernameLogin && (
              <p className="error">{errors.usernameLogin}</p>
            )}
          </label>
          <label>
            <span>Mật khẩu</span>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, "login")}
            />
            {errors.passwordLogin && (
              <p className="error">{errors.passwordLogin}</p>
            )}
          </label>
          {errors.general && <p className="error">{errors.general}</p>}
          <p className="forgot-pass" onClick={handleForgotPassword}>
            Quên mật khẩu?
          </p>
          <button
            type="button"
            className="submit-nhap"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </div>

        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h3 style={{ color: "#fff" }}>
                Bạn chưa có tài khoản? Hãy đăng ký!
              </h3>
            </div>
            <div className="img__text m--in">
              <h3 style={{ color: "#fff" }}>
                Nếu bạn đã có tài khoản, hãy đăng nhập.
              </h3>
            </div>
            <div className="img__btn" onClick={toggleSignup}>
              <span className="m--up">Đăng ký</span>
              <span className="m--in">Đăng nhập</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Tạo tài khoản của bạn</h2>
            <div className="form-grid">
              <div className="form-column">
                <label>
                  <span>Tên đăng nhập</span>
                  <input
                    type="text"
                    name="username"
                    value={signupData.username}
                    onChange={(e) => handleInputChange(e, "sigup")}
                  />
                  {errors.usernameRegister && (
                    <p className="error">{errors.usernameRegister}</p>
                  )}
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </label>
                <label>
                  <span>Mật khẩu</span>
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={(e) => handleInputChange(e, "sinup")}
                  />
                  {errors.passwordRegister && (
                    <p className="error">{errors.passwordRegister}</p>
                  )}
                </label>
              </div>
              <div className="form-column">
                <label>
                  <span>Số điện thoại</span>
                  <input
                    type="text"
                    name="phone"
                    maxLength={10}
                    value={signupData.phone}
                    onChange={(e) => handleInputChange(e, "sinup")}
                  />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </label>
                <label>
                  <span>Họ và tên</span>
                  <input
                    type="text"
                    name="fullname"
                    value={signupData.fullname}
                    onChange={(e) => handleInputChange(e, "sinup")}
                  />
                  {errors.fullname && (
                    <p className="error">{errors.fullname}</p>
                  )}
                </label>
                <label>
                  <span>Địa chỉ</span>
                  <input
                    type="text"
                    name="address"
                    value={signupData.address}
                    onChange={(e) => handleInputChange(e, "sinup")}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </label>
              </div>
            </div>

            <button
              type="button"
              className="submit-nhap"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </div>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <div className="modal" onClick={() => setForgotPasswordOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Quên mật khẩu</h2>
            <p>Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.</p>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={(e) => handleInputChange(e, "signup")}
              placeholder="Nhập email của bạn"
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <div className="button-group">
              <button onClick={handleForgotPasswordSubmit}>
                {isLoading ? "Đang gửi..." : "Gửi liên kết"}
              </button>
              <button onClick={() => setForgotPasswordOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
