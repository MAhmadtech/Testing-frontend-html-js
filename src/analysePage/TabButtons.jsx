import React from 'react';
import SettingsModal from './SettingsModal';

const TabButtons = ({ openTab, setOpenTab, t }) => {
  return (
    <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:flex-col">
      <button
        onClick={() => setOpenTab('decode')}
        className={`inline-flex items-center justify-center gap-0 sm:gap-3 font-normal text-sm sm:text-base md:text-lg rounded-[100px] px-3 py-2 sm:px-4 sm:py-3 duration-50 ease-in-out ${openTab === 'decode' ? 'text-white bg-secondary' : 'text-primary bg-transparent'
          }`}
      >
        <i className="fa-solid fa-code text-lg sm:text-xl"></i>
        <span className="hidden sm:inline">{t("decode")}</span>
      </button>
      <button
        onClick={() => setOpenTab('blog')}
        className={`inline-flex items-center justify-center gap-0 sm:gap-3 font-normal text-sm sm:text-base md:text-lg rounded-[100px] px-3 py-2 sm:px-4 sm:py-3 duration-50 ease-in-out ${openTab === 'blog' ? 'text-white bg-secondary' : 'text-primary bg-transparent'
          }`}
      >
        <i className="fa-solid fa-blog text-lg sm:text-xl"></i>
        <span className="hidden sm:inline">{t("blog")}</span>
      </button>
      <button
        onClick={() => setOpenTab('profile')}
        className={`inline-flex items-center justify-center gap-0 sm:gap-3 font-normal text-sm sm:text-base md:text-lg rounded-[100px] px-3 py-2 sm:px-4 sm:py-3 duration-50 ease-in-out ${openTab === 'profile' ? 'text-white bg-secondary' : 'text-primary bg-transparent'
          }`}
      >
        <i className="fa-solid fa-user text-lg sm:text-xl"></i>
        <span className="hidden sm:inline">{t("myProfile")}</span>
      </button>
      <SettingsModal t={t} />
    </div>
  );
};

export default TabButtons;
