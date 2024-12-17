interface ProvinceDtos {
  ProvinceID: number;
  ProvinceName: string;
  CountryID: number;
  Code: string;
  NameExtension: string[];
}

interface DistrictDtos {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
}

interface WardDtos {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
}

interface items {
  name: string;
  quantity: number;
  height: number;
  weight: number;
  length: number;
  width: number;
}
interface ShippingOrderDtos {
  service_type_id: number;
  from_district_id: number;
  from_ward_code: string;
  to_district_id: number;
  to_ward_code: string;

  height: number;
  length: number;
  weight: number;
  width: number;
  insurance_value: number;
  coupon: null;
  items: items[];
}

interface DataReturnShippng {
  total: number;
  service_fee: number;
}
