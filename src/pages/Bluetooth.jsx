

export default function Bluetooth() {

    return (
        <section className="bluetooth">

            <div className="bluetooth-header">

                <h1>Bluetooth</h1>

            </div>


            <div className="bluetooth-grid">

                <div className="bluetooth-card">

                    <h2>Bluetooth Monitoring</h2>

                    <div className="bluetooth-row">
                        <span>Status</span>
                        <strong>Not available</strong>
                    </div>

                    <div className="bluetooth-row">
                        <span>Adapter</span>
                        <strong>Built-in adapter</strong>
                    </div>

                </div>


                <div className="bluetooth-card">

                    <h2>Bluetooth Sensor</h2>

                    <div className="bluetooth-row">
                        <span>Sensor</span>
                        <strong>Not connected</strong>
                    </div>

                    <div className="bluetooth-row">
                        <span>Monitoring</span>
                        <strong>Waiting for sensor</strong>
                    </div>

                </div>

            </div>


            <div className="bluetooth-info">

                <h2>Bluetooth Sensor</h2>

                <p>
                    A Bluetooth sensor will be used
                    for device discovery and monitoring.
                </p>

            </div>

        </section>
    );
}

