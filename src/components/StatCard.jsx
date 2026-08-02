import menu from "../config/menu";

export default function StatCard({ title, value, icon }) {
    const Icon = icon;

    return (
        <div className="stat-card">
            <div className="stat-icon">
                <Icon />
            </div>

            <div className="stat-content">
                <h3>{title}</h3>
                <p>{value}</p>
            </div>
        </div>
    );
}