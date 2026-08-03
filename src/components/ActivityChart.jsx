import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { activityData } from "../data/activity";

export default function ActivityChart() {
    return (
        <div className="activity-chart">

            <h2>Weekly Activity</h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={activityData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="devices"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}