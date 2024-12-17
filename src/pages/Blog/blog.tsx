import { useEffect, useState } from "react";
import "./blog.scss";
import { getAllBlog } from "./blog-api";

export const Blog = () => {
  const [blog, setBlog] = useState<BlogDtos[]>([]);
  const getBlog = async () => {
    try {
      const response = await getAllBlog();
      setBlog(response);
    } catch (error) {
      
      throw new Error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      {/* ##### Breadcumb Area Start ##### */}
      <div
        className="breadcumb_area breadcumb-style-two bg-img"
        style={{
          backgroundImage: "url(../../../src/assets/img/bg-img/breadcumb2.jpg)",
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="page-title text-center">
                <h2>COZA Blog</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ##### Breadcumb Area End ##### */}
      {/* ##### Blog Wrapper Area Start ##### */}
      <div className="blog-wrapper section-padding-80">
        <div className="container">
          <div className="row">
            {/* Single Blog Area */}
            {blog.map((item) => (
              <div className="col-12 col-lg-6">
                <div className="single-blog-area mb-50">
                  <img
                    src={`https://localhost:7048/${item.image}`}
                    className="img-blogs"
                    alt="hình ảnh"
                  />
                  {/* Post Title */}
                  <div className="post-title">
                    <a>{item.headLine}.</a>
                  </div>
                  {/* Hover Content */}
                  <div className="hover-content">
                    {/* Post Title */}
                    <p
                      dangerouslySetInnerHTML={{ __html: item.content }}
                      className="content-blog"
                    ></p>
                    <a href={`/detail-blog/${item.id}`}>
                      Đọc tiếp <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ##### Blog Wrapper Area End ##### */}
    </>
  );
};

export default Blog;
