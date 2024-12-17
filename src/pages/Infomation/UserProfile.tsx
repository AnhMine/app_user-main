import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, AccountDto, UpProfile } from "./index";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import các icon mắt
import "./Information.css";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<AccountDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    image: null as File | null,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false); // Trạng thái hiển thị mật khẩu

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      const userData = await getUserById(Number(id));
      if (userData) {
        setUser(userData);
        setFormData({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          password: userData.password,
          image: null,
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const imageUrl = formData.image
    ? URL.createObjectURL(formData.image)
    : user?.imageUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const formDataObj = new FormData();
    formDataObj.append("FullName", formData.fullName);
    formDataObj.append("Email", formData.email);
    formDataObj.append("Phone", formData.phone);
    formDataObj.append("Address", formData.address);
    formDataObj.append("Password", formData.password);
    if (formData.image) {
      formDataObj.append("Image", formData.image);
    }

    try {
      const response = await UpProfile(Number(id), formDataObj);
      if (response) {
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin.");
      
    }
  };

  if (loading) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  if (!user) {
    toast.error("Không tìm thấy thông tin của bạn");
    return <p>Không tìm thấy thông tin người dùng.</p>;
  }

  return (
    <div className="information-container">
      <h2>Thông Tin Cá Nhân</h2>
      <form onSubmit={handleSubmit}>
          <div className="avatar-preview">
            <img src="/src/image/av.jpg" alt="" />
          </div>

        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group password-group">
          <label>Mật khẩu</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <a
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </a>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Cập nhật thông tin
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
