import React, { useState } from 'react';

const PrivacyTab = ({ t }) => {
  const [openTab] = useState('Privacy');

  return (
    <div>
      {openTab === 'Privacy' && (
        <div>
          <h1 className="text-[#007f80] text-3xl bold text-base font-normal font-['Proxima Nova'] leading-tight">
            {t("privacyPolicy")}
          </h1>
          <p className="text-[#007f80] text-sm text-base text-justify font-normal font-['Proxima Nova'] leading-tight">
            {t("privacyPolicyMessage")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PrivacyTab;
