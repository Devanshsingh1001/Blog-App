import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    });
  }, []);

  console.log("Blogs:", blogs);

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog 
            id={blog._id}
            key={index}
            isUser={blog.user && localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user ? blog.user.name : "Unknown User"} // Handle missing user
          />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Blogs;
