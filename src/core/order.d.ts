// DTO for Media
interface MediaDTO {
  isPrimary: boolean;
  link: string;
}

// DTO for Product Details
interface ProductDetailDTO {
  id: number;
  size: string;
  price: number;
  quantity: number;
  colorId: number;
  gender: string;
  status: string;
  productId: number;
}

// DTO for Product
interface ProductDTO {
  id: number;
  productName: string;
  description: string;
  categoryId: number;
  brandId: number;
  productDetais: ProductDetailDTO[]; // Assuming it's an array of details
  medias: MediaDTO[];
}

// DTO for Detail Order
interface DetailOrderDTO {
  detailProductId: number;
  quantity: number;
  orderId: number;
  colorName: string;
  detailProduct: ProductDetailDTO;
  product: ProductDTO;
}

// Main Order DTO
interface OrderDTO {
  id: number;
  orderCode: string;
  fullName: string;
  numberPhone: string;
  address: string;
  status: number;
  reason: string | null;
  totalPrice: number;
  paymentMethod: string;
  voucher: any | null;
  detailOrder: DetailOrderDTO[];
}
