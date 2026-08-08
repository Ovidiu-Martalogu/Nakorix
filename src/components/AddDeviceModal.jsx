

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function AddDeviceModal({
    showModal,
    setShowModal,
    setDevices
}) {

    const [device, setDevice] = useState({
        name: "",
        ip: "",
        mac: "",
        type: "Desktop",
        status: "Online",
    });
    const handleChange = (e) => {
        setDevice({
            ...device,
            [e.target.name]: e.target.value,
        });
    };
    const resetDevice = () => {
        setDevice({
            name: "",
            ip: "",
            mac: "",
            type: "Desktop",
            status: "Online",
        });
    };

    const handleSave = () => {
        const newDevice = {
            ...device,
            id: Date.now(),
            lastSeen: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
        };

        setDevices((prevDevices) => [
            ...prevDevices,
            newDevice
        ]);

        resetDevice();
        setShowModal(false);
    };

    return (

        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Device Name</Form.Label>

                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter device name"
                            value={device.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>IP Address</Form.Label>

                        <Form.Control
                            type="text"
                            name="ip"
                            placeholder="192.168.1.10"
                            value={device.ip}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>MAC Address</Form.Label>

                        <Form.Control
                            type="text"
                            name="mac"
                            placeholder="00:1A:2B:3C:4D:5E"
                            value={device.mac}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Device Type</Form.Label>

                        <Form.Select
                            name="type"
                            value={device.type}
                            onChange={handleChange}
                        >
                            <option>Desktop</option>
                            <option>Laptop</option>
                            <option>Mobile</option>
                            <option>Tablet</option>
                            <option>Server</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>

                        <Form.Select
                            name="status"
                            value={device.status}
                            onChange={handleChange}
                        >
                            <option>Online</option>
                            <option>Offline</option>
                            <option>Warning</option>
                        </Form.Select>
                    </Form.Group>
                </Form>

            </Modal.Body>


            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </Button>

                <Button
                    variant="primary"
                    onClick={handleSave}>
                    Save Device
                </Button>

            </Modal.Footer>
        </Modal>
    );
}