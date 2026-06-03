import { getModifier } from '../utils/utils';

export function StatBox({ label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-val">{value}</div>
      <div className="stat-mod">{getModifier(value)}</div>
    </div>
  );
}