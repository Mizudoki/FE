import React, { useEffect, useState } from "react";
import "./Blog.css";
import { getAllBlogs } from "../../services/blogservice";
import { useNavigate } from "react-router-dom";



export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogs();
        const approved = data.filter((blog) => blog.isApproved === true); 
        setBlogs(approved);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách blog:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="blog">
      <section className="sec">
        <h2 className="title">Bài viết mới nhất</h2>
        <div className="list">
          {blogs.length === 0 ? (
            <p>Chưa có bài viết nào được duyệt.</p>
          ) : (
            blogs.map((blog) => (
          <div
            key={blog.blogId}
            className="card"
            onClick={() => navigate(`/blog/${blog.blogId}`)}
            style={{ cursor: "pointer" }}
          >
              <img
                className="img"
                src={
                  blog.imageUrl && blog.imageUrl.trim() !== ""
                    ? blog.imageUrl
                    : "/placeholder.svg?height=200&width=300"
                }
                alt={blog.title}
              />
                <div className="info">
                  <span className="date">
                    {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <h3 className="name">{blog.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="btn">Xem thêm</button>
      </section>
    </div>
  );
}
