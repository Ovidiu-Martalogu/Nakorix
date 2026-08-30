

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

    const [errors, setErrors] = useState({});

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

        setErrors({});
    };

    const validateDevice = () => {
        const newErrors = {};

        // Validate name
        if (!device.name.trim()) {
            newErrors.name = "Device name is required.";
        }

        // Validate IPv4
        const ipRegex =
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

        if (!ipRegex.test(device.ip)) {
            newErrors.ip = "Please enter a valid IPv4 address.";
        }

        // Validate MAC address
        const macRegex =
            /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

        if (!macRegex.test(device.mac)) {
            newErrors.mac = "Please enter a valid MAC address.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {

        if (!validateDevice()) {
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/devices",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(device),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add device");
            }

            const newDevice = await response.json();

            setDevices((prevDevices) => [
                ...prevDevices,
                newDevice,
            ]);

            resetDevice();
            setShowModal(false);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={showModal}
            onHide={() => {
                resetDevice();
                setShowModal(false);
            }}
        >

            <Modal.Header closeButton>
                <Modal.Title>
                    Add Device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>

                    {/* Device Name */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            Device Name
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter device name"
                            value={device.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>

                    </Form.Group>


                    {/* IP Address */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            IP Address
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="ip"
                            placeholder="192.168.1.10"
                            value={device.ip}
                            onChange={handleChange}
                            isInvalid={!!errors.ip}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.ip}
                        </Form.Control.Feedback>

                    </Form.Group>


                    {/* MAC Address */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            MAC Address
                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="mac"
                            placeholder="00:1A:2B:3C:4D:5E"
                            value={device.mac}
                            onChange={handleChange}
                            isInvalid={!!errors.mac}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.mac}
                        </Form.Control.Feedback>

                    </Form.Group>


                    {/* Device Type */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            Device Type
                        </Form.Label>

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


                    {/* Status */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            Status
                        </Form.Label>

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
                    onClick={() => {
                        resetDevice();
                        setShowModal(false);
                    }}
                >
                    Close
                </Button>

                <Button
                    variant="primary"
                    onClick={handleSave}
                >
                    Save Device
                </Button>

            </Modal.Footer>

        </Modal>
    );
}

