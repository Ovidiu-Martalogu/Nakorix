import { NavLink } from "react-router-dom";
import menu from "../config/menu";

export default function Sidebar() {
    return (
        <aside>
            <ul>
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.id}>
                            <NavLink to={item.path}>
                                <Icon />
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}