import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Weapon,
  getWeaponColor,
  AMMO_COLORS,
  selectWeapons,
} from '../utils/weaponsData';

interface VoidPortalProps {
  triggerSpin: number;
  primarySecondaryMode: boolean;
  includeCarePackage: boolean;
  language: 'cn' | 'en';
  onResult: (weapons: Weapon[]) => void;
}

interface Particle {
  id: number;
  startX: number;
  startY: number;
  color: string;
  delay: number;
  size: number;
}

const AMMO_COLOR_LIST = [
  AMMO_COLORS.light,
  AMMO_COLORS.heavy,
  AMMO_COLORS.energy,
  AMMO_COLORS.bow,
  AMMO_COLORS.sniper,
  AMMO_COLORS.shotgun,
  AMMO_COLORS.care_package,
];

type Phase = 'idle' | 'charging' | 'reveal' | 'slowing';

const VoidPortal: React.FC<VoidPortalProps> = ({
  triggerSpin,
  primarySecondaryMode,
  includeCarePackage,
  language,
  onResult,
}) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [rotationDuration, setRotationDuration] = useState(8);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [revealedWeapons, setRevealedWeapons] = useState<Weapon[]>([]);
  const particleIdRef = useRef(0);
  const speedIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const particleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slowIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  // 记录上次处理的 triggerSpin 值，防止 StrictMode 重复执行
  const lastTriggerRef = useRef(0);

  const clearAllTimers = useCallback(() => {
    if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
      speedIntervalRef.current = null;
    }
    if (particleIntervalRef.current) {
      clearInterval(particleIntervalRef.current);
      particleIntervalRef.current = null;
    }
    if (slowIntervalRef.current) {
      clearInterval(slowIntervalRef.current);
      slowIntervalRef.current = null;
    }
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  // 生成单个粒子
  const generateParticle = useCallback((): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 220 + Math.random() * 100;
    const colorIndex = Math.floor(Math.random() * AMMO_COLOR_LIST.length);
    return {
      id: particleIdRef.current++,
      startX: Math.cos(angle) * distance,
      startY: Math.sin(angle) * distance,
      color: AMMO_COLOR_LIST[colorIndex],
      delay: Math.random() * 0.2,
      size: 4 + Math.random() * 7,
    };
  }, []);

  // 触发抽取动画
  useEffect(() => {
    if (triggerSpin === 0) return;
    // 用 lastTriggerRef 防止 StrictMode 重复执行（同一次 triggerSpin 只处理一次）
    if (triggerSpin === lastTriggerRef.current) return;
    lastTriggerRef.current = triggerSpin;

    clearAllTimers();
    setRevealedWeapons([]);
    setParticles([]);
    setPhase('charging');
    setRotationDuration(8);

    // 速度递增：从 8s 递减到 0.25s
    const speedSteps = [6, 4, 2.5, 1.5, 0.9, 0.55, 0.35, 0.25];
    let stepIndex = 0;

    speedIntervalRef.current = setInterval(() => {
      stepIndex++;
      if (stepIndex < speedSteps.length) {
        setRotationDuration(speedSteps[stepIndex]);
      } else {
        // 达到最大速度，进入揭晓阶段
        if (speedIntervalRef.current) {
          clearInterval(speedIntervalRef.current);
          speedIntervalRef.current = null;
        }
        if (particleIntervalRef.current) {
          clearInterval(particleIntervalRef.current);
          particleIntervalRef.current = null;
        }

        // 选择武器并揭晓
        const weapons = selectWeapons(primarySecondaryMode, includeCarePackage);
        setRevealedWeapons(weapons);
        setPhase('reveal');

        // 通知父组件
        const t1 = setTimeout(() => {
          onResult(weapons);
        }, 1200);
        timeoutsRef.current.push(t1);

        // 开始缓慢减速：从 0.25s 逐步回到 8s
        const slowSteps = [0.3, 0.5, 0.8, 1.2, 1.8, 2.5, 3.5, 5, 6.5, 8];
        let slowIndex = 0;
        slowIntervalRef.current = setInterval(() => {
          slowIndex++;
          if (slowIndex < slowSteps.length) {
            setRotationDuration(slowSteps[slowIndex]);
          } else {
            if (slowIntervalRef.current) {
              clearInterval(slowIntervalRef.current);
              slowIntervalRef.current = null;
            }
            setPhase('idle');
          }
        }, 300);
      }
    }, 350);

    // 持续生成粒子
    particleIntervalRef.current = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        for (let i = 0; i < 3; i++) {
          newParticles.push(generateParticle());
        }
        if (newParticles.length > 50) {
          newParticles.splice(0, newParticles.length - 50);
        }
        return newParticles;
      });
    }, 100);

    return () => {
      // StrictMode 清理时不重置 executingRef，由减速完成时重置
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSpin]);

  // 组件卸载时清理
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const getWeaponName = (weapon: Weapon) =>
    language === 'cn' ? weapon.nameCN : weapon.nameEN;

  const getCategoryLabel = (category: Weapon['category']) => {
    const labels = {
      cn: {
        assault: '突击步枪', sniper: '狙击步枪', marksman: '神射手武器',
        lmg: '轻型机关枪', smg: '冲锋枪', pistol: '手枪', shotgun: '霰弹枪',
      },
      en: {
        assault: 'Assault Rifle', sniper: 'Sniper Rifle', marksman: 'Marksman',
        lmg: 'Light Machine Gun', smg: 'SMG', pistol: 'Pistol', shotgun: 'Shotgun',
      },
    };
    return labels[language][category];
  };

  const getWeaponLabel = (index: number) => {
    if (primarySecondaryMode) {
      return index === 0
        ? (language === 'cn' ? '主武器' : 'Primary')
        : (language === 'cn' ? '副武器' : 'Secondary');
    }
    return language === 'cn' ? `武器${index + 1}` : `Weapon ${index + 1}`;
  };

  const isActive = phase === 'charging' || phase === 'reveal' || phase === 'slowing';

  return (
    <div className="flex flex-col items-center">
      {/* 传送门 - 单个圆形 */}
      <div className="relative" style={{ width: 320, height: 320 }}>
        {/* 外圈光晕 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -30,
            background: isActive
              ? `radial-gradient(circle, rgba(233, 69, 96, 0.25) 0%, rgba(124, 58, 237, 0.12) 40%, transparent 70%)`
              : `radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)`,
            filter: 'blur(20px)',
            transition: 'background 0.5s ease',
          }}
        />

        {/* 传送门主体 - 单个旋转圆形 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 0deg,
              rgba(124, 58, 237, 0.85),
              rgba(59, 130, 246, 0.4),
              rgba(233, 69, 96, 0.75),
              rgba(255, 215, 0, 0.3),
              rgba(168, 85, 247, 0.6),
              rgba(124, 58, 237, 0.85)
            )`,
            animation: `portal-spin ${rotationDuration}s linear infinite`,
            transition: 'animation-duration 0.3s ease',
          }}
        >
          {/* 内部虚空 - 遮罩出中心圆形 */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              inset: 15,
              background: `radial-gradient(circle at 50% 50%,
                rgba(10, 10, 25, 0.98) 0%,
                rgba(30, 27, 75, 0.92) 25%,
                rgba(55, 48, 163, 0.5) 55%,
                rgba(99, 102, 241, 0.2) 85%,
                transparent 100%
              )`,
              boxShadow: isActive
                ? 'inset 0 0 50px rgba(233, 69, 96, 0.35), inset 0 0 25px rgba(124, 58, 237, 0.5)'
                : 'inset 0 0 50px rgba(124, 58, 237, 0.35), inset 0 0 25px rgba(59, 130, 246, 0.25)',
              transition: 'box-shadow 0.5s ease',
            }}
          >
            {/* 漩涡纹理 */}
            <div
              className="absolute rounded-full"
              style={{
                inset: 10,
                background: `conic-gradient(
                  from 0deg,
                  transparent 0%,
                  rgba(124, 58, 237, 0.12) 20%,
                  transparent 40%,
                  rgba(59, 130, 246, 0.12) 60%,
                  transparent 80%,
                  rgba(168, 85, 247, 0.12) 100%
                )`,
                animation: `portal-spin ${rotationDuration * 0.7}s linear infinite`,
              }}
            />

            {/* 中心光点 */}
            <div
              className="rounded-full"
              style={{
                width: phase === 'charging' ? 50 : phase === 'reveal' ? 40 : 25,
                height: phase === 'charging' ? 50 : phase === 'reveal' ? 40 : 25,
                background: phase === 'charging'
                  ? 'radial-gradient(circle, rgba(255, 215, 0, 0.7) 0%, rgba(233, 69, 96, 0.3) 50%, transparent 100%)'
                  : phase === 'reveal'
                    ? 'radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(233, 69, 96, 0.2) 50%, transparent 100%)'
                    : 'radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, transparent 70%)',
                filter: 'blur(6px)',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* 粒子系统 */}
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              background: p.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 3}px ${p.color}`,
              animation: `particle-converge 0.7s ${p.delay}s ease-in forwards`,
              // @ts-ignore
              '--start-x': `${p.startX}px`,
              '--start-y': `${p.startY}px`,
            } as React.CSSProperties}
          />
        ))}

        {/* 边框 */
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '2px solid rgba(124, 58, 237, 0.35)',
            boxShadow: '0 0 25px rgba(124, 58, 237, 0.25), inset 0 0 25px rgba(0, 0, 0, 0.4)',
          }}
        />}
      </div>

      {/* 武器卡片区域 - 不预留空间 */}
      <div
        className="flex gap-5 justify-center"
        style={{
          marginTop: revealedWeapons.length > 0 ? 24 : 0,
          maxHeight: revealedWeapons.length > 0 ? 300 : 0,
          opacity: revealedWeapons.length > 0 ? 1 : 0,
          overflow: 'visible',
          transition: 'margin-top 0.4s ease, max-height 0.4s ease, opacity 0.4s ease',
        }}
      >
        {revealedWeapons.map((weapon, index) => {
          const color = getWeaponColor(weapon);
          const isCarePackage = weapon.isCarePackage;

          return (
            <div
              key={`${weapon.id}-${index}`}
              style={{
                animation: `card-flyout 0.8s ${index * 0.25}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                position: 'relative',
                opacity: 0,
              }}
            >
              {/* 流光拖尾 */}
              <div
                style={{
                  position: 'absolute',
                  top: -150,
                  left: '50%',
                  width: 3,
                  height: 150,
                  transform: 'translateX(-50%)',
                  background: `linear-gradient(to bottom, transparent 0%, ${color} 80%, ${color} 100%)`,
                  opacity: 0,
                  filter: 'blur(2px)',
                  animation: `trail-fade 0.8s ${index * 0.25}s ease-out forwards`,
                  borderRadius: '4px',
                }}
              />
              {/* 武器卡片 */}
              <div
                className="relative p-4 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  border: `3px solid ${color}`,
                  boxShadow: isCarePackage
                    ? `0 0 20px ${color}, 0 0 35px rgba(255, 215, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.5)`
                    : `0 0 15px ${color}80, 0 6px 12px rgba(0, 0, 0, 0.5)`,
                  minWidth: 210,
                }}
              >
                {isCarePackage && (
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      border: '3px solid #FFD700',
                      boxShadow: '0 0 15px rgba(255, 215, 0, 0.5) inset',
                    }}
                  />
                )}
                <div className="mb-1.5">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: color, color: 'white' }}
                  >
                    {getWeaponLabel(index)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-0.5">
                  {getWeaponName(weapon)}
                </h3>
                <span className="text-xs text-gray-400">
                  {getCategoryLabel(weapon.category)}
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {isCarePackage ? (
                    <>
                      <span style={{ color: '#FFD700', fontSize: '12px' }}>⭐</span>
                      <span className="text-xs font-bold" style={{ color: '#FFD700' }}>
                        {language === 'cn' ? '空投武器' : 'Care Package'}
                      </span>
                    </>
                  ) : (
                    <>
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: AMMO_COLORS[weapon.ammoType],
                          boxShadow: `0 0 6px ${AMMO_COLORS[weapon.ammoType]}`,
                        }}
                      />
                      <span className="text-xs text-gray-400">
                        {language === 'cn'
                          ? { light: '轻型弹', heavy: '重型弹', energy: '能量弹', bow: '弓箭', sniper: '狙击弹', shotgun: '霰弹' }[weapon.ammoType]
                          : { light: 'Light', heavy: 'Heavy', energy: 'Energy', bow: 'Bow', sniper: 'Sniper', shotgun: 'Shotgun' }[weapon.ammoType]
                        }
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS 动画定义 */}
      <style>{`
        @keyframes portal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes particle-converge {
          0% {
            transform: translate(var(--start-x), var(--start-y)) scale(1);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes card-flyout {
          0% {
            transform: translateY(-120px) scale(0.4);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes trail-fade {
          0% { opacity: 0; }
          30% { opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default VoidPortal;
