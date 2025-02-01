import React from 'react';

const MessageBubble = ({ inputMessage }) => {
  return (
    <div className="max-w-[90%] md:max-w-[60%] lg:max-w-[40%] px-4 py-2.5 mb-4 relative bg-[#88c1ba] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] shadow-md flex items-center">
      <div className="flex flex-col justify-center items-start">
        <div className="text-white text-sm md:text-base font-['Proxima Nova'] leading-tight">
          {inputMessage}
          <span style={{ color: '#88c1ba' }} className="text-base font-normal font-['Proxima Nova'] leading-tight">
            {/* You can add any additional content here if needed */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
