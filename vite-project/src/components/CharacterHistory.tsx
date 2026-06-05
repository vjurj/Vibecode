export default function CharacterHistory({ history, currentId, onSelectKnight, onClear }) {
  if (history.length <= 1) return null;

  return (
    <div className="history-section">
      <div className="history-header">
        <h4 className="history-title">Recent Rolls</h4>
        <button onClick={onClear} className="clear-history-btn">Clear Log</button>
      </div>
      <div className="history-badges">
        {history.map((k) => {
          const isActive = k.id === currentId;
          return (
            <button
              key={k.id}
              onClick={() => onSelectKnight(k)}
              className={`history-badge ${isActive ? 'active' : ''}`}
              title={`${k.name} - ${k.order}`}
            >
              <span className="badge-name">{k.name}</span>
              <span className="badge-title">{k.order.split(' of ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}