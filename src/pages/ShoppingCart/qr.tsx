import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRData {
  MaHoaDon: string;
  NgayTaoHoaDon: string;
  TenKhachHangThanhToan: string;
  SoDienThoaiKhachHangThanhToan: string;
  EmailKhachHangThanhToan: string;
  TongTienThanhToan: string;
  ChiTietSanPham: {
    TenDichVu: string;
    Size: string;
    DonGia: string;
    soLuong: string;
    TongTien: string;
  }[];
}

const QRCodeScanner: React.FC = () => {
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [scannerVisible, setScannerVisible] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Mở modal
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    if (scannerVisible) {
      const scanner = new Html5QrcodeScanner("reader", {
        qrbox: { width: 1200, height: 1200 },
        fps: 5,
        verbose: true,
      });

      const success = (result: string | null) => {
        if (result) {
          try {
            const lines = result
              .split("\n")
              .filter((line) => line.trim() !== "");
            const data: Partial<QRData> = {};
            
              
              lines.forEach((line, index) => {
                const [key, ...valueParts] = line.split(":");
                const value = valueParts.join(":").trim();

                switch (key.trim()) {
                  case "Mã Hóa Đơn":
                    data.MaHoaDon = value;
                    break;
                  case "Ngày Tạo":
                    data.NgayTaoHoaDon = value;
                    break;
                  case "Khách Hàng":
                    data.TenKhachHangThanhToan = value;
                    break;
                  case "Số Điện Thoại":
                    data.SoDienThoaiKhachHangThanhToan = value;
                    break;
                  case "Email":
                    data.EmailKhachHangThanhToan = value;
                    break;
                  case "Tổng Tiền Thanh Toán":
                    data.TongTienThanhToan = value;
                    break;
                  case "Chi Tiết Sản Phẩm":
                    const productDetails: {
                      TenDichVu: string;
                      Size: string;
                      DonGia: string;
                      soLuong: string;
                      TongTien: string;
                    }[] = [];

                    // Lặp qua các dòng tiếp theo sau "Chi Tiết Sản Phẩm"
                    for (let i = index + 1; i < lines.length; i++) {
                      const lineDetail = lines[i].replace(/\r/g, "").trim();

                      // Nếu dòng bắt đầu với "- Sản phẩm:", bắt đầu lấy thông tin
                      if (lineDetail.startsWith("- Sản phẩm:")) {
                        // Tách các thông tin về sản phẩm, size, giá, số lượng và tổng
                        const productPart = lineDetail
                          .split("Sản phẩm:")[1]
                          ?.trim();
                        const sizePart = lines[i + 1]
                          ?.split("Size:")[1]
                          ?.trim();
                        const pricePart = lines[i + 2]
                          ?.split("Đơn giá:")[1]
                          ?.trim();
                        const quantityPart = lines[i + 3]
                          ?.split("Số lượng:")[1]
                          ?.trim();
                        const totalPart = lines[i + 4]
                          ?.split("Tổng:")[1]
                          ?.trim();

                        // Kiểm tra xem tất cả các phần thông tin có hợp lệ hay không
                        if (
                          productPart &&
                          sizePart &&
                          pricePart &&
                          quantityPart &&
                          totalPart
                        ) {
                          // Thêm sản phẩm vào mảng productDetails với tên trường đúng như yêu cầu
                          productDetails.push({
                            TenDichVu: productPart,
                            Size: sizePart,
                            DonGia: pricePart,
                            soLuong: quantityPart,
                            TongTien: totalPart,
                          });
                        }

                        // Bỏ qua các dòng sau khi đã lấy đủ thông tin về sản phẩm
                        i += 4; // Chuyển sang dòng tiếp theo của sản phẩm khác
                      }
                    }

                    // Nếu có thông tin chi tiết sản phẩm, đưa vào data.ChiTietSanPham
                    if (productDetails.length > 0) {
                      data.ChiTietSanPham = productDetails;
                    }
                    break;

                  default:
                    break;
                }
              });
            openModal();
            setQrData(data as QRData);
          } catch (error) {
            
            alert("QR code không hợp lệ!");
          }
        }
      };

      const error = (err: any) => {
        
      };

      scanner.render(success, error);

      return () => {
        scanner.clear();
      };
    }
  }, [scannerVisible]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        marginLeft: "auto", // Căn giữa theo chiều ngang
        marginRight: "auto", // Căn giữa theo chiều ngang
        display: "block",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Quét mã QR</h2>
      <div
        id="reader"
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto", // Căn giữa theo chiều ngang
          border: "2px solid #ddd",
          borderRadius: "8px",
          padding: "10px",
          display: "block", // Đảm bảo phần tử là block-level để margin auto có hiệu lực
          width: "80%",
        }}
      ></div>

      {isModalOpen && qrData && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Thông tin hóa đơn
            </h3>
            <div style={{ marginTop: "30px", marginLeft: "150px" }}>
              <p>
                <b>Mã Hóa Đơn:</b> {qrData.MaHoaDon}
              </p>
              <p>
                <b>Ngày Tạo:</b> {qrData.NgayTaoHoaDon}
              </p>
              <p>
                <b>Khách Hàng:</b> {qrData.TenKhachHangThanhToan}
              </p>
              <p>
                <b>Số Điện Thoại:</b> {qrData.SoDienThoaiKhachHangThanhToan}
              </p>
              <p>
                <b>Email:</b> {qrData.EmailKhachHangThanhToan}
              </p>
              <p>
              <b>Tổng Tiền:</b> {qrData.TongTienThanhToan.replace(/,00$/, '')}VND


              </p>
            </div>

            <div>
              <h4 style={{ color: "#333", marginTop: "20px" }}>
                Chi tiết sản phẩm
              </h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        border: "1px solid #ddd",
                      }}
                    >
                      Tên sản phẩm
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        border: "1px solid #ddd",
                      }}
                    >
                      Size
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        border: "1px solid #ddd",
                      }}
                    >
                      Đơn giá
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        border: "1px solid #ddd",
                      }}
                    >
                      Số lượng
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        border: "1px solid #ddd",
                      }}
                    >
                      Tổng cộng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {qrData.ChiTietSanPham?.map((product, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                      }}
                    >
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {product.TenDichVu}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {product.Size}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {product.DonGia}.000 VND
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {product.soLuong}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {product.TongTien}.000 VND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button style={closeButtonStyle} onClick={closeModal}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const modalBackdropStyle: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  width: "1000px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  position: "relative",
};

const closeButtonStyle: React.CSSProperties = {
  // position: 'absolute',
  top: "10px",
  marginRight: "10px",
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  width: "100px",
  padding: "5px",
  backgroundColor: "red",
};

export default QRCodeScanner;
