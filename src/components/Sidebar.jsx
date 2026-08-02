import { NavLink } from "react-router-dom"
import menu from "../config/menu"

export default function Sidebar() {
    return (
        <aside>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>
                        <NavLink to={item.path}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}