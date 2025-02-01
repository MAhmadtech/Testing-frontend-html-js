import React, { useState } from 'react';

const PrivacyTab = ({ t }) => {
  const [openTab] = useState('Privacy');

  return (
    <div>
      {openTab === 'Privacy' && (
        <div className='h-[430px]'>
          <h1 className="text-[#007f80] text-3xl bold  font-normal font-['Proxima Nova'] leading-tight">
            {t("privacyPolicy")}
          </h1>
          <p className="text-[#007f80] text-sm text-justify font-normal font-['Proxima Nova'] leading-tight">
            {t("privacyPolicyMessage")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PrivacyTab;
