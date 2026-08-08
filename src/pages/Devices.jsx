
import DeviceTable from "../components/DeviceTable";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import AddDeviceButton from "../components/AddDeviceButton";
import AddDeviceModal from "../components/AddDeviceModal";
import EditDeviceModal from "../components/EditDeviceModal";
import DeleteDeviceModal from "../components/DeleteDeviceModal";

import { devices as initialDevices } from "../data/devices";

export default function Devices() {

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [devices, setDevices] = useState(initialDevices);

    const [selectedDevice, setSelectedDevice] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);



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

        </section>
    );
}