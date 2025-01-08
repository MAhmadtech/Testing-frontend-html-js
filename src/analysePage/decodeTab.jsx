import React, { useState } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import MessageBubble from './messageBubble';
import ResponseBubble from './responseBubble';

const DecodeComponent = ({ userInput, setUserInput, conversation, setConversation, currentLanguage, prompt, t }) => {
  const [openTab] = useState('decode');
  const Language = currentLanguage === 'en' ? 'English' : 'French';

  // Function to send messages to backend
  const sendMessage = async () => {
    if (userInput.trim()) {
      // Add user input to conversation
      const newConversation = [...conversation, { text: userInput, sender: 'user' }];
      setConversation(newConversation);
      setUserInput('');

      try {
        // POST request to backend
        const response = await axios.post('http://127.0.0.1:8000/api/chatbot/', {
          message: userInput,
          Language: Language, // Correct variable usage
          prompt: prompt,    // Fixed key name
        });

        // Handle response
        let parsedData;
        if (typeof response.data.message === 'string') {
          parsedData = JSON.parse(response.data.message).data;
        } else {
          parsedData = response.data.message.data; // Assuming it's already an object
        }

        // Process and add bot messages
        const botMessages = parsedData.map((item) => ({
          text: JSON.stringify({ Title: item.Title, Info: item.Info }),
          sender: 'bot',
        }));

        setConversation([...newConversation, ...botMessages]);
      } catch (error) {
        console.error('Error sending message:', error.response || error.message || error);
      }
    }
  };

  // Function to reset conversation
  const handleStartOver = () => {
    setConversation([]); // Reset conversation state
    setUserInput(''); // Reset input field
  };

  return (
    <div className={`flex flex-col justify-between h-[70vh] lg:h-full${openTab === 'decode' ? 'block' : 'hidden'}`}>
      <div>
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={message.sender}>
              <strong>
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
                          <div className="relative flex justify-start items-center gap-2.5 mb-4">
                            {/* Start Over Button */}
                            <div className="relative w-56 h-[52px]">
                              <div className="w-56 h-[52px] absolute top-0 left-0 rounded-[100px] text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b]">
                                <button
                                  onClick={handleStartOver}
                                  className="w-[199.18px] absolute top-[14px] left-[12.41px] text-center text-base font-semibold leading-normal font-['Proxima Nova']"
                                >
                                  {t('startOver')}
                                </button>
                              </div>
                            </div>

                            {/* Save Button */}
                            <div className="relative w-56 h-[52px]">
                              <div className="w-56 h-[52px] absolute top-0 left-0 rounded-[100px] text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b]">
                                <button className="w-[199.18px] absolute top-[14px] left-[12.41px] text-center text-base font-semibold leading-normal font-['Proxima Nova']">
                                  {t('save')}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()
                )}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full items-end gap-2">
        <div className="flex flex-col gap-1 w-full">
          <textarea
            id="w3review"
            name="w3review"
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
        <button
          onClick={sendMessage}
          className="w-[183px] h-[52px] bg-[#ff765b] rounded-[100px] shadow hover:bg-[#005666] mb-8"
        >
          <div className="text-center text-[#fdfdfd] text-base font-bold uppercase tracking-wide">
            {t('letMeKnow')}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DecodeComponent;
