import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import blogImage from "../assets/images/blog.png";

const ProfileTab = ({ t }) => {
  const [openTab, setOpenTab] = useState('profile');

  return (
    openTab === 'profile' && (
      <div className="flex flex-col gap-3">
        {/* Liked Articles Header */}
        <div className="flex justify-between">
          <h3 className="text-2xl text-primary font-semibold">{t("likedArticles")}</h3>
          <button className="text-base text-secondary font-semibold">{t("viewAll")}</button>
        </div>

        {/* Articles List */}
        <div className="overflow-x-auto">
          <div className="flex gap-3 w-fit">
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>

        {/* Message History Section */}
        <div className="mt-0">
          <h3 className="text-lg text-[#005666] font-semibold">{t("messageHistory")}</h3>
          <div className="flex gap-12 lg:gap-20">
            <MessageCard />
            <MessageCard />
          </div>
        </div>
      </div>
    )
  );
};

// Article Card Component
const ArticleCard = () => {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col gap-3 w-[290px]">
      <div className="absolute top-3 left-3 text-xs text-white bg-secondary rounded-[100px] px-2 py-1">
        {t("relationships")}
      </div>
      <img className="w-[290px] h-[176px]" src={blogImage} alt="blog" />
      <div className="pr-8">
        <h4 className="text-lg text-secondary font-semibold">{t("articleTitle")}</h4>
        <p className="text-sm text-[#006D81]">{t("articleDescription")}</p>
      </div>
      <div className="flex gap-3">
        <div className="text-xs text-[#B5B6B6]">{t("views")}</div>
        <div className="text-xs text-[#005666] font-semibold">{t("likes")}</div>
      </div>
    </div>
  );
};

// Message Card Component
const MessageCard = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 rounded-2xl shadow-[0px_4px_8px_0px_#9A9D9E1F] p-3">
      <div className="flex justify-between">
        <h4 className="text-base text-[#006D81]">{t("messageText")}</h4>
        <i className="fa-solid fa-ellipsis-vertical text-[#88C1BA]"></i>
      </div>
      <div className="text-xs text-[#BABBC0]">{t("messageDate")}</div>
    </div>
  );
};

export default ProfileTab;
