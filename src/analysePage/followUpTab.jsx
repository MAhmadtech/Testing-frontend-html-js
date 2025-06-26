import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FollowUpTab = ({ openTab, onDone, t }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      style={{ display: openTab === 'follow' ? 'block' : 'none' }}
      className="w-full h-full flex justify-center items-center"
    >
      <div className="w-full max-w-[554px] h-[430px] relative p-4">
        {/* Enable Follow-up Questions Header */}
        <div className="absolute top-0 left-0 text-[#005666] text-xl md:text-2xl font-proximasemibold leading-[30px] font-['Proxima Nova']">
          {t("enableFollowUp")}
        </div>

        <div className="flex justify-between absolute bottom-4 mt-6 w-full gap-4 flex-wrap">
          {/* Toggle Switch on the Left */}
          <label className="inline-flex items-center cursor-pointer w-full sm:w-auto">
            <input
              type="checkbox"
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-[#ff765b] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-[#ff765b] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff765b]">
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">{t('enableFollowUp')}</span>
          </label>

          {/* Done Button on the Right */}
          <button className="w-full sm:w-[183px] h-[52px] bg-[#b5b5b5] rounded-[100px] shadow hover:bg-[#ff765b] flex-shrink-0">
            <div className="text-center text-[#fdfdfd] text-base font-bold uppercase tracking-wide">
              {t("done")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpTab;
