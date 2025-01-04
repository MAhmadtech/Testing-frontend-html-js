import React, { useState } from 'react';

const TermsTab = ({ t }) => {
  const [openTab] = useState('Terms');

  return (
    <div>
      {openTab === 'Terms' && (
        <div>
          <h1 className="text-[#007f80] text-3xl bold text-base font-normal font-['Proxima Nova'] leading-tight">
            {t("termsOfUse")}
          </h1>
          <p className="text-[#007f80] text-sm text-base text-justify font-normal font-['Proxima Nova'] leading-tight">
            {t("termsOfUseMessage")}
          </p>
        </div>
      )}
    </div>
  );
};

export default TermsTab;
