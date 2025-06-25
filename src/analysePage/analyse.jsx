import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.svg";
import TabButtons from './TabButtons';
import SettingsModal from './SettingsModal';
import DecodeTab from './decodeTab';
import BlogComponent from './blogComponent';
import ProfileTab from './profileTab';

const BlogPostsURL = process.env.REACT_APP_BACKEND_URL + "/api/api/blog-posts/";

const Analyse = ({ currentLanguage }) => {
  const location = useLocation();
  const userId = location.state?.id || "";
  const first_name = location.state?.first_name || "";
  const email = location.state?.email || "";
  // console.log("iddd: ", userId)
  // console.log("nnn: ", first_name)
  // console.log("eee: ", email)

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
      fetch(BlogPostsURL)
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
    <section className="flex-col gap-8 bg-customgray p-6 md:flex lg:flex-row lg:h-screen lg:px-16 lg:py-12">
      {/* Sidebar - Adjusts to screen size */}
      <aside className="flex flex-col sm:flex-row lg:flex-col justify-between bg-white rounded-[15px] shadow-md w-full lg:w-[256px] p-4 overflow-hidden">
        <div className="flex flex-col items-center sm:items-start lg:items-center gap-16 w-full">
          <img src={logo} alt="logo" width="158" height="50" className="max-w-[80%] sm:max-w-[60%] lg:max-w-full" />
          <TabButtons openTab={openTab} setOpenTab={setOpenTab} first_name={first_name} email={email} t={t} />
        </div>
        {/* <SettingsModal t={t} className="w-full" /> */}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col w-full lg:w-8/12">
        <div className='p-6 md:p-0'>
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
              <div className="ml-3 text-sm font-semibold">{promptType === 'free' ? t("free") : t("premium")}</div>
            </label>
          </div>
          <div className="text-lg text-primary font-medium">{t("testItOut")}</div>
        </div>

        <div className="custom-scrollbar overflow-y-auto bg-white rounded-[15px] relative shadow-md w-full p-6 h-auto">
          {openTab === 'decode' && (
            <DecodeTab
              userId={userId}
              userInput={userInput}
              setUserInput={setUserInput}
              conversation={conversation}
              setConversation={setConversation}
              currentLanguage={currentLanguage}
              prompt={prompt}
              promptType={promptType} // Ensure prompt is passed properly
              t={t}
            />
          )}
          {openTab === 'blog' && <BlogComponent t={t} posts={posts} currentLanguage={currentLanguage} userId={userId} />}
          {openTab === 'profile' && <ProfileTab t={t} userId={userId} />}
        </div>
      </div>
    </section>
  );
}

export default Analyse;
