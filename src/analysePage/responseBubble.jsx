import React, { useState } from 'react';

const ResponseBubble = ({ currentLanguage, Title, response, Question }) => {
  // State to handle the copy status
  const [copied, setCopied] = useState(false);
  const [listen, setListen] = useState(false);

  // Function to handle copying to clipboard
  const handleCopy = () => {
    // Copy the response text to clipboard
    navigator.clipboard.writeText(response)
      .then(() => {
        setCopied(true);
        // Reset copied status after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
      });
  };

  // Function to handle listening (speak the text)
  const handleListen = () => {
    if (!listen) {
      setListen(true);
      const textToRead = Title !== 'NoTitle' ? response : Question;

      if (textToRead) {
        const speech = new SpeechSynthesisUtterance(textToRead);
        speech.lang = currentLanguage === 'en' ? 'en-US' : 'fr-FR'; // Set the language to English (US)
        speech.onend = () => {
          setListen(false); // Reset listen to false when the speech ends
        };
        window.speechSynthesis.speak(speech);

      }
    }
    else {
      window.speechSynthesis.cancel();
      setListen(false);
    }
  };

  return (
    <div className="w-auto mb-4 relative">
      {Title !== 'NoTitle' ? (
        <div className="w-auto px-4 py-3 left-0 relative bg-white/75 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] shadow flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="flex-col justify-start items-start gap-3 flex">
            <div className="w-auto text-[#ff765b] text-2xl font-semibold font-['Proxima Nova'] leading-[30px]">
              {Title}
            </div>
            <div className="self-stretch flex-col justify-start items-end gap-4 flex">
              <div className="w-auto text-[#005666] text-base font-normal font-['Proxima Nova'] leading-tight">
                {response} {/* Display the response prop */}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`w-24 h-7 px-2 py-1 text-center text-white text-sm font-medium font-['Proxima Nova'] leading-tight bg-primary rounded-lg justify-center items-center ${copied ? 'bg-secondary text-primary' : ''}`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleListen}
                  className={`w-24 h-7 px-2 py-1 text-center text-white text-sm font-medium font-['Proxima Nova'] leading-tight bg-primary rounded-lg justify-center items-center ${listen ? 'bg-secondary text-primary' : ''}`}
                >
                  {listen ? 'Speaking!' : 'Listen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : Title === 'NoTitle' ? (
        <div className="w-auto px-4 py-3 left-0 relative bg-secondary rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] shadow flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch flex-col justify-start items-end gap-4 flex">
              <div className="w-auto text-white text-base font-normal font-['Proxima Nova'] leading-tight">
                {Question} {/* Display the response prop */}
              </div>
              <button
                onClick={handleListen}
                className={`w-24 h-7 px-2 py-1 text-center text-primary text-sm font-medium font-['Proxima Nova'] leading-tight bg-white rounded-lg justify-center items-center ${listen ? 'bg-primary text-white' : ''}`}
              >
                {listen ? 'Speaking!' : 'Listen'}
              </button>
            </div>
          </div>
        </div>
      ) : Title === '' ? (
        <div className="w-auto px-4 py-3 left-0 relative bg-white/75 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] shadow flex-col justify-center items-start gap-2.5 inline-flex">
          <div className="flex-col justify-start items-start gap-3 flex">
            <div className="w-auto text-[#ff765b] text-2xl font-semibold font-['Proxima Nova'] leading-[30px]">
              {Title}
            </div>
            <div className="self-stretch flex-col justify-start items-end gap-4 flex">
              <div className="w-auto text-[#005666] text-base font-normal font-['Proxima Nova'] leading-tight">
                {response} {/* Display the response prop */}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`w-24 h-7 px-2 py-1 text-center text-white/75 text-sm font-medium font-['Proxima Nova'] leading-tight bg-[#88c1ba] rounded-lg justify-center items-center ${copied ? 'bg-primary' : ''}`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleListen}
                  className={`w-24 h-7 px-2 py-1 text-center text-white/75 text-sm font-medium font-['Proxima Nova'] leading-tight bg-[#88c1ba] rounded-lg justify-center items-center ${listen ? 'bg-primary' : ''}`}
                >
                  {listen ? 'Speaking!' : 'Listen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ResponseBubble;
