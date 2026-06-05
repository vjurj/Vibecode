export function ControlsSettlement({ flavor, setFlavor, onRoll, onCopy }) {
  return (
    <div className="controls">
        <label>
          Region Atmosphere:
          <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
            <option value="all">All Combined Wilds</option>
            <option value="lotr">High Mythic Borderlands</option>
            <option value="witcher">Grim Grit Villages</option>
            <option value="symbaroum">Dark Corruption Frontier</option>
            <option value="elden">Shattered Lands Ruins</option>
          </select>
        </label>

        <div className="button-group">
            <button onClick={onRoll} className="primary-btn">Roll New Settlement</button>
            <button onClick={onCopy} className="secondary-btn">Copy Text</button>
        </div>
      </div>
  );
}