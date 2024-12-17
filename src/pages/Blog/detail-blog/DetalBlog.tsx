import React, { useState, useEffect } from "react";
import "../blog.scss";
import { useParams } from "react-router-dom";
import { getAllBlog, getBlogById } from "../blog-api";

const DetalBlog: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogDtos>();
  const [blogs, setBlogs] = useState<BlogDtos[]>([]);
  const getBlog = async () => {
    try {
      const response = await getBlogById(Number(id));
      setBlog(response);
    } catch (error) {
      
    }
  };

  const getAllBlogApi = async () => {
    try {
      const response = await getAllBlog();

      setBlogs(response.filter((item) => item.id !== Number(id)).slice(0, 3));
    } catch (error) {
      
      throw new Error("Failed to fetch blogs");
    }
  };
  useEffect(() => {
    getBlog();
    getAllBlogApi();
  }, []);
  return (
    <div className="container">
      <div className="main-content">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        ></div>
      </div>
      <div className="blogs-lien-quan">
        <h3>Bài viết liên quan</h3>
        <div className="blog-wrapper">
          {/* Single Blog Area */}
          <div className="row">
            {blogs.map((item) => (
              <div className="col-12 col-lg-4">
                <div className="">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetalBlog;
