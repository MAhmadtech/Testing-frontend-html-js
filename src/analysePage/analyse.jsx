import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import logo from "../assets/images/logo.svg";
import TabButtons from './TabButtons';
import SettingsModal from './SettingsModal';
import DecodeTab from './decodeTab';
import BlogComponent from './blogComponent';
import ProfileTab from './profileTab';
import { useEffect } from "react";


const Analyse = ({ currentLanguage }) => {
  const [openTab, setOpenTab] = useState('decode');

  const { i18n, t } = useTranslation(["Translations"]);

  // Change language handler
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(currentLanguage); // Update the language
  };

  // State for DecodeTab
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  // You can also use useEffect to handle language change based on prop or localStorage
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18n.changeLanguage(currentLanguage); // Change language if condition is met
    }
  }, [currentLanguage, i18n]);

  return (
    <section className="hidden flex-col gap-8 bg-customgray p-12 md:flex lg:flex-row lg:h-screen lg:px-16 lg:py-12">
      <aside className="flex flex-col justify-between gap-2 bg-white rounded-[32px] shadow-[0px_4px_8px_0px_#9A9D9E1F] w-full p-5 lg:w-[256px] lg:px-5 lg:py-8">
        <div className="flex flex-row justify-between gap-16 lg:flex-col">
          <img src={logo} alt="logo" width="158" height="50" />
          <TabButtons openTab={openTab} setOpenTab={setOpenTab} t={t} />
        </div>
        <SettingsModal t={t} /> {/* Assuming SettingsModal is correct */}
      </aside>
      <div className="flex flex-col gap-8 w-full lg:w-8/12">
        <div className="flex flex-col">
          <div className="flex gap-5">
            <div className="text-2xl text-primary font-semibold">{t("gutFeeling")}</div>
            <div className="inline-flex items-center gap-2 text-white bg-info rounded-lg h-auto px-2 py-1">
              <i className="fa-regular fa-lightbulb"></i>
              3 {/* This can be dynamically rendered as per your requirements */}
            </div>
          </div>
          <div className="texl-lg text-primary font-medium">{t("testItOut")}</div>
        </div>
        <div className="bg-white rounded-[32px] relative shadow-[0px_4px_8px_0px_#9A9D9E1F] w-full p-10 h-auto overflow-y-auto">
          {openTab === 'decode' && (
            <DecodeTab
              userInput={userInput}
              setUserInput={setUserInput}
              conversation={conversation}
              setConversation={setConversation}
              currentLanguage={currentLanguage}
              t={t}
            />
          )}
          {openTab === 'blog' && <BlogComponent t={t} />}
          {openTab === 'profile' && <ProfileTab t={t} />}
        </div>
      </div>
    </section>
  );
}

export default Analyse;
