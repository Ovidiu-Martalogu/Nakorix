import { useEffect, useState } from "react";

export default function Connections() {

    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadConnections = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://127.0.0.1:8000/api/connections"
            );

            if (!response.ok) {
                throw new Error("Unable to load connections.");
            }

            const data = await response.json();

            setConnections(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadConnections();
    }, []);

    return (
        <section className="connections">

            <div className="connections-header">

                <div>
                    <h1>Connections</h1>
                    <p>
                        Active network connections detected on this system.
                    </p>
                </div>

                <button
                    className="connections-refresh-button"
                    onClick={loadConnections}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>

            </div>

            <div className="connections-card">

                {loading && (
                    <div className="connections-empty">
                        <h2>Loading...</h2>
                    </div>
                )}

                {!loading && error && (
                    <div className="connections-empty">
                        <h2>Error</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && connections.length === 0 && (
                    <div className="connections-empty">
                        <h2>No connections</h2>
                        <p>
                            No network connections were detected.
                        </p>
                    </div>
                )}

                {!loading && !error && connections.length > 0 && (
                    <div className="connections-table-wrapper">

                        <table className="connections-table">

                            <thead>
                                <tr>
                                    <th>Local</th>
                                    <th>Remote</th>
                                    <th>State</th>
                                    <th>Process</th>
                                    <th>PID</th>
                                </tr>
                            </thead>

                            <tbody>

                                {connections.map((connection, index) => (

                                    <tr key={`${connection.LocalAddress}-${connection.LocalPort}-${index}`}>

                                        <td>
                                            {connection.LocalAddress}
                                            <span>
                                                :{connection.LocalPort}
                                            </span>
                                        </td>

                                        <td>
                                            {connection.RemoteAddress}
                                            <span>
                                                :{connection.RemotePort}
                                            </span>
                                        </td>

                                        <td>
                                            {connection.State}
                                        </td>

                                        <td>
                                            {connection.ProcessName}
                                        </td>

                                        <td>
                                            {connection.OwningProcess}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </section>
    );
}