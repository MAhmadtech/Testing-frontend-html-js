import React from 'react';

const TabButtons = ({ openTab, setOpenTab, t }) => {
  return (
    <div className="flex flex-row gap-8 lg:flex-col">
      <button
        onClick={() => setOpenTab('decode')}
        className={`inline-flex items-center gap-3 font-normal text-base rounded-[100px] px-4 py-3 duration-50 ease-in-out lg:text-lg lg:p-4 ${openTab === 'decode' ? 'text-white bg-secondary' : 'text-primary bg-transparent'
          }`}
      >
        <i className="fa-solid fa-code"></i>
        {t("decode")}
      </button>
      <button
        onClick={() => setOpenTab('blog')}
        className={`inline-flex items-center gap-3 font-normal text-base rounded-[100px] px-4 py-3 duration-50 ease-in-out lg:text-lg lg:p-4 ${openTab === 'blog' ? 'text-white bg-secondary' : 'text-primary bg-transparent'
          }`}
      >
        <i className="fa-solid fa-blog"></i>
        {t("blog")}
      </button>
      <button
        onClick={() => setOpenTab('profile')}
        className={`inline-flex items-center gap-3 font-normal text-base rounded-[100px] px-4 py-3 duration-50 ease-in-out lg:text-lg lg:p-4 ${openTab === 'profile' ? 'text-white bg-secondary' : 'text-primary bg-transparent'
          }`}
      >
        <i className="fa-solid fa-user"></i>
        {t("myProfile")}
      </button>
    </div>
  );
};

export default TabButtons;
