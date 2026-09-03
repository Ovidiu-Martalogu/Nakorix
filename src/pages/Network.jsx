

import { useEffect, useRef, useState } from "react";

export default function Network() {

    const [network, setNetwork] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [networkChanges, setNetworkChanges] = useState([]);

    const [lastNetworkChange, setLastNetworkChange] = useState(null);

    // Păstrează configurația anterioară fără să provoace rerender
    const previousNetwork = useRef(null);


    const loadNetwork = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://127.0.0.1:8000/api/network"
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load network information"
                );
            }

            const data = await response.json();


            /*
             * Dacă avem deja o configurație,
             * o comparăm cu cea nouă.
             */
            if (previousNetwork.current) {

                const previous =
                    previousNetwork.current;

                const changes = [];


                if (
                    previous.interface !==
                    data.interface
                ) {
                    changes.push({
                        field: "Interface",
                        oldValue: previous.interface,
                        newValue: data.interface,
                    });
                }


                if (
                    previous.adapter !==
                    data.adapter
                ) {
                    changes.push({
                        field: "Adapter",
                        oldValue: previous.adapter,
                        newValue: data.adapter,
                    });
                }


                if (
                    previous.network !==
                    data.network
                ) {
                    changes.push({
                        field: "Network",
                        oldValue: previous.network,
                        newValue: data.network,
                    });
                }


                if (
                    previous.ipv4 !==
                    data.ipv4
                ) {
                    changes.push({
                        field: "IPv4",
                        oldValue: previous.ipv4,
                        newValue: data.ipv4,
                    });
                }


                if (
                    previous.gateway !==
                    data.gateway
                ) {
                    changes.push({
                        field: "Gateway",
                        oldValue: previous.gateway,
                        newValue: data.gateway,
                    });
                }


                if (
                    JSON.stringify(previous.dns) !==
                    JSON.stringify(data.dns)
                ) {
                    changes.push({
                        field: "DNS",
                        oldValue:
                            previous.dns?.join(", "),
                        newValue:
                            data.dns?.join(", "),
                    });
                }


                if (
                    previous.mac !==
                    data.mac
                ) {
                    changes.push({
                        field: "MAC",
                        oldValue: previous.mac,
                        newValue: data.mac,
                    });
                }


                if (
                    previous.status !==
                    data.status
                ) {
                    changes.push({
                        field: "Status",
                        oldValue: previous.status,
                        newValue: data.status,
                    });
                }


                /*
                 * Dacă există modificări,
                 * le afișăm și memorăm momentul.
                 */
                if (changes.length > 0) {

                    setNetworkChanges(changes);

                    setLastNetworkChange(
                        new Date()
                    );

                } else {

                    setNetworkChanges([]);

                }

            }


            /*
             * Actualizăm configurația afișată.
             */
            setNetwork(data);


            /*
             * Salvăm configurația actuală
             * pentru următoarea comparație.
             */
            previousNetwork.current = data;


            setLoading(false);

            setError("");

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load network information."
            );

            setLoading(false);
        }
    };


    useEffect(() => {

        // Prima citire imediat
        loadNetwork();


        // Citire automată la fiecare 10 secunde
        const interval = setInterval(
            loadNetwork,
            10000
        );


        // Oprim intervalul când ieșim din pagină
        return () => {
            clearInterval(interval);
        };

    }, []);


    if (loading && !network) {

        return (
            <section className="network">

                <div className="network-header">

                    <h1>Network</h1>

                </div>

                <p>
                    Loading network information...
                </p>

            </section>
        );
    }


    if (error && !network) {

        return (
            <section className="network">

                <div className="network-header">

                    <h1>Network</h1>

                </div>

                <p>
                    {error}
                </p>

                <button
                    type="button"
                    className="network-refresh-button"
                    onClick={loadNetwork}
                    disabled={loading}
                >
                    ⟳ Refresh
                </button>

            </section>
        );
    }


    return (

        <section className="network">

            <div className="network-header">

                <h1>Network</h1>

                <div className="network-header-actions">

                    {network?.status && (
                        <span className="network-status">
                            <span className="status-dot"></span>
                            {network.status}
                        </span>
                    )}

                    <button
                        type="button"
                        className="network-refresh-button"
                        onClick={loadNetwork}
                        disabled={loading}
                    >
                        {loading ? "⟳ Loading..." : "⟳ Refresh"}
                    </button>

                </div>

            </div>


            {networkChanges.length > 0 && (

                <div className="network-change-alert">

                    <div className="network-change-title">
                        ⚠️ Network configuration changed
                    </div>


                    {lastNetworkChange && (
                        <div className="network-change-time">
                            Detected:{" "}
                            {lastNetworkChange.toLocaleTimeString()}
                        </div>
                    )}


                    <div className="network-change-list">

                        {networkChanges.map(
                            (change) => (

                                <div
                                    className="network-change-item"
                                    key={change.field}
                                >

                                    <strong>
                                        {change.field}
                                    </strong>

                                    <span>
                                        {change.oldValue ||
                                            "None"}

                                        {" → "}

                                        {change.newValue ||
                                            "None"}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}


            <div className="network-grid">

                <div className="network-card">

                    <h2>Connection</h2>

                    <p>
                        <strong>
                            Interface:
                        </strong>{" "}
                        {network?.interface ||
                            "N/A"}
                    </p>

                    <p>
                        <strong>
                            Adapter:
                        </strong>{" "}
                        {network?.adapter ||
                            "N/A"}
                    </p>

                    <p>
                        <strong>
                            Network:
                        </strong>{" "}
                        {network?.network ||
                            "N/A"}
                    </p>

                </div>


                <div className="network-card">

                    <h2>IP Configuration</h2>

                    <p>
                        <strong>
                            IPv4:
                        </strong>{" "}
                        {network?.ipv4 ||
                            "N/A"}
                    </p>

                    <p>
                        <strong>
                            Gateway:
                        </strong>{" "}
                        {network?.gateway ||
                            "N/A"}
                    </p>

                    <p>
                        <strong>
                            DNS:
                        </strong>{" "}
                        {network?.dns?.join(", ") ||
                            "N/A"}
                    </p>

                </div>


                <div className="network-card">

                    <h2>Adapter</h2>

                    <p>
                        <strong>
                            MAC:
                        </strong>{" "}
                        {network?.mac ||
                            "N/A"}
                    </p>

                    <p>
                        <strong>
                            Status:
                        </strong>{" "}
                        {network?.status ||
                            "N/A"}
                    </p>

                </div>

            </div>


            {networkChanges.length > 0 && (

                <div className="network-events">

                    <div className="network-events-header">

                        <h2>Network Events</h2>

                        {lastNetworkChange && (
                            <span>
                                {lastNetworkChange.toLocaleTimeString()}
                            </span>
                        )}

                    </div>


                    <div className="network-event">

                        <div className="network-event-title">
                            ⚠️ Network configuration changed
                        </div>

                        <div className="network-event-details">

                            {networkChanges.map((change) => (

                                <div
                                    className="network-event-row"
                                    key={change.field}
                                >

                                    <strong>
                                        {change.field}
                                    </strong>

                                    <span>
                                        {change.oldValue || "None"}
                                        {" → "}
                                        {change.newValue || "None"}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            )}

        </section>

    );

}

