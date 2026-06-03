import { useState, useEffect, useCallback } from 'react';
// import { KNIGHT_DATA } from './constants';
// import CharacterHistory from './CharacterHistory'; // New Component
import '../App.css';
import CharacterHistory from '../components/CharacterHistory';
import { Controls } from '../components/Controls';
import { StatBox } from '../components/Statbox';
import { KNIGHT_DATA } from '../model/knightData';
import { getRandomElement, roll3d6, getModifier } from '../utils/utils';

export default function KnightGenerator() {
  const [flavor, setFlavor] = useState('all');
  const [knight, setKnight] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Load history from localStorage on initialization
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('osr_knight_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('osr_knight_history', JSON.stringify(history));
  }, [history]);

  const generateCharacter = useCallback(() => {
    const pool = flavor === 'all' 
      ? getRandomElement(['lotr', 'witcher', 'symbaroum', 'elden']) 
      : flavor;

    const rolledStats = {
      STR: roll3d6(), DEX: roll3d6(), CON: roll3d6(),
      INT: roll3d6(), WIS: roll3d6(), CHA: roll3d6()
    };

    const conMod = parseInt(getModifier(rolledStats.CON), 10);
    const hpRoll = Math.floor(Math.random() * 8 + 1);
    const finalHp = Math.max(1, hpRoll + conMod);

    const newKnight = {
      id: crypto.randomUUID(), // Unique key for history matching
      name: getRandomElement(KNIGHT_DATA.names[pool]),
      order: getRandomElement(KNIGHT_DATA.orders[pool]),
      lore: getRandomElement(KNIGHT_DATA.traits[pool]),
      stats: rolledStats,
      hpText: `${finalHp} HP (Rolled 1d8 [${hpRoll}] ${conMod >= 0 ? '+' : ''}${conMod})`,
      goldText: `${roll3d6() * 10} Silver Coins`,
      gear: [
        getRandomElement(KNIGHT_DATA.weapons),
        getRandomElement(KNIGHT_DATA.armor),
        getRandomElement(KNIGHT_DATA.supplies)
      ],
      relic: getRandomElement(KNIGHT_DATA.relics[pool])
    };

    setKnight(newKnight);

    // Append to rolling history capped at the 5 most recent additions
    setHistory((prevHistory) => {
      const filtered = prevHistory.filter(k => k.id !== newKnight.id);
      return [newKnight, ...filtered].slice(0, 5);
    });
  }, [flavor]);

  useEffect(() => {
    // Only roll a brand new character on boot if history is completely empty
    if (history.length > 0 && !knight) {
      setKnight(history[0]);
    } else if (!knight) {
      generateCharacter();
    }
  }, [generateCharacter, history, knight]);

  const copyToClipboard = () => {
    if (!knight) return;
    const statsText = Object.entries(knight.stats)
      .map(([k, v]) => `${k}: ${v} (${getModifier(v)})`)
      .join(' | ');

    const fullText = `--- OSR MYTHICAL KNIGHT ---\nName: ${knight.name}\nAffiliation: ${knight.order}\n${knight.hpText}\n\n${statsText}\n\nTrait: ${knight.lore}\n\nRelic: ${knight.relic}`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('osr_knight_history');
  };

  if (!knight) return <div className="loading">Forging your knight...</div>;

  return (
    <div className="generator-body-wrapper">
      <div className="container">
        <header>
          <h1>OSR Mythical Knight</h1>
          <div className="subtitle">An Old-School Renaissance Character Generator</div>
        </header>

        <Controls 
          flavor={flavor} 
          setFlavor={setFlavor} 
          onRoll={generateCharacter} 
          onCopy={copyToClipboard}
          copied={copied} 
        />

        <div className="character-sheet">
          <div className="knight-identity">
            <h2>{knight.name}</h2>
            <div className="knight-title">{knight.order}</div>
          </div>

          <div className="card identity-stats-card">
            <h3 className="section-title">Attributes (3d6)</h3>
            <div className="stat-grid">
              {Object.entries(knight.stats).map(([label, val]) => (
                <StatBox key={label} label={label} value={val} />
              ))}
            </div>

            <div className="derived-container">
              <div className="derived-row">
                <span>Hit Points</span>
                <strong>{knight.hpText}</strong>
              </div>
              <div className="derived-row">
                <span>Starting Purse</span>
                <strong>{knight.goldText}</strong>
              </div>
            </div>
          </div>

          <div className="card lore-gear-card">
            <h3 className="section-title">Vow & Burden</h3>
            <p className="lore-text">{knight.lore}</p>

            <h3 className="section-title">Starting Equipment</h3>
            <ul className="equipment-list">
              {knight.gear.map((item, i) => <li key={i}>{item}</li>)}
            </ul>

            <div className="relic-box">
              <div className="relic-title">🛡️ Mythical Relic</div>
              <p>{knight.relic}</p>
            </div>
          </div>
        </div>

        {/* Character History UI Footprint */}
        <CharacterHistory 
          history={history} 
          currentId={knight.id} 
          onSelectKnight={setKnight}
          onClear={clearHistory}
        />
      </div>
    </div>
  );
}