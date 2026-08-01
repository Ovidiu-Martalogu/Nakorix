import menu from "../config/menu"

export default function Sidebar() {
    return (
        <aside>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </aside>
    )
}