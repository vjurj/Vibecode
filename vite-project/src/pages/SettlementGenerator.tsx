import { useState, useEffect } from 'react';
import { SETTLEMENT_DATA } from '../model/settlementConstants';
import { ControlsSettlement } from '../components/ControlsSettlement';

// Quick helper to grab a random array item
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function SettlementGenerator() {
  const [flavor, setFlavor] = useState('all');
  const [settlement, setSettlement] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateSettlement = () => {
    // If 'all', pick one pool at random for this roll
    const pool = flavor === 'all' 
      ? getRandom(['lotr', 'witcher', 'symbaroum', 'elden']) 
      : flavor;

    const rolledSettlement = {
      name: `Hex Layout Area - Pool Variant`, // Placeholder or custom naming schema
      type: getRandom(SETTLEMENT_DATA.types[pool]),
      hook: SETTLEMENT_DATA.hooks[pool],
      crisis: getRandom(SETTLEMENT_DATA.crises[pool]),
      npc: getRandom(SETTLEMENT_DATA.npcs[pool]),
      shops: [
        getRandom(SETTLEMENT_DATA.services),
        getRandom(SETTLEMENT_DATA.services)
      ]
    };

    setSettlement(rolledSettlement);
  };

  // Roll on component initialization
  useEffect(() => {
    generateSettlement();
  }, [flavor]);

  const copyToClipboard = () => {
    if (!settlement) return;
    
    const text = `--- OSR HEXCRAWL SETTLEMENT ---\nType: ${settlement.type}\nVisual Hook: ${settlement.hook}\n\nCurrent Local Crisis: ${settlement.crisis}\n\nNotable NPC: ${settlement.npc}\n\nAvailable Amenities:\n- ${settlement.shops.join('\n- ')}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!settlement) return <div className="loading">Surveying the wilderness...</div>;

  return (
    <div>
      {/* Top Controls Interface block matches your layout exactly */}
        <ControlsSettlement
            flavor={flavor} 
            setFlavor={setFlavor} 
            onRoll={generateSettlement} 
            onCopy={copyToClipboard}
            copied={copied} 
        />

      {/* Two Column Grid layout mirroring your prior format exactly */}
      <div className="character-sheet">
        <div className="knight-identity">
          <h2>{settlement.type}</h2>
          <div className="subtitle" style={{ color: 'inherit', fontStyle: 'normal', opacity: 0.9 }}>
            Discovered Settlement Profile
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">Local Infrastructure</h3>
          <p className="lore-text" style={{ fontStyle: 'normal' }}>{settlement.hook}</p>
          
          <h3 className="section-title">Available Amenities</h3>
          <ul className="equipment-list">
            {settlement.shops.map((shop, idx) => <li key={idx}>{shop}</li>)}
          </ul>
        </div>

        <div className="card">
          <h3 className="section-title">⚠️ Current Crisis</h3>
          <p className="lore-text" style={{ color: 'hsl(10, 40%, 30%)' }}>
            {settlement.crisis}
          </p>

          <h3 className="section-title">Notable Resident</h3>
          <div className="relic-box">
            <div className="relic-title">👤 NPC Lead</div>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{settlement.npc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}