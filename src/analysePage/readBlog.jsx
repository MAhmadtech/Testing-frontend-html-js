import React, { useState } from 'react';
import blogImage from "../assets/images/blog.png";
import BlogComponent from './blogComponent';

const ReadBlog = ({ }) => {
  const [showBlogComponent, setShowBlogComponent] = useState(false);



  return (
    <> {/* Fragment used instead of parent div */}
      {/* Go Back Button */}
      <button
        className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        onClick={() => setShowBlogComponent(true)}
      >
        Go Back
      </button>

      {/* Blog Image Section */}
      <div className="overflow-hidden flex justify-center items-center rounded-lg">
        <img
          className="w-full h-[200px] rounded-lg object-cover"
          alt="Blog"
        />
      </div>

      {/* Blog Title Section */}
      <div className="mt-4 px-4">
        <h4 className="text-2xl text-primary font-semibold mb-2">
          "title"
        </h4>

        {/* Blog Description */}
      </div>
    </>
  );
};

export default ReadBlog;
