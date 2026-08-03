import { devices } from "../data/devices";
import DeviceTable from "../components/DeviceTable";

export default function Devices() {
    return (
        <section className="devices">

            <h1>Devices</h1>

            <DeviceTable devices={devices} />

        </section>
    );
}