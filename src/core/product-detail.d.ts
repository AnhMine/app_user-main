interface DetailProductDtos {
  ColorId: number;
  Gender: string;
  Price: number;
  Quantity: number;
  Size: string;
  Status: string;
  id: number;
  Color: ?any;
}

interface Detail {
  id: number;
  size: string;
  price: number;
  quantity: number;
  colorId: number;
  gender: string;
  status: string;
  productId: number;
}
