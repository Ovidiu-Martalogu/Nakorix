

export default function Wifi() {

    return (
        <section className="wifi">

            <div className="wifi-header">

                <h1>Wi-Fi</h1>

            </div>


            <div className="wifi-grid">

                <div className="wifi-card">

                    <h2>Wi-Fi Monitoring</h2>

                    <div className="wifi-row">
                        <span>Status</span>
                        <strong>Not available</strong>
                    </div>

                    <div className="wifi-row">
                        <span>Adapter</span>
                        <strong>Built-in adapter</strong>
                    </div>

                </div>


                <div className="wifi-card">

                    <h2>External Wi-Fi Adapter</h2>

                    <div className="wifi-row">
                        <span>Sensor</span>
                        <strong>Not connected</strong>
                    </div>

                    <div className="wifi-row">
                        <span>Monitoring</span>
                        <strong>Waiting for sensor</strong>
                    </div>

                </div>

            </div>


            <div className="wifi-info">

                <h2>Wi-Fi Sensor</h2>

                <p>
                    An external Wi-Fi adapter will be used
                    for advanced Wi-Fi monitoring.
                </p>

            </div>

        </section>
    );
}

