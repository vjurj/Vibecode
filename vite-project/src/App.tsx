import { useState } from 'react';
import './App.css';
import KnightGenerator from './pages/KnightGenerator';
import { SettlementGenerator } from './pages/SettlementGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState('knights');

  return (
    <div className="generator-body-wrapper">
      <div className="container broad-container">
        
        {/* NEW: Navigation Tab Bar */}
        <nav className="app-navigation-tabs">
          <button 
            className={`nav-tab ${activeTab === 'knights' ? 'active' : ''}`}
            onClick={() => setActiveTab('knights')}
          >
            🛡️ Knight Recruits
          </button>
          <button 
            className={`nav-tab ${activeTab === 'settlements' ? 'active' : ''}`}
            onClick={() => setActiveTab('settlements')}
          >
            🏰 Hexcrawl Settlements
          </button>
        </nav>

        {/* Dynamic View Injection */}
        {activeTab === 'knights' ? <KnightGenerator /> : <SettlementGenerator />}
        
      </div>
    </div>
  );
}