import axios from "axios";

const token: string = "3814abc7-b4a6-11ef-a89d-dab02cbaab48";
const headers = {
  "Content-Type": "application/json",
  Token: token, // Đính token vào header với tên là 'Token'
};
export const getProvince: () => Promise<ProvinceDtos[]> = async () => {
  try {
    const response = await axios.get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      { headers }
    );
    return response.data.data; // Trả về `data` từ response
  } catch (error) {
    
    return []; // Trả về mảng rỗng trong trường hợp lỗi
  }
};

export const getDistrict: (
  provinceId: number
) => Promise<DistrictDtos[]> = async (provinceId) => {
  try {
    let data = { province_id: provinceId };
    const response = await axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      data,
      { headers }
    );

    return response.data.data; // Trả về `data` từ response
  } catch (error) {
    
  }
};

export const getWard: (districtId: number) => Promise<WardDtos[]> = async (
  districtId: number
) => {
  try {
    const response = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      { headers }
    );
    return response.data.data; // Trả về `data` từ response
  } catch (error) {
    
  }
};

export const getShipping: (
  data: ShippingOrderDtos
) => Promise<DataReturnShippng> = async (data) => {
  try {
    const response = await axios.post(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
      data,
      { headers }
    );
    return response.data.data; // Trả về `data` từ response
  } catch (error) {
    
  }
};
