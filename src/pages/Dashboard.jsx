import StatCard from "../components/StatCard";
import { dashboardStats } from "../data/dashboard";
import ActivityChart from "../components/ActivityChart";

export default function Dashboard() {
    return (
        <section className="dashboard">

            <h1 className="dashboard-title">
                Dashboard
            </h1>

            <div className="dashboard-grid">

                {dashboardStats.map((item) => (
                    <StatCard
                        key={item.id}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                    />
                ))}

            </div>
            <ActivityChart />
        </section>
    );
}