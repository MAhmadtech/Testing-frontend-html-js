import React, { useState } from 'react';
import blogImage from "../assets/images/blog.png";
import ReadBlog from './readBlog';

const BlogComponent = ({ t, posts, currentLanguage, userId }) => {
  const [openTab, setOpenTab] = useState('blog');
  const [tab, setTab] = useState('alltopic');
  const [selectedPost, setSelectedPost] = useState(null);

  // Truncate text helper
  const truncateText = (text, maxLength = 25) =>
    text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  // Count topic frequency
  const topicFrequency = posts.reduce((acc, post) => {
    const topic = post.topic?.toLowerCase() || 'unknown';
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  // Sorted topics by count (desc), excluding "alltopic"
  const sortedTopics = Object.entries(topicFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic)
    .filter(topic => topic !== 'alltopic');

  // Filter posts by tab
  const filteredPosts = tab === 'alltopic'
    ? posts
    : posts.filter(post => post.topic?.toLowerCase() === tab);

  return (
    <div>
      {selectedPost ? (
        <ReadBlog
          selectedPost={selectedPost}
          likes={selectedPost.likes_count}
          id={selectedPost.id}
          userId={userId}
          image={selectedPost.image}
          title={selectedPost.title}
          description={selectedPost.content}
          t={t}
          posts={posts}
          currentLanguage={currentLanguage}
        />
      ) : (
        <div className={`${openTab === 'blog' ? 'block' : 'hidden'} transition ease-out duration-100 transform scale-90 opacity-100 flex flex-col gap-3 rounded-full`}>
          <h3 className="text-2xl text-primary font-proximasemibold">{t("recommended")}</h3>

          {/* Featured Scroll */}
          <div className="overflow-x-auto custom-scrollbar">
            <div className="flex gap-3 w-fit pb-8">
              {posts.map((post, index) => (
                <div
                  key={post.id || index}
                  className="relative flex flex-col gap-3 w-[290px] rounded-[5%] cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="absolute top-3 left-3 text-xs text-white bg-secondary rounded-[100px] px-2 py-1">
                    {t("newPost")}
                  </div>
                  <img
                    className="w-[290px] h-[176px] rounded-[5%] object-cover"
                    src={post.image || blogImage}
                    alt="blog"
                  />
                  <div className="pr-8">
                    <h4 className="text-xl text-secondary font-proximasemibold">
                      {truncateText(post.title)}
                    </h4>
                    <p className="text-base text-[#006D81]">
                      {truncateText(post.content)}
                      {post.content?.length > 25 && (
                        <span
                          className="text-secondary cursor-pointer ml-2"
                          onClick={() => setSelectedPost(post)}
                        >
                          {t("readMore")}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-sm text-[#B5B6B6]">{post.views_count} {t("views")}</div>
                    <div className="text-sm text-[#005666] font-proximasemibold">{post.likes_count} {t("likes")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hardcore CSS Section */}
          <section className="flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mt-8">
              <button
                onClick={() => setTab('alltopic')}
                className={`text-sm border-[1px] rounded-[100px] w-fit px-3 py-2 ${tab === 'alltopic' ? 'text-white bg-secondary border-secondary' : 'text-[#828282] bg-transparent border-[#B5B6B6]'}`}
              >
                {t("allTopics")}
              </button>
              {sortedTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setTab(topic)}
                  className={`capitalize text-sm border-[1px] rounded-[100px] w-fit px-3 py-2 ${tab === topic ? 'text-white bg-secondary border-secondary' : 'text-[#828282] bg-transparent border-[#B5B6B6]'}`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Filtered Posts Display */}
            <div className="flex flex-col gap-[60px] md:flex-row flex-wrap">
              {filteredPosts.map((post, index) => (
                <div key={index} className="flex gap-3 rounded-[5%] cursor-pointer min-w-[40%]" onClick={() => setSelectedPost(post)}>
                  <img
                    src={post.image || blogImage}
                    alt="pic"
                    width={90}
                    height={60}
                    className="rounded-[5%] object-cover"
                  />
                  <div className="flex flex-col justify-between min-w-[70%]">
                    <div className="flex justify-between">
                      <div className="text-xs text-primary border-[1px] border-primary rounded-[100px] w-fit h-fit px-2 py-1">
                        {post.topic}
                      </div>
                      <div className="flex gap-1">
                        <div className="text-xs text-[#B5B6B6]">{post.views_count} {t("views")}</div>
                        <div className="text-xs text-[#005666] font-proximasemibold">{post.likes_count} {t("likes")}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-primary font-proximasemibold">{truncateText(post.title)}</h4>
                      <p className="text-xs text-[#B5B6B6]">{truncateText(post.content)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default BlogComponent;
