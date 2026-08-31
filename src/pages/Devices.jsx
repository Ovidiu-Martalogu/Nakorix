

import DeviceTable from "../components/DeviceTable";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AddDeviceButton from "../components/AddDeviceButton";
import AddDeviceModal from "../components/AddDeviceModal";
import EditDeviceModal from "../components/EditDeviceModal";
import DeleteDeviceModal from "../components/DeleteDeviceModal";

export default function Devices() {

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [devices, setDevices] = useState([]);

    const [discoveredDevices, setDiscoveredDevices] = useState([]);

    const [selectedDevice, setSelectedDevice] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [loading, setLoading] = useState(true);

    const [scanning, setScanning] = useState(false);

    const [error, setError] = useState("");

    const [scanError, setScanError] = useState("");


    // ==========================================
    // LOAD DEVICES FROM DATABASE
    // ==========================================

    useEffect(() => {

        const fetchDevices = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://127.0.0.1:8000/api/devices"
                );

                if (!response.ok) {
                    throw new Error("Failed to load devices");
                }

                const data = await response.json();

                setDevices(data);

            } catch (error) {

                console.error(error);

                setError("Failed to load devices.");

            } finally {

                setLoading(false);

            }
        };

        fetchDevices();

    }, []);


    // ==========================================
    // SCAN NETWORK
    // ==========================================

    const handleScanNetwork = async () => {

        try {

            setScanning(true);
            setScanError("");

            const response = await fetch(
                "http://127.0.0.1:8000/api/devices/discover"
            );

            if (!response.ok) {
                throw new Error("Failed to discover devices");
            }

            const data = await response.json();

            setDiscoveredDevices(data);

        } catch (error) {

            console.error(error);

            setScanError("Failed to scan network.");

        } finally {

            setScanning(false);

        }
    };


    // ==========================================
    // ADD DISCOVERED DEVICE
    // ==========================================

    const handleAddDiscoveredDevice = async (device) => {

        try {

            const newDevice = {
                name: device.hostname || `Device-${device.ip}`,
                ip: device.ip,
                mac: device.mac,
                type: "Unknown",
                status: "Online",
            };


            const response = await fetch(
                "http://127.0.0.1:8000/api/devices",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(newDevice),
                }
            );


            if (!response.ok) {
                throw new Error("Failed to add device");
            }


            const addedDevice = await response.json();


            // Adaugam dispozitivul in lista principala
            setDevices((prevDevices) => [
                ...prevDevices,
                addedDevice,
            ]);


            // Il scoatem din lista dispozitivelor descoperite
            setDiscoveredDevices((prevDevices) =>
                prevDevices.filter(
                    (item) =>
                        item.mac?.toLowerCase() !==
                        device.mac?.toLowerCase()
                )
            );


        } catch (error) {

            console.error(error);

        }
    };


    // ==========================================
    // COMPARE DISCOVERED WITH DATABASE
    // ==========================================

    const deviceComparison = discoveredDevices.map((discovered) => {

        const existingDevice = devices.find(
            (device) =>
                device.mac?.toLowerCase() ===
                discovered.mac?.toLowerCase()
        );


        return {
            ...discovered,
            known: Boolean(existingDevice),
            databaseDevice: existingDevice || null,
        };

    });


    // ==========================================
    // DEVICES NOT FOUND DURING SCAN
    // ==========================================

    const offlineDevices = devices.filter((device) => {

        return !discoveredDevices.some(
            (discovered) =>
                device.mac?.toLowerCase() ===
                discovered.mac?.toLowerCase()
        );

    });


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredDevices = devices.filter((item) => {

        return item.name
            .toLowerCase()
            .includes(search.toLowerCase());

    });


    // ==========================================
    // RENDER
    // ==========================================

    return (
        <section className="devices">


            {/* SEARCH */}

            <SearchBar
                search={search}
                setSearch={setSearch}
            />


            {/* ADD DEVICE */}

            <AddDeviceButton
                setShowModal={setShowModal}
            />


            {/* NETWORK SCAN */}

            <button
                type="button"
                onClick={handleScanNetwork}
                disabled={scanning}
            >
                {scanning ? "Scanning..." : "Scan Network"}
            </button>


            {/* SCAN ERROR */}

            {scanError && (
                <p>{scanError}</p>
            )}


            {/* ADD MODAL */}

            <AddDeviceModal
                showModal={showModal}
                setShowModal={setShowModal}
                setDevices={setDevices}
            />


            {/* EDIT MODAL */}

            <EditDeviceModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                device={selectedDevice}
                setDevices={setDevices}
            />


            {/* DELETE MODAL */}

            <DeleteDeviceModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                device={selectedDevice}
                setDevices={setDevices}
            />


            {/* TITLE */}

            <h1>Devices</h1>


            {/* LOADING */}

            {loading && (
                <p>Loading devices...</p>
            )}


            {/* ERROR */}

            {error && (
                <p>{error}</p>
            )}


            {/* DATABASE DEVICES */}

            {!loading && !error && (

                <DeviceTable
                    devices={filteredDevices}

                    onEdit={(device) => {

                        setSelectedDevice(device);
                        setShowEditModal(true);

                    }}

                    onDelete={(device) => {

                        setSelectedDevice(device);
                        setShowDeleteModal(true);

                    }}
                />

            )}


            {/* ==========================================
    NETWORK DISCOVERY
========================================== */}

            {discoveredDevices.length > 0 && (

                <div className="network-discovery">

                    <div className="network-discovery-header">

                        <div>
                            <h2>Network Discovery</h2>

                            <p>
                                Devices discovered on the current network
                            </p>
                        </div>

                        <span className="discovery-count">
                            {discoveredDevices.length} discovered
                        </span>

                    </div>


                    <div className="discovery-table">

                        <div className="discovery-row discovery-header-row">

                            <div>Device</div>
                            <div>IP Address</div>
                            <div>MAC Address</div>
                            <div>State</div>
                            <div>Status</div>
                            <div>Action</div>

                        </div>


                        {deviceComparison.map((device, index) => (

                            <div
                                className="discovery-row"
                                key={`${device.mac}-${index}`}
                            >

                                <div className="discovery-device">

                                    <strong>
                                        {device.hostname || "Unknown Device"}
                                    </strong>

                                </div>


                                <div>
                                    {device.ip}
                                </div>


                                <div className="discovery-mac">
                                    {device.mac}
                                </div>


                                <div>
                                    {device.state}
                                </div>


                                <div>

                                    {device.known ? (

                                        <span className="discovery-status known">
                                            Known Device
                                        </span>

                                    ) : (

                                        <span className="discovery-status new">
                                            New Device
                                        </span>

                                    )}

                                </div>


                                <div>

                                    {!device.known && (

                                        <button
                                            type="button"
                                            className="discovery-add-button"
                                            onClick={() =>
                                                handleAddDiscoveredDevice(device)
                                            }
                                        >
                                            Add to Devices
                                        </button>

                                    )}

                                    {device.known && (

                                        <span className="discovery-check">
                                            ✓
                                        </span>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* ==========================================
            NOT DISCOVERED
        ========================================== */}

                    {offlineDevices.length > 0 && (

                        <div className="not-discovered">

                            <div className="not-discovered-header">

                                <h3>
                                    Not Discovered
                                </h3>

                                <span>
                                    {offlineDevices.length}
                                </span>

                            </div>


                            <div className="discovery-table">

                                {offlineDevices.map((device) => (

                                    <div
                                        className="discovery-row not-discovered-row"
                                        key={device.id}
                                    >

                                        <div className="discovery-device">

                                            <strong>
                                                {device.name}
                                            </strong>

                                        </div>


                                        <div>
                                            {device.ip}
                                        </div>


                                        <div className="discovery-mac">
                                            {device.mac}
                                        </div>


                                        <div>
                                            —
                                        </div>


                                        <div>

                                            <span className="discovery-status offline">
                                                Not Discovered
                                            </span>

                                        </div>


                                        <div>
                                            —
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )}

                </div>

            )}

        </section>
    );
}

