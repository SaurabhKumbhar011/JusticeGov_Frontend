const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>

      <div className="stat-icon">
        <i className={`bi ${icon}`}></i>
      </div>

    </div>
  );
};

export default StatCard;