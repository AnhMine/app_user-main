import axios from "axios";

const URL: string = "https://localhost:7048/api/Blog";

export const getAllBlog = async (): Promise<BlogDtos[]> => {
  try {
    const response = await axios.get<any>(
      `${URL}/get-all-blog?maxPageSize=100&Pagesize=100`
    );
    return response.data.data;
  } catch (error) {
    
    throw new Error("Failed to fetch blogs");
  }
};

export const getBlogById = async (id: number): Promise<BlogDtos> => {
  try {
    const response = await axios.get<any>(`${URL}/blog-id/${id}`);
    return response.data;
  } catch (error) {
    
    throw new Error("Failed to fetch blogs");
  }
};
