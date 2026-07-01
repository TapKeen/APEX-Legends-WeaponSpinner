// 武器数据配置 - APEX Legends Season 29

export interface Weapon {
  id: string;
  nameEN: string;
  nameCN: string;
  category: 'assault' | 'sniper' | 'marksman' | 'lmg' | 'smg' | 'pistol' | 'shotgun';
  ammoType: 'light' | 'heavy' | 'energy' | 'sniper' | 'shotgun' | 'bow' | 'care_package';
  isCarePackage: boolean;
}

// 弹药颜色映射
export const AMMO_COLORS = {
  light: '#FFA500',       // 轻型弹 - 黄色
  heavy: '#006400',       // 重型弹 - 墨绿色
  energy: '#00CED1',      // 能量弹 - 浅绿色
  bow: '#7FFF7F',         // 弓箭 - 比能量弹更浅的绿色
  sniper: '#1E90FF',      // 狙击弹 - 蓝色
  shotgun: '#DC143C',     // 霰弹 - 红色
  care_package: '#DC143C' // 空投武器 - 红色
};

// 主武器类别
export const PRIMARY_CATEGORIES = ['assault', 'sniper', 'marksman', 'lmg'];

// 副武器类别
export const SECONDARY_CATEGORIES = ['smg', 'pistol', 'shotgun'];

// 空投武器ID列表 (Season 29)
export const CARE_PACKAGE_WEAPONS = ['kraber', 'g7_scout', 'l_star'];

// 所有武器数据
export const ALL_WEAPONS: Weapon[] = [
  // 突击步枪
  {
    id: 'havoc',
    nameEN: 'HAVOC Rifle',
    nameCN: '哈沃克步枪',
    category: 'assault',
    ammoType: 'energy',
    isCarePackage: false
  },
  {
    id: 'flatline',
    nameEN: 'VK-47 Flatline',
    nameCN: '平行步枪',
    category: 'assault',
    ammoType: 'heavy',
    isCarePackage: false
  },
  {
    id: 'hemlok',
    nameEN: 'Hemlok Burst AR',
    nameCN: '赫姆洛克突击步枪',
    category: 'assault',
    ammoType: 'heavy',
    isCarePackage: false
  },
  {
    id: 'r301',
    nameEN: 'R-301 Carbine',
    nameCN: 'R-301卡宾枪',
    category: 'assault',
    ammoType: 'light',
    isCarePackage: false
  },
  {
    id: 'nemesis',
    nameEN: 'Nemesis Burst AR',
    nameCN: '复仇女神',
    category: 'assault',
    ammoType: 'energy',
    isCarePackage: false
  },

  // 狙击步枪
  {
    id: 'kraber',
    nameEN: 'Kraber .50-Cal Sniper',
    nameCN: '克雷贝尔狙击枪',
    category: 'sniper',
    ammoType: 'care_package',
    isCarePackage: true
  },
  {
    id: 'charge_rifle',
    nameEN: 'Charge Rifle',
    nameCN: '充能步枪',
    category: 'sniper',
    ammoType: 'sniper',
    isCarePackage: false
  },
  {
    id: 'longbow',
    nameEN: 'Longbow DMR',
    nameCN: '长弓',
    category: 'sniper',
    ammoType: 'sniper',
    isCarePackage: false
  },
  {
    id: 'sentinel',
    nameEN: 'Sentinel',
    nameCN: '哨兵狙击步枪',
    category: 'sniper',
    ammoType: 'sniper',
    isCarePackage: false
  },

  // 神射手武器
  {
    id: 'g7_scout',
    nameEN: 'G7 Scout',
    nameCN: 'G7侦察枪',
    category: 'marksman',
    ammoType: 'care_package',
    isCarePackage: true
  },
  {
    id: 'triple_take',
    nameEN: 'Triple Take',
    nameCN: '三重式狙击枪',
    category: 'marksman',
    ammoType: 'energy',
    isCarePackage: false
  },
  {
    id: '30_30_repeater',
    nameEN: '30-30 Repeater',
    nameCN: '30-30',
    category: 'marksman',
    ammoType: 'heavy',
    isCarePackage: false
  },
  {
    id: 'bocek',
    nameEN: 'Bocek Compound Bow',
    nameCN: '波塞克',
    category: 'marksman',
    ammoType: 'bow',
    isCarePackage: false
  },

  // 轻型机关枪
  {
    id: 'devotion',
    nameEN: 'Devotion LMG',
    nameCN: '专注轻机枪',
    category: 'lmg',
    ammoType: 'energy',
    isCarePackage: false
  },
  {
    id: 'l_star',
    nameEN: 'L-STAR EMG',
    nameCN: 'L-STAR',
    category: 'lmg',
    ammoType: 'care_package',
    isCarePackage: true
  },
  {
    id: 'spitfire',
    nameEN: 'M600 Spitfire',
    nameCN: '喷火轻机枪',
    category: 'lmg',
    ammoType: 'light',
    isCarePackage: false
  },
  {
    id: 'rampage',
    nameEN: 'Rampage LMG',
    nameCN: '暴走轻机枪',
    category: 'lmg',
    ammoType: 'heavy',
    isCarePackage: false
  },

  // 冲锋枪
  {
    id: 'alternator',
    nameEN: 'Alternator SMG',
    nameCN: '转换者冲锋枪',
    category: 'smg',
    ammoType: 'light',
    isCarePackage: false
  },
  {
    id: 'prowler',
    nameEN: 'Prowler Burst PDW',
    nameCN: '猎兽冲锋枪',
    category: 'smg',
    ammoType: 'heavy',
    isCarePackage: false
  },
  {
    id: 'r99',
    nameEN: 'R-99 SMG',
    nameCN: 'R-99冲锋枪',
    category: 'smg',
    ammoType: 'light',
    isCarePackage: false
  },
  {
    id: 'volt',
    nameEN: 'Volt SMG',
    nameCN: '电能冲锋枪',
    category: 'smg',
    ammoType: 'energy',
    isCarePackage: false
  },
  {
    id: 'car',
    nameEN: 'C.A.R. SMG',
    nameCN: 'C.A.R.',
    category: 'smg',
    ammoType: 'heavy', // C.A.R.可以使用重型弹或轻型弹，这里默认重型弹
    isCarePackage: false
  },

  // 手枪
  {
    id: 're45',
    nameEN: 'RE-45 Auto',
    nameCN: 'RE-45',
    category: 'pistol',
    ammoType: 'energy',
    isCarePackage: false
  },
  {
    id: 'p2020',
    nameEN: 'P2020',
    nameCN: 'P2020手枪',
    category: 'pistol',
    ammoType: 'light',
    isCarePackage: false
  },
  {
    id: 'wingman',
    nameEN: 'Wingman',
    nameCN: '辅助手枪',
    category: 'pistol',
    ammoType: 'sniper',
    isCarePackage: false
  },

  // 霰弹枪
  {
    id: 'eva8',
    nameEN: 'EVA-8 Auto',
    nameCN: 'EVA-8',
    category: 'shotgun',
    ammoType: 'shotgun',
    isCarePackage: false
  },
  {
    id: 'mastiff',
    nameEN: 'Mastiff',
    nameCN: '獒犬霰弹枪',
    category: 'shotgun',
    ammoType: 'shotgun',
    isCarePackage: false
  },
  {
    id: 'mozambique',
    nameEN: 'Mozambique Shotgun',
    nameCN: '莫桑比克',
    category: 'shotgun',
    ammoType: 'shotgun',
    isCarePackage: false
  },
  {
    id: 'peacekeeper',
    nameEN: 'Peacekeeper',
    nameCN: '和平捍卫者霰弹枪',
    category: 'shotgun',
    ammoType: 'shotgun',
    isCarePackage: false
  }
];

// 获取武器颜色
export function getWeaponColor(weapon: Weapon): string {
  if (weapon.isCarePackage) {
    return AMMO_COLORS.care_package;
  }
  return AMMO_COLORS[weapon.ammoType];
}

// 随机选择武器
export function selectWeapons(
  primarySecondaryMode: boolean,
  includeCarePackage: boolean
): Weapon[] {
  let availableWeapons = includeCarePackage
    ? ALL_WEAPONS
    : ALL_WEAPONS.filter(w => !w.isCarePackage);

  if (primarySecondaryMode) {
    // 主副搭配模式
    const primaryPool = availableWeapons.filter(w =>
      PRIMARY_CATEGORIES.includes(w.category)
    );
    const secondaryPool = availableWeapons.filter(w =>
      SECONDARY_CATEGORIES.includes(w.category)
    );

    const primary = primaryPool[Math.floor(Math.random() * primaryPool.length)];
    const secondary = secondaryPool[Math.floor(Math.random() * secondaryPool.length)];
    return [primary, secondary];
  } else {
    // 随机两把武器模式
    const shuffled = [...availableWeapons].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }
}