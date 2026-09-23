
import {
    LuLayoutDashboard,
    LuMonitor,
    LuNetwork,
    LuWaypoints,
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
        title: "Connections",
        path: "/connections",
        icon: LuWaypoints,
    },
    {
        id: 5,
        title: "Wi-Fi",
        path: "/wifi",
        icon: LuWifi,

    },
    {
        id: 6,
        title: "Bluetooth",
        path: "/bluetooth",
        icon: LuBluetooth,

    },
    {
        id: 7,
        title: "SDR",
        path: "/sdr",
        icon: LuRadio,

    },
    {
        id: 8,
        title: "Logs",
        path: "/logs",
        icon: LuFileText,

    },
    {
        id: 9,
        title: "Settings",
        path: "/settings",
        icon: LuSettings,

    },
]

export default menu