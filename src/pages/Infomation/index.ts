import axios from 'axios';


export interface AccountDto {
  accountId: number;
  userName: string;
  email: string;
  phone: string;
  fullName: string;
  address: string;
  password: string;
  imageUrl?: string; 
}

export interface upprofile{

  Email: string;
  Password: string;
  Phone: string;
  FullName: string;
  Address: string;
  Image?: string; 
}


export const getUserById = async (id: number): Promise<AccountDto | null> => {
  try {
    const response = await axios.get<AccountDto>(`https://localhost:7048/api/Login/get-login-by-id/${id}`);
    return response.data;
  } catch (error) {
    
    return null; 
  }
};

export const UpProfile = async (id: number, data: FormData): Promise<upprofile | null> => {
  try {
    const response = await axios.put<upprofile>(
      `https://localhost:7048/api/Login/up-profile/${id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } } // Đảm bảo header đúng với FormData
    );
    return response.data;
  } catch (error) {
    
    return null; 
  }
};

