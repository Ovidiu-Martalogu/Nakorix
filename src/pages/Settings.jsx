
export default function Settings() {

    return (
        <section className="settings">

            <div className="settings-header">
                <h1>Settings</h1>
            </div>


            <div className="settings-grid">

                <div className="settings-card">

                    <h2>System</h2>

                    <div className="settings-row">
                        <span>Application</span>
                        <strong>Nakorix</strong>
                    </div>

                    <div className="settings-row">
                        <span>Version</span>
                        <strong>1.0</strong>
                    </div>

                    <div className="settings-row">
                        <span>Monitoring</span>
                        <strong>Enabled</strong>
                    </div>

                </div>


                <div className="settings-card">

                    <h2>Monitoring</h2>

                    <div className="settings-row">
                        <span>Network monitoring</span>
                        <strong>Enabled</strong>
                    </div>

                    <div className="settings-row">
                        <span>Device discovery</span>
                        <strong>Manual</strong>
                    </div>

                    <div className="settings-row">
                        <span>Automatic refresh</span>
                        <strong>10 seconds</strong>
                    </div>

                </div>

            </div>


            <div className="settings-info">

                <h2>Configuration</h2>

                <p>
                    Nakorix configuration options will be available here.
                </p>

            </div>

        </section>
    );
}

