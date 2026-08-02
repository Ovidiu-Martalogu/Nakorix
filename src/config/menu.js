
import {
    LuLayoutDashboard,
    LuMonitor,
    LuNetwork,
    LuWifi,
    LuBluetooth,
    LuRadio,
    LuFileText,
    LuSettings,
} from "react-icons/lu";

const menu = [
    {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        icon: LuLayoutDashboard,
    },
    {
        id: 2,
        title: "Devices",
        path: "/devices",
        icon: LuMonitor,

    },
    {
        id: 3,
        title: "Network",
        path: "/network",
        icon: LuNetwork,

    },
    {
        id: 4,
        title: "Wi-Fi",
        path: "/wifi",
        icon: LuWifi,

    },
    {
        id: 5,
        title: "Bluetooth",
        path: "/bluetooth",
        icon: LuBluetooth,

    },
    {
        id: 6,
        title: "SDR",
        path: "/sdr",
        icon: LuRadio,

    },
    {
        id: 7,
        title: "Logs",
        path: "/logs",
        icon: LuFileText,

    },
    {
        id: 8,
        title: "Settings",
        path: "/settings",
        icon: LuSettings,

    },
]

export default menu