export function Controls({ flavor, setFlavor, onRoll, onCopy }) {
  return (
    <div className="controls">
      <label>
        Inspiration:
        <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
          <option value="all">All Combined</option>
          <option value="lotr">High Mythic (LOTR)</option>
          <option value="witcher">Grim Grit (The Witcher)</option>
          <option value="symbaroum">Dark Corruption (Symbaroum)</option>
          <option value="elden">Shattered Grace (Elden Ring)</option>
        </select>
      </label>
      <div className="button-group">
        <button onClick={onRoll} className="primary-btn">Roll New Knight</button>
        <button onClick={onCopy} className="secondary-btn">Copy Text</button>
      </div>
    </div>
  );
}