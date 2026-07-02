import React, { useState, useCallback } from 'react';
import VoidPortal from '../components/VoidPortal';
import ControlPanel from '../components/ControlPanel';

const Home: React.FC = () => {
  const [language, setLanguage] = useState<'cn' | 'en'>('cn');
  const [primarySecondaryMode, setPrimarySecondaryMode] = useState(false);
  const [includeCarePackage, setIncludeCarePackage] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [triggerSpin, setTriggerSpin] = useState(0);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    // 递增触发计数器，VoidPortal 监听此变化启动动画
    setTriggerSpin(prev => prev + 1);
  };

  const handleResult = useCallback(() => {
    setSpinning(false);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 标题 */}
      <div className="mb-4 md:mb-8 text-center">
        <h1
          className="text-2xl md:text-5xl font-bold mb-2 md:mb-6"
          style={{
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Arial Black, sans-serif'
          }}
        >
          {language === 'cn' ? 'APEX Legends 武器抽取转盘' : 'APEX Legends Weapon Spinner'}
        </h1>
        <p className="text-gray-400 text-sm md:text-lg mb-1 md:mb-2">
          {language === 'cn' ? '为你的下一局游戏选择武器搭配' : 'Choose your weapon loadout for the next game'}
        </p>
        <p className="text-gray-500 text-xs md:text-sm italic">
          {language === 'cn' ? '*数据更新至第29赛季' : '*Data updated to Season 29'}
        </p>
      </div>

      {/* 控制面板 */}
      <div className="mb-4 md:mb-8">
        <ControlPanel
          language={language}
          onLanguageChange={setLanguage}
          primarySecondaryMode={primarySecondaryMode}
          onPrimarySecondaryChange={setPrimarySecondaryMode}
          includeCarePackage={includeCarePackage}
          onCarePackageChange={setIncludeCarePackage}
        />
      </div>

      {/* 虚空传送门 */}
      <VoidPortal
        triggerSpin={triggerSpin}
        primarySecondaryMode={primarySecondaryMode}
        includeCarePackage={includeCarePackage}
        language={language}
        onResult={handleResult}
      />

      {/* 抽取按钮 */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="mt-4 px-6 py-3 md:px-12 md:py-4 rounded-xl font-bold text-base md:text-2xl transition-all duration-300"
        style={{
          background: spinning
            ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
            : 'linear-gradient(135deg, #e94560 0%, #ff6b35 100%)',
          color: 'white',
          border: '2px solid #FFD700',
          boxShadow: spinning
            ? 'none'
            : '0 4px 10px rgba(233, 69, 96, 0.5), 0 0 15px rgba(255, 215, 0, 0.3)',
          cursor: spinning ? 'not-allowed' : 'pointer',
          opacity: spinning ? 0.6 : 1
        }}
      >
        {spinning
          ? (language === 'cn' ? '抽取中...' : 'Spinning...')
          : (language === 'cn' ? '🎲 开始抽取' : '🎲 Spin Now')}
      </button>

      {/* 底部信息 - 固定在右下角 */}
      <div className="fixed bottom-4 right-4 text-right pointer-events-none">
        <p className="text-gray-600 text-[10px] md:text-xs">MADE BY CYYLin_805</p>
        <p className="text-gray-600 text-[10px] md:text-xs">2026/7/2  v1.2.0</p>
      </div>
    </div>
  );
};

export default Home;
