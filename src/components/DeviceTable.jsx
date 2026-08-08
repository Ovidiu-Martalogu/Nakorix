
import { LuPencil, LuTrash2 } from "react-icons/lu";



export default function DeviceTable({ devices, onEdit, onDelete }) {
    return (

        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>IP</th>
                    <th>MAC</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Last Seen</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>

                {devices.map((item) => (

                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.ip}</td>
                        <td>{item.mac}</td>
                        <td>{item.type}</td>
                        <td>
                            <span className={`status ${item.status.toLowerCase()}`}>
                                {item.status}
                            </span>
                        </td>
                        <td>{item.lastSeen}</td>

                        <td>
                            <button onClick={() => onEdit(item)}>
                                <LuPencil />
                            </button>

                            <button onClick={() => onDelete(item)}>
                                <LuTrash2 />
                            </button>
                        </td>
                    </tr>

                ))}

            </tbody>

        </table >

    );
}