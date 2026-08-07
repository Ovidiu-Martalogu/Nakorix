

export default function AddDeviceButton({ setShowModal }) {

    return (
        <button onClick={() => setShowModal(true)}>
            + Add Device
        </button>
    );
}