export default function DeviceTable({ devices }) {
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
                    </tr>

                ))}

            </tbody>

        </table>

    );
}