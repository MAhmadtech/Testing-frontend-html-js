// VictimizationResponse.js
import React from 'react';

const ResponseBubble = ({ Title, response }) => {
  return (
    <div className="w-[856.28px] mb-4 relative">
      <div className="w-[458px] px-4 py-3 left-0 relative bg-white/75 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] shadow flex-col justify-center items-start gap-2.5 inline-flex">
        <div className="flex-col justify-start items-start gap-3 flex">
          <div className="w-[426px] text-[#ff765b] text-2xl font-semibold font-['Proxima Nova'] leading-[30px]">
            {Title}
          </div>
          <div className="self-stretch flex-col justify-start items-end gap-4 flex">
            <div className="w-[426px] text-[#005666] text-base font-normal font-['Proxima Nova'] leading-tight">
              {response} {/* Display the response prop */}
            </div>
            <div className="flex gap-2">
              <button className="w-24 h-7 px-2 py-1 text-center text-white/75 text-sm font-medium font-['Proxima Nova'] leading-tight bg-[#88c1ba] rounded-lg justify-center items-center">
                Copy
              </button>
              <button className="w-24 h-7 px-2 py-1 text-center text-white/75 text-sm font-medium font-['Proxima Nova'] leading-tight bg-[#88c1ba] rounded-lg justify-center items-center">
                Listen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseBubble;
