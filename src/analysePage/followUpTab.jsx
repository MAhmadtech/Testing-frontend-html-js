import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FollowUpTab = ({ openTab, onDone, t }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div style={{ display: openTab === 'follow' ? 'block' : 'none' }}>
      <div className="w-[531px] h-[399px] relative">
        {/* Enable Follow-up Questions Header */}
        <div className="absolute top-[1px] left-0 w-[377px] text-[#005666] text-2xl font-semibold leading-[30px] font-['Proxima Nova']">
          {t("enableFollowUp")}
        </div>

        {/* Toggle Switch for Renewal */}
        <label className="inline-flex items-center cursor-pointer ml-96">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="relative w-11 h-6 bg-[#ff765b] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff765b] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#ff765b] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff765b]"></div>
          <span className="ml-3 text-sm font-medium text-gray-900">{t("renewTransaction")}</span>
        </label>

        {/* Done Button */}
        <div className="absolute left-[153px] top-[347px] w-[378px] h-[52px] pl-[195px] flex justify-end items-center">
          <button
            className="bg-[#fff] text-gray-800 border-2 border-[#ff765b] px-12 py-2 rounded-full hover:bg-[#ff765b] hover:text-white focus:outline-none"
            onClick={onDone}
          >
            {t("done")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpTab;
