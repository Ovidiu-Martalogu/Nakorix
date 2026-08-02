import StatCard from "../components/StatCard";

import { dashboardStats } from "../data/dashboard";


export default function Dashboard() {
    return (
        <>
            <h1 className="dashboard-title">
                Dashboard
            </h1>
            <div className="dashboard-grid">
                {dashboardStats.map((item) => {

                    return (
                        <StatCard
                            key={item.id}
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                        />
                    )

                })}

            </div>
        </>
    )
}