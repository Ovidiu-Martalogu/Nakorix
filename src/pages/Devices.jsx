import { devices } from "../data/devices";
import DeviceTable from "../components/DeviceTable";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import AddDeviceButton from "../components/AddDeviceButton";
import AddDeviceModal from "../components/AddDeviceModal";

export default function Devices() {

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

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
            />
            <h1>Devices</h1>

            <DeviceTable devices={filteredDevices} />

        </section>
    );
}