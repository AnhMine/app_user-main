import axios, { AxiosResponse } from "axios";

interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  address: string;
  role: number;
  picture: File; // Hình ảnh tài khoản
}

interface RegisterResponse {
  success: boolean;
  data?: unknown; // Sử dụng unknown thay vì any
  message?: string;
}

export const registerAccount = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const formData = new FormData();
    formData.append("UserName", payload.userName);
    formData.append("Email", payload.email);
    formData.append("Password", payload.password);
    formData.append("Phone", payload.phone);
    formData.append("FullName", payload.fullName);
    formData.append("Address", payload.address);
    formData.append("Role", payload.role.toString());
    formData.append("Picture", payload.picture);

    const response: AxiosResponse = await axios.post(
      "http://localhost:7048/api/Account/add-account",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      success: true,
      data: response.data, // Nếu biết cấu trúc, thay unknown bằng kiểu rõ ràng
    };
  } catch (error: unknown) {
    // Kiểm tra nếu lỗi là AxiosError
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data || "Có lỗi xảy ra trong quá trình đăng ký",
      };
    }

    // Xử lý các lỗi khác không phải của Axios
    return {
      success: false,
      message: "Đã xảy ra lỗi không xác định",
    };
  }
};
