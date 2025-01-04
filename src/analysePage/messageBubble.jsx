import React from 'react';

const MessageBubble = ({ inputMessage }) => {
  return (
    <div className="w-[328px] px-4 py-2.5 mb-4 left-[358px] relative bg-[#88c1ba] rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] shadow justify-end items-center gap-2.5 inline-flex">
      <div className="w-[426px] flex-col justify-center items-start gap-2.5 inline-flex">
        <div className="self-stretch text-white font-['Proxima Nova'] leading-tight">
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
