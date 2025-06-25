import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For animation
import { HeartIcon } from "@heroicons/react/solid"; // Heart icon for like
import BlogComponent from "./blogComponent";

const ReadBlog = ({ likes, id, userId, image, title, description, t, posts, currentLanguage }) => {
  const [showBlogComponent, setShowBlogComponent] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [loading, setLoading] = useState(true);

  // Function to check if the user already liked the blog post
  const fetchLikeStatus = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/likeBlog/${userId}/${id}/`);
      setLiked(response.data.is_liked);
    } catch (error) {
      console.error("Error fetching like status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch like status when component loads
  useEffect(() => {
    fetchLikeStatus();
  }, [userId, id]);

  // Function to handle like/unlike (Optimistic UI)
  const handleLike = async () => {
    if (liked) return; // Prevent liking if already liked

    // **Optimistically update UI first**
    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await axios.post("http://127.0.0.1:8000/api/likeBlog/", {
        userId: userId,
        blogId: id,
      });
    } catch (error) {
      console.error("Error liking blog:", error);

      // **Revert UI if API call fails**
      setLiked((prevLiked) => !prevLiked);
      setLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
    }
  };

  if (showBlogComponent) {
    return <BlogComponent t={t} userId={userId} posts={posts} currentLanguage={currentLanguage} />;
  }

  return (
    <div className="relative p-4">
      {/* Go Back Button */}
      <button
        className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        onClick={() => setShowBlogComponent(true)}
      >
        Go Back
      </button>

      {/* Blog Image Section */}
      <div className="overflow-hidden flex justify-center items-center rounded-lg">
        <img className="w-full h-[200px] rounded-lg object-cover" src={image} alt="Blog" />
      </div>

      {/* Blog Title Section */}
      <div className="mt-4 px-4">
        <h4 className="text-2xl text-primary font-semibold mb-2">{title}</h4>

        {/* Blog Description */}
        <div className="text-sm text-gray-700 leading-relaxed text-justify">
          {description.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Like Button */}
      <div className="flex items-center justify-center mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <motion.button
            whileTap={{ scale: 1.2 }} // Animation effect when clicking
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white ${liked ? "bg-secondary cursor-not-allowed" : "bg-secondary hover:bg-secondary"} focus:outline-none`}
            onClick={handleLike}
            disabled={liked} // Disable the button if liked
          >
            <HeartIcon className={`w-6 h-6 transition-all ${liked ? "text-white" : "text-gray-300"}`} />
            <span>{liked ? "Liked" : "Like"}</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ReadBlog;
