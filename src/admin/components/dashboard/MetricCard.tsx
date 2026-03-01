export interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}
const MetricCard: React.FC<StatItem> = ({ label, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__label">{label}</span>
        <div className="stat-card__icon-wrapper">{icon}</div>
      </div>

      <div className="stat-card__body">
        <h2 className="stat-card__value">{value}</h2>
      </div>
    </div>
  );
};
export default MetricCard;
