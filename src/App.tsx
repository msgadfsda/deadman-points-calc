import React, { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'dmm-calculator-state';

interface Skill {
  name: string;
  icon: string;
  minLevel?: number;
}

interface Unlock {
  name: string;
  cost: number;
}

interface Boss {
  name: string;
  points: number;
}

const SKILLS: Skill[] = [
  { name: 'Attack', icon: 'https://oldschool.runescape.wiki/images/Attack_icon.png' },
  { name: 'Hitpoints', icon: 'https://oldschool.runescape.wiki/images/Hitpoints_icon.png', minLevel: 10 },
  { name: 'Mining', icon: 'https://oldschool.runescape.wiki/images/Mining_icon.png' },
  { name: 'Strength', icon: 'https://oldschool.runescape.wiki/images/Strength_icon.png' },
  { name: 'Agility', icon: 'https://oldschool.runescape.wiki/images/Agility_icon.png' },
  { name: 'Smithing', icon: 'https://oldschool.runescape.wiki/images/Smithing_icon.png' },
  { name: 'Defence', icon: 'https://oldschool.runescape.wiki/images/Defence_icon.png' },
  { name: 'Herblore', icon: 'https://oldschool.runescape.wiki/images/Herblore_icon.png', minLevel: 3 },
  { name: 'Fishing', icon: 'https://oldschool.runescape.wiki/images/Fishing_icon.png' },
  { name: 'Ranged', icon: 'https://oldschool.runescape.wiki/images/Ranged_icon.png' },
  { name: 'Thieving', icon: 'https://oldschool.runescape.wiki/images/Thieving_icon.png' },
  { name: 'Cooking', icon: 'https://oldschool.runescape.wiki/images/Cooking_icon.png' },
  { name: 'Prayer', icon: 'https://oldschool.runescape.wiki/images/Prayer_icon.png' },
  { name: 'Crafting', icon: 'https://oldschool.runescape.wiki/images/Crafting_icon.png' },
  { name: 'Firemaking', icon: 'https://oldschool.runescape.wiki/images/Firemaking_icon.png' },
  { name: 'Magic', icon: 'https://oldschool.runescape.wiki/images/Magic_icon.png' },
  { name: 'Fletching', icon: 'https://oldschool.runescape.wiki/images/Fletching_icon.png' },
  { name: 'Woodcutting', icon: 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png' },
  { name: 'Runecraft', icon: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png' },
  { name: 'Slayer', icon: 'https://oldschool.runescape.wiki/images/Slayer_icon.png' },
  { name: 'Farming', icon: 'https://oldschool.runescape.wiki/images/Farming_icon.png' },
  { name: 'Construction', icon: 'https://oldschool.runescape.wiki/images/Construction_icon.png' },
  { name: 'Hunter', icon: 'https://oldschool.runescape.wiki/images/Hunter_icon.png' },
];

const QUESTS: Unlock[] = [
  { name: 'Camelot', cost: 1000 },
  { name: 'Dragonkin', cost: 5000 },
  { name: 'Elf', cost: 500 },
  { name: 'Fremennik', cost: 250 },
  { name: 'Gnome', cost: 5000 },
  { name: 'Kharidian', cost: 1500 },
  { name: 'Mahjarrat 1', cost: 1500 },
  { name: 'Mahjarrat 2', cost: 5000 },
  { name: 'Myreque', cost: 1000 },
  { name: 'Recipe for Disaster', cost: 1500 },
  { name: 'Ruinous Powers', cost: 5000 },
];

const SIGILS: Unlock[] = [
  { name: 'Agile Fortune', cost: 500 },
  { name: 'Alchemaniac', cost: 100 },
  { name: 'Augmented Thrall', cost: 5000 },
  { name: 'Automation', cost: 250 },
  { name: 'Conclusion', cost: 5000 },
  { name: 'Deception', cost: 150 },
  { name: 'Deft Strikes', cost: 100 },
  { name: 'Devotion', cost: 1500 },
  { name: 'Efficiency', cost: 500 },
  { name: 'Enhanced Harvest', cost: 100 },
  { name: 'Eternal Belief', cost: 2000 },
  { name: 'Faith', cost: 250 },
  { name: 'Food Master', cost: 1000 },
  { name: 'Hoarding', cost: 250 },
  { name: 'Hunter', cost: 500 },
  { name: 'Infernal Chef', cost: 150 },
  { name: 'Litheness', cost: 250 },
  { name: 'Meticulousness', cost: 1500 },
  { name: 'Nature', cost: 500 },
  { name: 'Onslaught', cost: 150 },
  { name: 'Potion Master', cost: 1000 },
  { name: 'Remote Storage', cost: 100 },
  { name: 'Resistance', cost: 100 },
  { name: 'Restoration', cost: 500 },
  { name: 'Revoked Limitation', cost: 1000 },
  { name: 'Slaughter', cost: 500 },
  { name: 'Titanium', cost: 3000 },
  { name: 'Treasure Hunter', cost: 500 },
  { name: 'Well Fed', cost: 1000 },
  { name: 'Woodcraft', cost: 1000 },
];

const ATTUNABLE_SIGILS: Unlock[] = [
  { name: 'Aggression', cost: 10000 },
  { name: 'Arcane Swiftness', cost: 5000 },
  { name: 'Barrows', cost: 500 },
  { name: 'Consistency', cost: 150 },
  { name: 'Finality', cost: 500 },
  { name: 'Formidable Fighter', cost: 500 },
  { name: 'Fortification', cost: 500 },
  { name: 'Gunslinger', cost: 5000 },
  { name: 'Lightbearer', cost: 250 },
  { name: 'Menacing Mage', cost: 500 },
  { name: 'Meticulous Mage', cost: 350 },
  { name: 'Pious Protection', cost: 3000 },
  { name: 'Porcupine', cost: 500 },
  { name: 'Rampage', cost: 10000 },
  { name: 'Rigorous Ranger', cost: 350 },
  { name: 'Ruthless Ranger', cost: 500 },
  { name: 'Specialised Strikes', cost: 100 },
  { name: 'Swashbuckler', cost: 5000 },
  { name: 'The Adroit', cost: 5000 },
  { name: 'The Gods', cost: 500 },
];

const CLUE_TIERS = [
  { name: 'Beginner', points: 5 },
  { name: 'Easy', points: 8 },
  { name: 'Medium', points: 15 },
  { name: 'Hard', points: 20 },
  { name: 'Elite', points: 30 },
  { name: 'Master', points: 55 },
];

const DIARY_TIERS = [
  { name: 'Easy', points: 15 },
  { name: 'Medium', points: 25 },
  { name: 'Hard', points: 40 },
  { name: 'Elite', points: 60 },
];

const COMBAT_ACHIEVEMENT_TIERS = [
  { name: 'Easy', points: 10 },
  { name: 'Medium', points: 15 },
  { name: 'Hard', points: 25 },
  { name: 'Elite', points: 35 },
  { name: 'Master', points: 50 },
  { name: 'Grandmaster', points: 75 },
];

const BOSSES: Boss[] = [
  { name: 'Abyssal Sire', points: 20 },
  { name: 'Alchemical Hydra', points: 10 },
  { name: 'Amoxliatl', points: 5 },
  { name: 'Araxxor', points: 13 },
  { name: 'Artio', points: 10 },
  { name: 'Barrows Brothers', points: 5 },
  { name: 'Bryophyta', points: 15 },
  { name: 'Callisto', points: 10 },
  { name: "Calvar'ion", points: 10 },
  { name: 'Cerberus', points: 25 },
  { name: 'Chambers of Xeric', points: 120 },
  { name: 'Chambers of Xeric: CM', points: 180 },
  { name: 'Chaos Elemental', points: 20 },
  { name: 'Chaos Fanatic', points: 10 },
  { name: 'Colosseum', points: 75 },
  { name: 'Commander Zilyana', points: 20 },
  { name: 'Corrupted Hunllef', points: 25 },
  { name: 'Corporeal Beast', points: 35 },
  { name: 'Crazy Archaeologist', points: 10 },
  { name: 'Crystalline Hunllef', points: 17 },
  { name: 'Dagannoth Prime', points: 15 },
  { name: 'Dagannoth Rex', points: 15 },
  { name: 'Dagannoth Supreme', points: 15 },
  { name: 'Deranged Archaeologist', points: 3 },
  { name: 'Duke Sucellus', points: 15 },
  { name: 'Duke Sucellus (Awakened)', points: 35 },
  { name: 'Fight Caves', points: 50 },
  { name: 'General Graardor', points: 20 },
  { name: 'Giant Mole', points: 12 },
  { name: 'Grotesque Guardians', points: 10 },
  { name: 'Hespori', points: 25 },
  { name: 'Hueycoatl', points: 10 },
  { name: 'Inferno', points: 100 },
  { name: 'Kalphite Queen', points: 20 },
  { name: 'King Black Dragon', points: 5 },
  { name: 'Kraken', points: 15 },
  { name: "Kree'arra", points: 23 },
  { name: "K'ril Tsutsaroth", points: 17 },
  { name: 'Leviathan', points: 15 },
  { name: 'Leviathan (Awakened)', points: 35 },
  { name: 'Mimic', points: 10 },
  { name: 'Moons of Peril', points: 30 },
  { name: 'Nex', points: 5 },
  { name: 'Obor', points: 15 },
  { name: "Phosani's Nightmare", points: 30 },
  { name: 'Phantom Muspah', points: 10 },
  { name: 'Royal Titans', points: 10 },
  { name: 'Sarachnis', points: 10 },
  { name: 'Scorpia', points: 10 },
  { name: 'Scurrius', points: 5 },
  { name: 'Skotizo', points: 25 },
  { name: 'Spindel', points: 10 },
  { name: 'Tempoross', points: 20 },
  { name: 'The Nightmare', points: 18 },
  { name: 'ToB (Entry)', points: 100 },
  { name: 'ToB', points: 120 },
  { name: 'ToB (Hard)', points: 180 },
  { name: 'Thermonuclear Smoke Devil', points: 10 },
  { name: 'ToA (Entry)', points: 100 },
  { name: 'ToA', points: 120 },
  { name: 'ToA (Expert)', points: 150 },
  { name: 'Vardorvis', points: 15 },
  { name: 'Vardorvis (Awakened)', points: 35 },
  { name: 'Venenatis', points: 10 },
  { name: "Vet'ion", points: 10 },
  { name: 'Vorkath', points: 10 },
  { name: 'Wintertodt', points: 20 },
  { name: 'Whisperer', points: 15 },
  { name: 'Whisperer (Awakened)', points: 35 },
  { name: 'Yama', points: 15 },
  { name: 'Zalcano', points: 10 },
  { name: 'Zulrah', points: 20 },
];

type TabType = 'skills' | 'collection' | 'clues' | 'diaries' | 'combat' | 'bosses';

function calculateDMMPoints(level: number): number {
  if (level < 1 || level > 99) return 0;
  let points = 0;
  if (level > 1) points += (level - 1) * 5;
  if (level > 50) points += (level - 50) * 5;
  if (level === 99) points += 300;
  return points;
}

// Clue points: first completion 5x, max 100 per tier
function calculateCluePoints(count: number, pointsPerClue: number): number {
  if (count <= 0) return 0;
  const cappedCount = Math.min(count, 100);
  const firstBonus = pointsPerClue * 4; // first is 5x, so 4 extra
  const regularPoints = cappedCount * pointsPerClue;
  return regularPoints + firstBonus;
}

// Boss points: first kill 5x, max 100 kills
function calculateBossPoints(kills: number, pointsPerKill: number): number {
  if (kills <= 0) return 0;
  const cappedKills = Math.min(kills, 100);
  const firstBonus = pointsPerKill * 4; // first is 5x, so 4 extra
  const regularPoints = cappedKills * pointsPerKill;
  return regularPoints + firstBonus;
}

interface UnlockSectionProps {
  title: string;
  unlocks: Unlock[];
  selected: Set<string>;
  onToggle: (name: string) => void;
  onReset: () => void;
}

function UnlockSection({ title, unlocks, selected, onToggle, onReset }: UnlockSectionProps) {
  const totalCost = unlocks.filter(u => selected.has(u.name)).reduce((sum, u) => sum + u.cost, 0);
  return (
    <div className="unlock-section">
      <h3>
        {title} <span className="section-cost">(-{totalCost.toLocaleString()})</span>
        <button className="section-reset-btn" onClick={onReset}>Reset</button>
      </h3>
      <div className="unlock-grid">
        {unlocks.map(unlock => (
          <label key={unlock.name} className={`unlock-item ${selected.has(unlock.name) ? 'selected' : ''}`}>
            <input type="checkbox" checked={selected.has(unlock.name)} onChange={() => onToggle(unlock.name)} />
            <span className="unlock-name">{unlock.name}</span>
            <span className="unlock-cost">{unlock.cost.toLocaleString()}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function getMinLevel(skillName: string): number {
  const skill = SKILLS.find(s => s.name === skillName);
  return skill?.minLevel || 1;
}

function getDefaultLevels(): Record<string, number> {
  return Object.fromEntries(SKILLS.map(skill => [skill.name, skill.minLevel || 1]));
}

function getDefaultClues(): Record<string, number> {
  return Object.fromEntries(CLUE_TIERS.map(t => [t.name, 0]));
}

function getDefaultDiaries(): Record<string, number> {
  return Object.fromEntries(DIARY_TIERS.map(t => [t.name, 0]));
}

function getDefaultCombatAchievements(): Record<string, number> {
  return Object.fromEntries(COMBAT_ACHIEVEMENT_TIERS.map(t => [t.name, 0]));
}

function getDefaultBossKills(): Record<string, number> {
  return Object.fromEntries(BOSSES.map(b => [b.name, 0]));
}

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        levels: parsed.levels || getDefaultLevels(),
        quests: new Set<string>(parsed.quests || []),
        sigils: new Set<string>(parsed.sigils || []),
        attunable: new Set<string>(parsed.attunable || []),
        breachPoints: parsed.breachPoints || 0,
        collectionLog: parsed.collectionLog || 0,
        clues: parsed.clues || getDefaultClues(),
        diaries: parsed.diaries || getDefaultDiaries(),
        combatAchievements: parsed.combatAchievements || getDefaultCombatAchievements(),
        bossKills: parsed.bossKills || getDefaultBossKills(),
      };
    }
  } catch (e) {
    console.error('Failed to load saved state:', e);
  }
  return {
    levels: getDefaultLevels(),
    quests: new Set<string>(),
    sigils: new Set<string>(),
    attunable: new Set<string>(),
    breachPoints: 0,
    collectionLog: 0,
    clues: getDefaultClues(),
    diaries: getDefaultDiaries(),
    combatAchievements: getDefaultCombatAchievements(),
    bossKills: getDefaultBossKills(),
  };
}

function App() {
  const savedState = loadSavedState();
  const [levels, setLevels] = useState<Record<string, number>>(savedState.levels);
  const [selectedQuests, setSelectedQuests] = useState<Set<string>>(savedState.quests);
  const [selectedSigils, setSelectedSigils] = useState<Set<string>>(savedState.sigils);
  const [selectedAttunable, setSelectedAttunable] = useState<Set<string>>(savedState.attunable);
  const [breachPoints, setBreachPoints] = useState<number>(savedState.breachPoints);
  const [collectionLog, setCollectionLog] = useState<number>(savedState.collectionLog);
  const [clues, setClues] = useState<Record<string, number>>(savedState.clues);
  const [diaries, setDiaries] = useState<Record<string, number>>(savedState.diaries);
  const [combatAchievements, setCombatAchievements] = useState<Record<string, number>>(savedState.combatAchievements);
  const [bossKills, setBossKills] = useState<Record<string, number>>(savedState.bossKills);
  const [activeTab, setActiveTab] = useState<TabType>('skills');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  useEffect(() => {
    const state = {
      levels,
      quests: Array.from(selectedQuests),
      sigils: Array.from(selectedSigils),
      attunable: Array.from(selectedAttunable),
      breachPoints,
      collectionLog,
      clues,
      diaries,
      combatAchievements,
      bossKills,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [levels, selectedQuests, selectedSigils, selectedAttunable, breachPoints, collectionLog, clues, diaries, combatAchievements, bossKills]);

  const handleExport = () => {
    const exportData = {
      levels, quests: Array.from(selectedQuests), sigils: Array.from(selectedSigils),
      attunable: Array.from(selectedAttunable), breachPoints, collectionLog, clues, diaries, combatAchievements, bossKills,
    };
    navigator.clipboard.writeText(btoa(JSON.stringify(exportData)));
    setShowExportModal(true);
  };

  const handleImport = () => {
    try {
      const decoded = JSON.parse(atob(importText.trim()));
      if (decoded.levels) setLevels(decoded.levels);
      if (decoded.quests) setSelectedQuests(new Set(decoded.quests));
      if (decoded.sigils) setSelectedSigils(new Set(decoded.sigils));
      if (decoded.attunable) setSelectedAttunable(new Set(decoded.attunable));
      if (decoded.breachPoints !== undefined) setBreachPoints(decoded.breachPoints);
      if (decoded.collectionLog !== undefined) setCollectionLog(decoded.collectionLog);
      if (decoded.clues) setClues(decoded.clues);
      if (decoded.diaries) setDiaries(decoded.diaries);
      if (decoded.combatAchievements) setCombatAchievements(decoded.combatAchievements);
      if (decoded.bossKills) setBossKills(decoded.bossKills);
      setShowImportModal(false);
      setImportText('');
      setImportError('');
    } catch (e) {
      setImportError('Invalid import data. Please check and try again.');
    }
  };

  const handleBreachPointsChange = (value: string) => {
    setBreachPoints(Math.min(75000, Math.max(0, parseInt(value) || 0)));
  };

  const handleLevelChange = (skillName: string, value: string) => {
    const minLevel = getMinLevel(skillName);
    setLevels(prev => ({ ...prev, [skillName]: Math.min(99, Math.max(minLevel, parseInt(value) || minLevel)) }));
  };

  const toggleUnlock = (set: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>, name: string) => {
    const newSet = new Set(set);
    if (newSet.has(name)) newSet.delete(name);
    else newSet.add(name);
    setFn(newSet);
  };

  const setAllLevels = (level: number) => {
    setLevels(Object.fromEntries(SKILLS.map(skill => [skill.name, Math.max(level, skill.minLevel || 1)])));
  };

  const resetAll = () => {
    setLevels(getDefaultLevels());
    setSelectedQuests(new Set());
    setSelectedSigils(new Set());
    setSelectedAttunable(new Set());
    setBreachPoints(0);
    setCollectionLog(0);
    setClues(getDefaultClues());
    setDiaries(getDefaultDiaries());
    setCombatAchievements(getDefaultCombatAchievements());
    setBossKills(getDefaultBossKills());
  };

  // Calculate all points
  const skillPoints = Object.values(levels).reduce((sum, level) => sum + calculateDMMPoints(level), 135);
  const collectionLogPoints = collectionLog * 10;
  const cluePoints = CLUE_TIERS.reduce((sum, tier) => sum + calculateCluePoints(clues[tier.name] || 0, tier.points), 0);
  const diaryPoints = DIARY_TIERS.reduce((sum, tier) => sum + (diaries[tier.name] || 0) * tier.points, 0);
  const combatAchievementPoints = COMBAT_ACHIEVEMENT_TIERS.reduce((sum, tier) => sum + (combatAchievements[tier.name] || 0) * tier.points, 0);
  const bossPoints = BOSSES.reduce((sum, boss) => sum + calculateBossPoints(bossKills[boss.name] || 0, boss.points), 0);

  const totalEarnedPoints = skillPoints + breachPoints + collectionLogPoints + cluePoints + diaryPoints + combatAchievementPoints + bossPoints;
  const questCost = QUESTS.filter(q => selectedQuests.has(q.name)).reduce((sum, q) => sum + q.cost, 0);
  const sigilCost = SIGILS.filter(s => selectedSigils.has(s.name)).reduce((sum, s) => sum + s.cost, 0);
  const attunableCost = ATTUNABLE_SIGILS.filter(a => selectedAttunable.has(a.name)).reduce((sum, a) => sum + a.cost, 0);
  const totalUnlockCost = questCost + sigilCost + attunableCost;
  const remainingPoints = totalEarnedPoints - totalUnlockCost;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return (
          <>
            <div className="quick-actions">
              <button className="tab-reset-btn" onClick={() => setAllLevels(1)}>Reset All</button>
              <button onClick={() => setAllLevels(99)}>All 99</button>
            </div>
            <div className="skills-grid">
              {SKILLS.map(skill => (
                <div key={skill.name} className="skill-card">
                  <img src={skill.icon} alt={skill.name} className="skill-icon" />
                  <span className="skill-name">{skill.name}</span>
                  <input type="number" min={skill.minLevel || 1} max="99" value={levels[skill.name]}
                    onChange={(e) => handleLevelChange(skill.name, e.target.value)} className="skill-input" />
                  <span className="skill-points">{calculateDMMPoints(levels[skill.name])} pts</span>
                </div>
              ))}
            </div>
            <div className="tab-total">Total: {skillPoints.toLocaleString()} pts</div>
          </>
        );
      case 'collection':
        return (
          <div className="simple-input-tab">
            <div className="tab-header">
              <h3>Collection Log</h3>
              <button className="tab-reset-btn" onClick={() => setCollectionLog(0)}>Reset</button>
            </div>
            <p>10 points per new entry</p>
            <div className="input-row">
              <label>Entries:</label>
              <input type="number" min="0" value={collectionLog}
                onChange={(e) => setCollectionLog(Math.max(0, parseInt(e.target.value) || 0))} />
            </div>
            <div className="tab-total">Total: {collectionLogPoints.toLocaleString()} pts</div>
          </div>
        );
      case 'clues':
        return (
          <div className="tier-input-tab">
            <div className="tab-header">
              <h3>Clue Scrolls</h3>
              <button className="tab-reset-btn" onClick={() => setClues(getDefaultClues())}>Reset</button>
            </div>
            <p>First completion: 5x points. Max 100 per tier.</p>
            <div className="tier-grid">
              {CLUE_TIERS.map(tier => (
                <div key={tier.name} className="tier-row">
                  <span className="tier-name">{tier.name} ({tier.points} pts)</span>
                  <input type="number" min="0" max="100" value={clues[tier.name] || 0}
                    onChange={(e) => setClues(prev => ({ ...prev, [tier.name]: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }))} />
                  <span className="tier-points">{calculateCluePoints(clues[tier.name] || 0, tier.points).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="tab-total">Total: {cluePoints.toLocaleString()} pts</div>
          </div>
        );
      case 'diaries':
        return (
          <div className="tier-input-tab">
            <div className="tab-header">
              <h3>Achievement Diaries</h3>
              <button className="tab-reset-btn" onClick={() => setDiaries(getDefaultDiaries())}>Reset</button>
            </div>
            <p>Points per task completed.</p>
            <div className="tier-grid">
              {DIARY_TIERS.map(tier => (
                <div key={tier.name} className="tier-row">
                  <span className="tier-name">{tier.name} ({tier.points} pts)</span>
                  <input type="number" min="0" value={diaries[tier.name] || 0}
                    onChange={(e) => setDiaries(prev => ({ ...prev, [tier.name]: Math.max(0, parseInt(e.target.value) || 0) }))} />
                  <span className="tier-points">{((diaries[tier.name] || 0) * tier.points).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="tab-total">Total: {diaryPoints.toLocaleString()} pts</div>
          </div>
        );
      case 'combat':
        return (
          <div className="tier-input-tab">
            <div className="tab-header">
              <h3>Combat Achievements</h3>
              <button className="tab-reset-btn" onClick={() => setCombatAchievements(getDefaultCombatAchievements())}>Reset</button>
            </div>
            <p>Points per task completed.</p>
            <div className="tier-grid">
              {COMBAT_ACHIEVEMENT_TIERS.map(tier => (
                <div key={tier.name} className="tier-row">
                  <span className="tier-name">{tier.name} ({tier.points} pts)</span>
                  <input type="number" min="0" value={combatAchievements[tier.name] || 0}
                    onChange={(e) => setCombatAchievements(prev => ({ ...prev, [tier.name]: Math.max(0, parseInt(e.target.value) || 0) }))} />
                  <span className="tier-points">{((combatAchievements[tier.name] || 0) * tier.points).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="tab-total">Total: {combatAchievementPoints.toLocaleString()} pts</div>
          </div>
        );
      case 'bosses':
        return (
          <div className="boss-input-tab">
            <div className="tab-header">
              <h3>Boss Kills</h3>
              <button className="tab-reset-btn" onClick={() => setBossKills(getDefaultBossKills())}>Reset</button>
            </div>
            <p>First kill: 5x points. Max 100 kills per boss.</p>
            <div className="boss-grid">
              {BOSSES.map(boss => (
                <div key={boss.name} className="boss-row">
                  <span className="boss-name">{boss.name}</span>
                  <span className="boss-pts">{boss.points}pts</span>
                  <input type="number" min="0" max="100" value={bossKills[boss.name] || 0}
                    onChange={(e) => setBossKills(prev => ({ ...prev, [boss.name]: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }))} />
                  <span className="boss-total">{calculateBossPoints(bossKills[boss.name] || 0, boss.points).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="tab-total">Total: {bossPoints.toLocaleString()} pts</div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DMM Points Calculator</h1>
        <p className="subtitle">Deadman Mode Points Calculator for Old School RuneScape</p>
      </header>

      <main className="calculator">
        <div className="total-points">
          <div className="global-reset-container">
            <button onClick={resetAll} className="global-reset-btn">Reset All</button>
          </div>
          <div className="points-row">
            <span className="points-label">Total Earned</span>
            <span className="points-value">{totalEarnedPoints.toLocaleString()}</span>
          </div>
          <div className="points-row breach">
            <span className="points-label">Breach</span>
            <input type="number" min="0" max="75000" value={breachPoints}
              onChange={(e) => handleBreachPointsChange(e.target.value)} className="breach-input" />
          </div>
          <div className="points-row spent">
            <span className="points-label">Spent</span>
            <span className="points-value">-{totalUnlockCost.toLocaleString()}</span>
          </div>
          <div className="points-row remaining">
            <span className="points-label">Remaining</span>
            <span className={`points-value ${remainingPoints < 0 ? 'negative' : ''}`}>{remainingPoints.toLocaleString()}</span>
          </div>
          <div className="import-export-buttons">
            <button onClick={handleExport} className="export-btn">Export</button>
            <button onClick={() => setShowImportModal(true)} className="import-btn">Import</button>
          </div>
        </div>

        <div className="main-layout">
          <div className="skills-column">
            <div className="tab-buttons">
              <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>Skills</button>
              <button className={activeTab === 'collection' ? 'active' : ''} onClick={() => setActiveTab('collection')}>Collection</button>
              <button className={activeTab === 'clues' ? 'active' : ''} onClick={() => setActiveTab('clues')}>Clues</button>
              <button className={activeTab === 'diaries' ? 'active' : ''} onClick={() => setActiveTab('diaries')}>Diaries</button>
              <button className={activeTab === 'combat' ? 'active' : ''} onClick={() => setActiveTab('combat')}>Combat</button>
              <button className={activeTab === 'bosses' ? 'active' : ''} onClick={() => setActiveTab('bosses')}>Bosses</button>
            </div>
            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>

          <div className="unlocks-columns">
            <UnlockSection title="Quests" unlocks={QUESTS} selected={selectedQuests}
              onToggle={(name) => toggleUnlock(selectedQuests, setSelectedQuests, name)}
              onReset={() => setSelectedQuests(new Set())} />
            <UnlockSection title="Sigils" unlocks={SIGILS} selected={selectedSigils}
              onToggle={(name) => toggleUnlock(selectedSigils, setSelectedSigils, name)}
              onReset={() => setSelectedSigils(new Set())} />
            <UnlockSection title="Attunable Sigils" unlocks={ATTUNABLE_SIGILS} selected={selectedAttunable}
              onToggle={(name) => toggleUnlock(selectedAttunable, setSelectedAttunable, name)}
              onReset={() => setSelectedAttunable(new Set())} />
          </div>
        </div>
      </main>

      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Import Build</h2>
            <p>Paste your exported build code below:</p>
            <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste export code here..." rows={4} />
            {importError && <p className="import-error">{importError}</p>}
            <div className="modal-buttons">
              <button onClick={() => setShowImportModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleImport} className="confirm-btn">Import</button>
            </div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
            <h2>Build Exported!</h2>
            <p>Your build has been copied to clipboard. Share it with others!</p>
            <div className="modal-buttons">
              <button onClick={() => setShowExportModal(false)} className="confirm-btn">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
