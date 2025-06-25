import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageBubble from './messageBubble';
import ResponseBubble from './responseBubble';
import Icon from '../assets/images/tea.png';
import { MdMic, MdMicOff } from 'react-icons/md';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js
const URL = process.env.REACT_APP_BACKEND_URL



const DecodeComponent = ({ userId, userInput, setUserInput, conversation, setConversation, currentLanguage, prompt, promptType, t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [openTab] = useState('decode');
  const [LastQuestion, setLastQuestion] = useState('5');
  // const [refineResponse, setRefineResponse] = useState(null); // Track the response for refining the analysis
  const [isListening, setIsListening] = useState(false); // Track whether speech recognition is active
  const [recognition, setRecognition] = useState(null); // Store SpeechRecognition instance
  const Language = currentLanguage === 'en' ? 'English' : 'French';
  console.log("Decode Current Language: ", Language)

  const conversationEndRef = useRef(null);
  const conversationDivRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isLoading]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = currentLanguage === 'en' ? 'en-US' : 'fr-FR';
      console.log("Voice Language: ", recognitionInstance.lang)
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        setUserInput(() => transcript); // Append speech to text area
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('Speech Recognition is not supported in this browser.');
    }
  }, []);

  // Function to send messages
  const sendMessage = async () => {
    if (userInput.trim()) {
      setIsLoading(true);
      const newConversation = [...conversation, { text: userInput, sender: 'user' }];
      setConversation(newConversation);
      setUserInput('');

      try {
        console.log("Current Language:", Language)
        const response = await axios.post(URL + '/api/chatbot/', {
          message: userInput,
          conversation: conversation,
          LastQuestion: LastQuestion,
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
          text: JSON.stringify({ Title: item.Title, Info: item.Info, Question: item.Question, LastQuestion: item.LastQuestion }),
          sender: 'assistant',
        }));

        setConversation([...newConversation, ...botMessages]);
        setLastQuestion(JSON.parse(botMessages[0]['text'])['LastQuestion']);
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
    setLastQuestion("5");
    setUserInput('');
  };
  const MakeStorableList = async (messages) => {
    setIsSaving(true);
    console.log(messages)
    const storableList = [];

    messages.forEach(message => {
      if (message.sender === 'user') {
        storableList.push({ message: message.text, sender: message.sender }); // Only store the text for user
      } else if (message.sender === 'assistant') {
        try {
          const parsed = JSON.parse(message.text);
          const title = parsed.Title || "NoTitle";
          const info = parsed.Info || parsed.Question || "No info";

          if (title === 'NoTitle') {
            if (parsed.Question === 'NoQuestion') {
              storableList.push({ Title: "", Info: info, sender: "assistant" });
            }
            else {
              storableList.push({ Title: "Question", Info: parsed.Question, sender: "assistant" });
            }
          } else {
            storableList.push({ Title: title, Info: info, sender: "assistant" });
          }
        } catch (error) {
          console.error("Failed to parse assistant message:", message.text);
        }
      }
    });

    try {
      console.log("StorableList: ", storableList)
      const res = await axios.post(`${URL}/api/save-conversation/`, {
        user_id: userId,
        content: storableList,
      });

      if (res.status === 201) {
        toast.success("We've sent Analsis to your email!");
        setIsSaving(false)
      }
    } catch (err) {
      console.error('Error saving conversation:', err);
      toast.error('Error: Please try again!');
      setIsSaving(false)

    }
  };



  // Handle refine analysis response
  const handleRefineResponse = async (response) => {
    // setRefineResponse(response);
    if (response === 'yes') {
      try {
        setIsLoading(true);
        setLastQuestion("0");

        const response = await axios.post(URL + '/api/chatbot/', {
          message: 'I want to refine the analysis',
          conversation: conversation,
          LastQuestion: "0",
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
          text: JSON.stringify({ Title: item.Title, Info: item.Info, Question: item.Question, LastQuestion: item.LastQuestion }),
          sender: 'assistant',
        }));

        setConversation([...conversation, ...botMessages]);
        setLastQuestion(JSON.parse(botMessages[0]['text'])['LastQuestion']);
      } catch (error) {
        console.error('Error sending refine analysis request:', error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle the response to provide comprehensive analysis
  const handleProvideResponse = async (response) => {
    // setRefineResponse(response);
    if (response === 'yes') {
      try {
        setIsLoading(true);
        setLastQuestion("2");

        const response = await axios.post(URL + '/api/chatbot/', {
          message: 'I want you to provide me a comprehensive response to this.',
          conversation: conversation,
          LastQuestion: "2",
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
          text: JSON.stringify({ Title: item.Title, Info: item.Info, Question: item.Question, LastQuestion: item.LastQuestion }),
          sender: 'assistant',
        }));

        setConversation([...conversation, ...botMessages]);
        setLastQuestion(JSON.parse(botMessages[0]['text'])['LastQuestion']);
      } catch (error) {
        console.error('Error sending refine analysis request:', error.response || error.message || error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Start and stop speech recognition
  const toggleListening = () => {
    console.log("Speech")
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const downloadPDF = () => {


    const element = conversationDivRef.current;
    console.log(element);

    const options = {
      margin: 1,
      filename: 'conversation.pdf',
      html2canvas: {
        scale: 1,
        useCORS: true,
        logging: false,
        letterRendering: true,
        dpi: 300,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true,
      },
    };

    // try {
    //   html2pdf().from(element).set(options).save();
    // } catch (error) {
    //   console.error('Error generating PDF:', error);
    // }
  };






  return (
    <div ref={conversationDivRef} className={`flex flex-col min-h-[45vh] md:min-h-[71vh] lg:h-full ${openTab === 'decode' ? 'block' : 'hidden'}`}>
      {/* Conversation Area */}
      <div className="flex-1 p-4">
        <ToastContainer />

        <div className="conversation flex flex-col gap-2 ">
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
                      <ResponseBubble currentLanguage={currentLanguage} Title={parsedData.Title} response={parsedData.Info} Question={parsedData.Question} />
                      {index === conversation.length - 1 && (
                        <div className="relative flex flex-wrap justify-start items-center gap-2.5 mb-4">
                          <button
                            onClick={handleStartOver}
                            className="w-full sm:w-56 h-12 sm:h-[52px] rounded-full text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b] text-center text-sm sm:text-base font-semibold leading-normal px-4 py-2 transition duration-300 ease-in-out"
                          >
                            {t('startOver')}
                          </button>

                          <button
                            onClick={() => MakeStorableList(conversation)}



                            className="w-full sm:w-56 h-12 sm:h-[52px] rounded-full text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b] text-center text-sm sm:text-base font-semibold leading-normal px-4 py-2 transition duration-300 ease-in-out"
                          >
                            {isSaving ? t('saving') : t('save')}
                          </button>
                        </div >
                      )}
                      {index === conversation.length - 1 && LastQuestion === '5' && promptType === 'premium' && (
                        <div className="relative flex flex-wrap justify-start items-center gap-2.5 mb-4">

                          <button
                            onClick={() => handleRefineResponse('yes')}
                            className="w-full sm:w-56 h-12 sm:h-[52px] rounded-full text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b] text-center text-sm sm:text-base font-semibold leading-normal px-4 py-2 transition duration-300 ease-in-out"
                          >
                            {t("refineAnalysis")}
                          </button>

                          {/* Yes/No buttons for refine analysis */}
                          <button
                            onClick={() => handleProvideResponse('yes')}
                            className="w-full sm:w-56 h-12 sm:h-[52px] rounded-full text-[#ff765b] shadow border border-[#ff765b] hover:text-white hover:bg-[#ff765b] text-center text-sm sm:text-base font-semibold leading-normal px-4 py-2 transition duration-300 ease-in-out"
                          >
                            {t("response")}
                          </button>



                        </div>
                      )}
                    </>
                  );
                })()
              )}
            </div>
          ))}

          {isLoading && (
            <div className="w-full flex justify-center mt-4 flex-col items-center">
              <img src={Icon} alt="Loading..." className="w-12 h-12" />
              <div className="mt-2 text-sm text-gray-500">We're getting the tea ready...</div>
            </div>
          )}

          <div ref={conversationEndRef}></div>
        </div>
      </div>

      {/* User Input & Speech-to-Text Button */}
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
            className="border-[1px] border-info rounded-xl w-full h-[80px] p-5 bg-white focus:outline-none"
          />

          <div className="text-sm text-[#B5B6B6] font-medium">{userInput.length}/255</div>
        </div>
        <div className="flex justify-end gap-2">

          <button
            onClick={sendMessage}
            className="w-[183px] h-[52px] bg-[#ff765b] rounded-[100px] shadow hover:bg-[#005666] ml-auto"
            disabled={isLoading}
          >

            <div className="text-center text-[#fdfdfd] text-base font-bold uppercase tracking-wide">
              {isLoading ? t('loading') : t('letMeKnow')}
            </div>
          </button>
          <button
            onClick={toggleListening}
            className="w-[50px] h-[50px] bg-[#ff765b] rounded-full shadow hover:bg-[#005666] flex items-center justify-center"
          >
            <div className="text-[#fdfdfd] text-xl font-bold">
              {isListening ? <MdMic /> : <MdMicOff />}
            </div>
          </button>
        </div>
      </div>
    </div >
  );
};

export default DecodeComponent;
