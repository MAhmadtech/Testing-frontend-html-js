import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import blogImage from "../assets/images/blog.png"; // Optional fallback image
import ShowConversationComponent from './showConversation';

const getUserDataURL = process.env.REACT_APP_BACKEND_URL + "/api/likedBlogPosts";
const getConversations = process.env.REACT_APP_BACKEND_URL + "/api/get-conversations";

const ProfileTab = ({ t, userId }) => {
  const [openTab, setOpenTab] = useState('profile');
  const [likedPosts, setLikedPosts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);


  useEffect(() => {
    if (userId) {
      // Fetch liked blog posts
      axios
        .get(`${getUserDataURL}/${userId}/`)
        .then((response) => setLikedPosts(response.data))
        .catch((error) => console.error("Error fetching liked blog posts:", error));

      // Fetch recent conversations
      axios
        .get(`${getConversations}/${userId}/`)
        .then((response) => {
          console.log(response.data)
          setConversations(response.data)
        })
        .catch((error) => console.error("Error fetching conversations:", error));
    }
  }, [userId]);

  return (
    openTab === 'profile' && (
      <div>{selectedConversation ? (
        <ShowConversationComponent
          selectedConversation={selectedConversation}
        />
      ) : (
        <div className="flex flex-col gap-10">
          {/* Liked Articles Header */}
          <div className="flex justify-between">
            <h3 className="text-2xl text-primary font-proximasemibold">{t("likedArticles")}</h3>
            <button className="text-base text-secondary font-proximasemibold">{t("viewAll")}</button>
          </div>

          {/* Articles List */}
          <div className="overflow-x-auto">
            <div className="flex gap-3 w-fit">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-sm text-gray-500">{t("loadingArticles")}</p>
              )}
            </div>
          </div>

          {/* Message History Section */}
          <div className="mt-0">
            <h3 className="text-lg text-[#005666] font-proximasemibold">{t("messageHistory")}</h3>
            <div className="flex gap-4 flex-wrap">
              {conversations.length > 0 ? (
                conversations.map((conv, index) => (
                  <MessageCard setSelectedConversation={setSelectedConversation} key={index} conversation={conv} />
                ))
              ) : (
                <p className="text-sm text-gray-500">{t("loadingMessages")}</p>
              )}
            </div>
          </div>
        </div>)
      }
      </div>
    )
  );
};

const ArticleCard = ({ post }) => {
  const { t } = useTranslation();

  const truncate = (text, maxLength = 25) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="relative flex flex-col gap-3 w-[290px]">
      <div className="absolute top-3 left-3 text-xs text-white bg-secondary rounded-[100px] px-2 py-1">
        {post.topic || t("relationships")}
      </div>
      <img className="w-[290px] rounded-[5%] h-[176px]" src={post.image || blogImage} alt="blog" />
      <div className="pr-8">
        <h4 className="text-lg text-secondary font-proximasemibold">
          {truncate(post.title)}
        </h4>
        <p className="text-sm text-[#006D81] whitespace-pre-line">
          {truncate(post.content)}
        </p>
      </div>
      <div className="flex gap-3">
        <div className="text-xs text-[#B5B6B6]">{post.views_count} {t("views")}</div>
        <div className="text-xs text-[#005666] font-proximasemibold">{post.likes_count} {t("likes")}</div>
      </div>
    </div>
  );
};

const MessageCard = ({ setSelectedConversation, conversation }) => {
  const { t } = useTranslation();
  let parsedContent = [];

  try {
    parsedContent = conversation.content; // assuming it's an array
  } catch (error) {
    console.error("Error parsing conversation content:", conversation.content);
  }

  const latest = parsedContent[0] || {};
  const formattedDate = new Date(conversation.created_at).toLocaleDateString();

  const truncateWords = (text, wordLimit = 13) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (

    <div className="flex flex-col gap-1 rounded-2xl shadow-[0px_4px_8px_0px_#9A9D9E1F] p-3 bg-white w-full max-w-xs">
      <div onClick={() => setSelectedConversation(conversation)}
        className="flex justify-between items-center">
        <p className="text-sm text-[#005666] mt-2">
          {truncateWords(latest?.message)}
        </p>
      </div>
      <div className="text-xs text-[#BABBC0]">{formattedDate}</div>
    </div>
  );
};


export default ProfileTab;
