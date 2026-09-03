

export default function SDR() {

    return (
        <section className="sdr">

            <div className="sdr-header">

                <h1>SDR</h1>

            </div>


            <div className="sdr-grid">

                <div className="sdr-card">

                    <h2>SDR Monitoring</h2>

                    <div className="sdr-row">
                        <span>Status</span>
                        <strong>Not available</strong>
                    </div>

                    <div className="sdr-row">
                        <span>Device</span>
                        <strong>No SDR device</strong>
                    </div>

                </div>


                <div className="sdr-card">

                    <h2>Radio Sensor</h2>

                    <div className="sdr-row">
                        <span>Sensor</span>
                        <strong>Not connected</strong>
                    </div>

                    <div className="sdr-row">
                        <span>Monitoring</span>
                        <strong>Waiting for sensor</strong>
                    </div>

                </div>

            </div>


            <div className="sdr-info">

                <h2>SDR Sensor</h2>

                <p>
                    An SDR sensor will be used for
                    radio frequency monitoring and
                    signal analysis.
                </p>

            </div>

        </section>
    );
}

