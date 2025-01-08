import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from "../assets/images/logo.svg";
import TabButtons from './TabButtons';
import SettingsModal from './SettingsModal';
import DecodeTab from './decodeTab';
import BlogComponent from './blogComponent';
import ProfileTab from './profileTab';

const Analyse = ({ currentLanguage }) => {
  const [openTab, setOpenTab] = useState('decode');
  const { i18n, t } = useTranslation(["Translations"]);
  const [posts, setPosts] = useState([]);
  const [promptType, setPromptType] = useState('free'); // For the toggle

  // State for DecodeTab
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [prompt, setPrompt] = useState('free'); // Added prompt state

  // Fetch blog posts when component mounts and every 5 seconds
  useEffect(() => {
    const fetchPosts = () => {
      fetch("https://chatbot-project-f3lh.onrender.com/api/api/blog-posts/")
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
    };

    // Initial fetch
    fetchPosts();

    // Set interval to fetch posts every 5 seconds
    const intervalId = setInterval(fetchPosts, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle language change
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(currentLanguage);
  };

  // Handle promptType change and sync with prompt state
  const handlePromptTypeChange = () => {
    const newPromptType = promptType === 'free' ? 'premium' : 'free';
    setPromptType(newPromptType);
    setPrompt(newPromptType); // Update the prompt state to match the promptType
  };

  return (
    <section className="hidden flex-col gap-8 bg-customgray p-12 md:flex lg:flex-row lg:h-screen lg:px-16 lg:py-12">
      <aside className="flex flex-col justify-between gap-2 bg-white rounded-[15px] shadow-[0px_4px_8px_0px_#9A9D9E1F] w-full p-5 lg:w-[256px] lg:px-5 lg:py-8">
        <div className="flex flex-row justify-between gap-16 lg:flex-col">
          <img src={logo} alt="logo" width="158" height="50" />
          <TabButtons openTab={openTab} setOpenTab={setOpenTab} t={t} />
        </div>
        <SettingsModal t={t} />
      </aside>

      <div className="flex flex-col w-full lg:w-8/12">
        <div className="flex flex-row justify-between items-center">
          <div className="text-2xl text-primary font-semibold">{t("gutFeeling")}</div>
          {/* Toggle Button parallel to "gutFeeling" text */}
          <label htmlFor="toggleFreePremium" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="toggleFreePremium"
                type="checkbox"
                checked={promptType === 'premium'}
                onChange={handlePromptTypeChange} // Update state with the new value
                className="sr-only"
              />
              <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${promptType === 'premium' ? 'transform translate-x-6 bg-primary' : ''}`}
              ></div>
            </div>
            <div className="ml-3 text-sm font-semibold">{promptType === 'free' ? t("Free") : t("Premium")}</div>
          </label>
        </div>
        <div className="texl-lg text-primary font-medium">{t("testItOut")}</div>

        <div className="custom-scrollbar bg-white rounded-[15px] relative shadow-[0px_4px_8px_0px_#9A9D9E1F] w-full p-10 h-auto overflow-y-auto">
          {openTab === 'decode' && (
            <DecodeTab
              userInput={userInput}
              setUserInput={setUserInput}
              conversation={conversation}
              setConversation={setConversation}
              currentLanguage={currentLanguage}
              prompt={prompt} // Ensure prompt is passed properly
              t={t}
            />
          )}
          {openTab === 'blog' && <BlogComponent t={t} posts={posts} currentLanguage={currentLanguage} />}
          {openTab === 'profile' && <ProfileTab t={t} />}
        </div>
      </div>
    </section>
  );
}

export default Analyse;
