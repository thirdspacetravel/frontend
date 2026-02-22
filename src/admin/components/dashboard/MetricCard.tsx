export interface StatItem {
  label: string;
  value: string;
  trend?: string;
  trendType?: "up" | "neutral";
  icon: React.ReactNode;
}
const MetricCard: React.FC<StatItem> = ({
  label,
  value,
  trend,
  trendType,
  icon,
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <span className="stat-card__label">{label}</span>
        <div className="stat-card__icon-wrapper">{icon}</div>
      </div>

      <div className="stat-card__body">
        <h2 className="stat-card__value">{value}</h2>
      </div>

      {trend && (
        <div className={`stat-card__trend stat-card__trend--${trendType}`}>
          {trendType === "up" && (
            <svg
              className="stat-card__trend-icon"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M9.33331 4.08325H12.8333V7.58325"
                stroke="white"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.8334 4.08325L7.87502 9.04158L4.95835 6.12492L1.16669 9.91658"
                stroke="white"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="stat-card__trend-text">{trend}</span>
        </div>
      )}
    </div>
  );
};
export default MetricCard;
