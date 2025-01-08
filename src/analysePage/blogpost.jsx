
// BlogPosts.js
import React, { useState, useEffect } from "react";

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/api/blog-posts/")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "30px" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>`${post.image}`</p>
            {post.image && (
              <img
                src={`${post.image}`}
                alt={post.title}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <p><em>Posted on: {new Date(post.created_at).toLocaleDateString()}</em></p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPosts;