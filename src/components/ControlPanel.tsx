import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-white font-medium text-sm">{label}</span>
      <div
        className="relative w-16 h-8 bg-gray-600 rounded-full cursor-pointer transition-all duration-300"
        style={{
          background: checked ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' : '#4a5568',
          boxShadow: checked ? '0 0 15px rgba(74, 222, 128, 0.5)' : 'none'
        }}
        onClick={() => onChange(!checked)}
      >
        <div
          className="absolute top-1 w-6 h-6 rounded-full transition-all duration-300"
          style={{
            left: checked ? 'calc(100% - 28px)' : '4px',
            background: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        />
      </div>
    </div>
  );
};

interface LanguageSwitchProps {
  language: 'cn' | 'en';
  onChange: (lang: 'cn' | 'en') => void;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ language, onChange }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
          language === 'cn'
            ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        style={{
          boxShadow: language === 'cn' ? '0 4px 15px rgba(233, 69, 96, 0.4)' : 'none'
        }}
        onClick={() => onChange('cn')}
      >
        CN
      </button>
      <button
        className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
          language === 'en'
            ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        style={{
          boxShadow: language === 'en' ? '0 4px 15px rgba(233, 69, 96, 0.4)' : 'none'
        }}
        onClick={() => onChange('en')}
      >
        EN
      </button>
    </div>
  );
};

interface ControlPanelProps {
  language: 'cn' | 'en';
  onLanguageChange: (lang: 'cn' | 'en') => void;
  primarySecondaryMode: boolean;
  onPrimarySecondaryChange: (checked: boolean) => void;
  includeCarePackage: boolean;
  onCarePackageChange: (checked: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  language,
  onLanguageChange,
  primarySecondaryMode,
  onPrimarySecondaryChange,
  includeCarePackage,
  onCarePackageChange
}) => {
  const labels = {
    cn: {
      primarySecondary: '主副武器搭配',
      carePackage: '空投武器'
    },
    en: {
      primarySecondary: 'Primary/Secondary Mode',
      carePackage: 'Care Package Weapons'
    }
  };

  const currentLabels = labels[language];

  return (
    <div
      className="p-6 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        border: '2px solid rgba(233, 69, 96, 0.3)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div className="flex flex-col gap-4">
        {/* 语言切换 */}
        <div className="flex items-center gap-4">
          <span className="text-white font-medium text-sm">
            {language === 'cn' ? '语言' : 'Language'}
          </span>
          <LanguageSwitch language={language} onChange={onLanguageChange} />
        </div>

        {/* 主副武器搭配开关 */}
        <ToggleSwitch
          label={currentLabels.primarySecondary}
          checked={primarySecondaryMode}
          onChange={onPrimarySecondaryChange}
        />

        {/* 空投武器开关 */}
        <ToggleSwitch
          label={currentLabels.carePackage}
          checked={includeCarePackage}
          onChange={onCarePackageChange}
        />
      </div>
    </div>
  );
};

export default ControlPanel;