import {
    LuMonitor,
    LuNetwork,
    LuTriangleAlert,
    LuRadio,
} from "react-icons/lu";

export const dashboardStats = [
    {
        id: 1,
        title: "Devices",
        value: 24,
        icon: LuMonitor,
    },
    {
        id: 2,
        title: "Networks",
        value: 8,
        icon: LuNetwork,
    },
    {
        id: 3,
        title: "Alerts",
        value: 3,
        icon: LuTriangleAlert,
    },
    {
        id: 4,
        title: "SDR",
        value: 2,
        icon: LuRadio,
    },
];