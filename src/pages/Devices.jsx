
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

    const [selectedDevice, setSelectedDevice] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

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


    const filteredDevices = devices.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <section className="devices">
            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <AddDeviceButton
                setShowModal={setShowModal}
            />

            <AddDeviceModal
                showModal={showModal}
                setShowModal={setShowModal}
                setDevices={setDevices}
            />
            <EditDeviceModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                device={selectedDevice}
                setDevices={setDevices}
            />

            <DeleteDeviceModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                device={selectedDevice}
                setDevices={setDevices}
            />

            <h1>Devices</h1>

            {loading && <p>Loading devices...</p>}

            {error && <p>{error}</p>}

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
        </section>
    );
}