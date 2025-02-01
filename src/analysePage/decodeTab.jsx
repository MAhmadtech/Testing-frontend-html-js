import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageBubble from './messageBubble';
import ResponseBubble from './responseBubble';
import Icon from '../assets/images/tea.png';

const DecodeComponent = ({ userInput, setUserInput, conversation, setConversation, currentLanguage, prompt, t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openTab] = useState('decode');
  const Language = currentLanguage === 'en' ? 'English' : 'French';
  const conversationEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isLoading]);

  // Function to send messages
  const sendMessage = async () => {
    if (userInput.trim()) {
      setIsLoading(true);
      const newConversation = [...conversation, { text: userInput, sender: 'user' }];
      setConversation(newConversation);
      setUserInput('');

      try {
        const response = await axios.post('https://chatbot-project-f3lh.onrender.com/api/chatbot/', {
          message: userInput,
          Language: Language,
          prompt: prompt,
        });

        let parsedData;
        if (typeof response.data.message === 'string') {
          parsedData = JSON.parse(response.data.message).data;
        } else {
          parsedData = response.data.message.data;
        }

        const botMessages = parsedData.map((item) => ({
          text: JSON.stringify({ Title: item.Title, Info: item.Info }),
          sender: 'bot',
        }));

        setConversation([...newConversation, ...botMessages]);
      } catch (error) {
        console.error('Error sending message:', error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Reset conversation
  const handleStartOver = () => {
    setConversation([]);
    setUserInput('');
  };

  return (
    <div className={`flex flex-col h-[70vh] lg:h-full ${openTab === 'decode' ? 'block' : 'hidden'}`}>
      {/* 🔥 Conversation area (only this part is scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="conversation flex flex-col gap-2 h-auto min-h-[240px]">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start flex-col'}`}>
              {message.sender === 'user' ? (
                <MessageBubble inputMessage={message.text} />
              ) : (
                (() => {
                  let parsedData;
                  try {
                    parsedData = JSON.parse(message.text);
                  } catch (e) {
                    parsedData = { Title: 'Error', Info: 'Invalid response format.' };
                  }

                  return (
                    <>
                      <ResponseBubble Title={parsedData.Title} response={parsedData.Info} />
                      {index === conversation.length - 1 && (
                        <div className="relative flex flex-wrap justify-start items-center gap-2.5 mb-4">
                          {/* Start Over Button */}
                          <button
                            onClick={handleStartOver}
                            className="w-full sm:w-56 h-12 sm:h-[52px] rounded-full text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b] text-center text-sm sm:text-base font-semibold leading-normal px-4 py-2 transition duration-300 ease-in-out"
                          >
                            {t('startOver')}
                          </button>

                          {/* Save Button */}
                          <button
                            className="w-full sm:w-56 h-12 sm:h-[52px] rounded-full text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b] text-center text-sm sm:text-base font-semibold leading-normal px-4 py-2 transition duration-300 ease-in-out"
                          >
                            {t('save')}
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()
              )}
            </div>
          ))}

          {/* 🔥 Loading Icon */}
          {isLoading && (
            <div className="w-full flex justify-center mt-4 flex-col items-center">
              <img src={Icon} alt="Loading..." className="w-12 h-12" />
              <div className="mt-2 text-sm text-gray-500">We're getting the tea ready...</div>
            </div>
          )}


          {/* 🔥 Invisible div to auto-scroll */}
          <div ref={conversationEndRef}></div>
        </div>
      </div>

      {/* 🔥 User Input & Send Button (fixed at bottom) */}
      <div className="bg-white p-4">
        <div className="flex flex-col gap-2">
          <textarea
            rows="4"
            placeholder={t('yourMessageHere')}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            value={userInput}
            className="border-[1px] border-info rounded-xl w-full h-[110px] p-5 bg-white focus:outline-none"
          />
          <div className="text-sm text-[#B5B6B6] font-medium">0/255</div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={sendMessage}
            className="w-[183px] h-[52px] bg-[#ff765b] rounded-[100px] shadow hover:bg-[#005666] ml-auto"
            disabled={isLoading}
          >
            <div className="text-center text-[#fdfdfd] text-base font-bold uppercase tracking-wide">
              {isLoading ? t('loading') : t('letMeKnow')}
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

export default DecodeComponent;
