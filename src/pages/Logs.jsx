
import { useEffect, useState } from "react";

export default function Logs() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadLogs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://127.0.0.1:8000/api/logs"
            );

            if (!response.ok) {
                throw new Error("Unable to load logs.");
            }

            const data = await response.json();

            setLogs(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadLogs();

    }, []);


    return (
        <section className="logs">

            <div className="logs-header">

                <h1>Logs</h1>

                <button
                    className="logs-refresh-button"
                    onClick={loadLogs}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Refresh"}
                </button>

            </div>


            <div className="logs-card">

                {loading && (
                    <div className="logs-empty">

                        <h2>Loading...</h2>

                    </div>
                )}


                {!loading && error && (
                    <div className="logs-empty">

                        <h2>Error</h2>

                        <p>
                            {error}
                        </p>

                    </div>
                )}


                {!loading && !error && logs.length === 0 && (
                    <div className="logs-empty">

                        <h2>No events</h2>

                        <p>
                            Nakorix has not recorded any events yet.
                        </p>

                    </div>
                )}


                {!loading && !error && logs.length > 0 && (

                    <div className="logs-list">

                        {logs.map((log) => (

                            <div
                                className="logs-item"
                                key={log.id}
                            >

                                <div>
                                    <strong>
                                        {log.module}
                                    </strong>

                                    <span>
                                        {log.event}
                                    </span>
                                </div>


                                <p>
                                    {log.message}
                                </p>


                                <small>
                                    {log.created_at}
                                </small>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}
