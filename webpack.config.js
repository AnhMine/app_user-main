const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Thư mục đầu ra của các tệp build
    filename: "[name].bundle.js", // Định dạng tên tệp của các bundle
    publicPath: "/assets/", // Đảm bảo các tài nguyên tĩnh sẽ được phục vụ từ /assets/
  },
};
