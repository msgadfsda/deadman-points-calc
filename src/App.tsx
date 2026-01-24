import React, { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'dmm-calculator-state';

interface Skill {
  name: string;
  icon: string;
}

interface Unlock {
  name: string;
  cost: number;
}

const SKILLS: Skill[] = [
  { name: 'Attack', icon: 'https://oldschool.runescape.wiki/images/Attack_icon.png' },
  { name: 'Hitpoints', icon: 'https://oldschool.runescape.wiki/images/Hitpoints_icon.png' },
  { name: 'Mining', icon: 'https://oldschool.runescape.wiki/images/Mining_icon.png' },
  { name: 'Strength', icon: 'https://oldschool.runescape.wiki/images/Strength_icon.png' },
  { name: 'Agility', icon: 'https://oldschool.runescape.wiki/images/Agility_icon.png' },
  { name: 'Smithing', icon: 'https://oldschool.runescape.wiki/images/Smithing_icon.png' },
  { name: 'Defence', icon: 'https://oldschool.runescape.wiki/images/Defence_icon.png' },
  { name: 'Herblore', icon: 'https://oldschool.runescape.wiki/images/Herblore_icon.png' },
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

function calculateDMMPoints(level: number): number {
  if (level < 1 || level > 99) return 0;

  let points = 0;

  // 5 points for every skill level above 1
  if (level > 1) {
    points += (level - 1) * 5;
  }

  // Extra 5 points for every skill level past 50
  if (level > 50) {
    points += (level - 50) * 5;
  }

  // 300 points for 99 in a skill
  if (level === 99) {
    points += 300;
  }

  return points;
}

interface UnlockSectionProps {
  title: string;
  unlocks: Unlock[];
  selected: Set<string>;
  onToggle: (name: string) => void;
}

function UnlockSection({ title, unlocks, selected, onToggle }: UnlockSectionProps) {
  const totalCost = unlocks
    .filter(u => selected.has(u.name))
    .reduce((sum, u) => sum + u.cost, 0);

  return (
    <div className="unlock-section">
      <h3>{title} <span className="section-cost">(-{totalCost.toLocaleString()})</span></h3>
      <div className="unlock-grid">
        {unlocks.map(unlock => (
          <label key={unlock.name} className={`unlock-item ${selected.has(unlock.name) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={selected.has(unlock.name)}
              onChange={() => onToggle(unlock.name)}
            />
            <span className="unlock-name">{unlock.name}</span>
            <span className="unlock-cost">{unlock.cost.toLocaleString()}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        levels: parsed.levels || Object.fromEntries(SKILLS.map(skill => [skill.name, 1])),
        quests: new Set<string>(parsed.quests || []),
        sigils: new Set<string>(parsed.sigils || []),
        attunable: new Set<string>(parsed.attunable || []),
        breachPoints: parsed.breachPoints || 0,
      };
    }
  } catch (e) {
    console.error('Failed to load saved state:', e);
  }
  return {
    levels: Object.fromEntries(SKILLS.map(skill => [skill.name, 1])),
    quests: new Set<string>(),
    sigils: new Set<string>(),
    attunable: new Set<string>(),
    breachPoints: 0,
  };
}

function App() {
  const savedState = loadSavedState();
  const [levels, setLevels] = useState<Record<string, number>>(savedState.levels);
  const [selectedQuests, setSelectedQuests] = useState<Set<string>>(savedState.quests);
  const [selectedSigils, setSelectedSigils] = useState<Set<string>>(savedState.sigils);
  const [selectedAttunable, setSelectedAttunable] = useState<Set<string>>(savedState.attunable);
  const [breachPoints, setBreachPoints] = useState<number>(savedState.breachPoints);
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
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [levels, selectedQuests, selectedSigils, selectedAttunable, breachPoints]);

  const handleExport = () => {
    const exportData = {
      levels,
      quests: Array.from(selectedQuests),
      sigils: Array.from(selectedSigils),
      attunable: Array.from(selectedAttunable),
      breachPoints,
    };
    const exportString = btoa(JSON.stringify(exportData));
    navigator.clipboard.writeText(exportString);
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
      setShowImportModal(false);
      setImportText('');
      setImportError('');
    } catch (e) {
      setImportError('Invalid import data. Please check and try again.');
    }
  };

  const handleBreachPointsChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(5000, Math.max(0, numValue));
    setBreachPoints(clampedValue);
  };

  const handleLevelChange = (skillName: string, value: string) => {
    const numValue = parseInt(value) || 1;
    const clampedValue = Math.min(99, Math.max(1, numValue));
    setLevels(prev => ({ ...prev, [skillName]: clampedValue }));
  };

  const toggleUnlock = (set: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>, name: string) => {
    const newSet = new Set(set);
    if (newSet.has(name)) {
      newSet.delete(name);
    } else {
      newSet.add(name);
    }
    setFn(newSet);
  };

  const skillPoints = Object.values(levels).reduce(
    (sum, level) => sum + calculateDMMPoints(level),
    175
  );

  const totalEarnedPoints = skillPoints + breachPoints;
  const questCost = QUESTS.filter(q => selectedQuests.has(q.name)).reduce((sum, q) => sum + q.cost, 0);
  const sigilCost = SIGILS.filter(s => selectedSigils.has(s.name)).reduce((sum, s) => sum + s.cost, 0);
  const attunableCost = ATTUNABLE_SIGILS.filter(a => selectedAttunable.has(a.name)).reduce((sum, a) => sum + a.cost, 0);
  const totalUnlockCost = questCost + sigilCost + attunableCost;
  const remainingPoints = totalEarnedPoints - totalUnlockCost;

  const setAllLevels = (level: number) => {
    setLevels(Object.fromEntries(SKILLS.map(skill => [skill.name, level])));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DMM Points Calculator</h1>
        <p className="subtitle">Deadman Mode Points Calculator for Old School RuneScape</p>
      </header>

      <main className="calculator">
        <div className="total-points">
          <div className="points-row">
            <span className="points-label">Skill Points</span>
            <span className="points-value">{skillPoints.toLocaleString()}</span>
          </div>
          <div className="points-row breach">
            <span className="points-label">Breach Points</span>
            <input
              type="number"
              min="0"
              max="5000"
              value={breachPoints}
              onChange={(e) => handleBreachPointsChange(e.target.value)}
              className="breach-input"
            />
          </div>
          <div className="points-row spent">
            <span className="points-label">Spent</span>
            <span className="points-value">-{totalUnlockCost.toLocaleString()}</span>
          </div>
          <div className="points-row remaining">
            <span className="points-label">Remaining</span>
            <span className={`points-value ${remainingPoints < 0 ? 'negative' : ''}`}>
              {remainingPoints.toLocaleString()}
            </span>
          </div>
          <div className="import-export-buttons">
            <button onClick={handleExport} className="export-btn">Export</button>
            <button onClick={() => setShowImportModal(true)} className="import-btn">Import</button>
          </div>
        </div>

        <div className="main-layout">
          <div className="skills-column">
            <div className="quick-actions">
              <button onClick={() => setAllLevels(1)}>Reset All</button>
              <button onClick={() => setAllLevels(50)}>All 50</button>
              <button onClick={() => setAllLevels(99)}>All 99</button>
            </div>

            <div className="skills-grid">
              {SKILLS.map(skill => (
                <div key={skill.name} className="skill-card">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-icon"
                  />
                  <span className="skill-name">{skill.name}</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={levels[skill.name]}
                    onChange={(e) => handleLevelChange(skill.name, e.target.value)}
                    className="skill-input"
                  />
                  <span className="skill-points">
                    {calculateDMMPoints(levels[skill.name])} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="unlocks-columns">
            <UnlockSection
              title="Quests"
              unlocks={QUESTS}
              selected={selectedQuests}
              onToggle={(name) => toggleUnlock(selectedQuests, setSelectedQuests, name)}
            />
            <UnlockSection
              title="Sigils"
              unlocks={SIGILS}
              selected={selectedSigils}
              onToggle={(name) => toggleUnlock(selectedSigils, setSelectedSigils, name)}
            />
            <UnlockSection
              title="Attunable Sigils"
              unlocks={ATTUNABLE_SIGILS}
              selected={selectedAttunable}
              onToggle={(name) => toggleUnlock(selectedAttunable, setSelectedAttunable, name)}
            />
          </div>
        </div>
      </main>

      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Import Build</h2>
            <p>Paste your exported build code below:</p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste export code here..."
              rows={4}
            />
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
