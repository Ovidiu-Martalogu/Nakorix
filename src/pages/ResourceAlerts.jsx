
import { useEffect, useState } from "react";

const API_RESOURCE_ALERTS_URL = "http://127.0.0.1:8000/api/resource-alerts";


export default function ResourceAlerts() {

    const [alerts, setAlerts] = useState([]);
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("");

    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadAlerts = () => {
        fetch(API_RESOURCE_ALERTS_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Server error");
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                setAlerts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(
                    "Eroare la preluarea alertelor de resurse:",
                    error
                );

                setError("Nu s-au putut incarca alertele.");
                setLoading(false);
            });
    };

    useEffect(() => {
        loadAlerts();

        const interval = setInterval(
            loadAlerts,
            10000
        );

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleSort = (field) => {

        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }

    };

    const filteredAlerts = alerts.filter(alert =>
        alert.process_name
            .toLowerCase()
            .includes(search.toLowerCase())
        &&
        (
            severity === "" ||
            alert.severity.toLowerCase() === severity.toLowerCase()
        )
    );

    const getSeverityClass = (severity) => {
        if (severity.toLowerCase() === "high") {
            return "badge bg-danger";
        }

        if (severity.toLowerCase() === "medium") {
            return "badge bg-warning text-dark";
        }

        return "badge bg-success";
    };

    return (


        <div>


            <h1>Resource Alerts</h1>
            <p>Monitorizarea resurselor sistemului.</p>


            {loading && (
                <p>Se incarca alertele...</p>
            )}

            {error && (
                <p className="text-danger">
                    {error}
                </p>
            )}
            <div className="row mb-3">

                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cauta proces..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={severity}
                        onChange={event => setSeverity(event.target.value)}
                    >
                        <option value="">Toate severitatile</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tip</th>
                        <th>Proces</th>
                        <th>PID</th>
                        <th>CPU</th>
                        <th>Memorie</th>
                        <th>Severitate</th>
                        <th>Mesaj</th>
                        <th>Detectat</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map(alert => (
                            <tr key={alert.id}>
                                <td>{alert.id}</td>
                                <td>{alert.type}</td>
                                <td>{alert.process_name}</td>
                                <td>{alert.pid}</td>
                                <td>{alert.cpu_usage}%</td>
                                <td>{alert.memory_usage_mb} MB</td>
                                <td>
                                    <span className={getSeverityClass(alert.severity)}>
                                        {alert.severity}
                                    </span>
                                </td>
                                <td>{alert.message}</td>
                                <td>{alert.detected_at}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">
                                Nu exista alerte care corespund criteriilor.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    );

}