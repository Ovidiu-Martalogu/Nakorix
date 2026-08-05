import { devices } from "../data/devices";
import DeviceTable from "../components/DeviceTable";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Devices() {

    const [search, setSearch] = useState("");

    const filteredDevices = devices.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <section className="devices">
            <SearchBar
                search={search}
                setSearch={setSearch}
            />
            <h1>Devices</h1>

            <DeviceTable devices={filteredDevices} />

        </section>
    );
}