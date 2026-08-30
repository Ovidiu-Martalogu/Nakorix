
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

export default function EditDeviceModal({
    showEditModal,
    setShowEditModal,
    device,
    setDevices
}) {

    const [editDevice, setEditDevice] = useState({
        name: "",
        ip: "",
        mac: "",
        type: "",
        status: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (device) {
            setEditDevice(device);
            setErrors({});
        }
    }, [device]);

    const handleChange = (e) => {
        setEditDevice({
            ...editDevice,
            [e.target.name]: e.target.value,
        });
    };

    const validateDevice = () => {
        const newErrors = {};

        // Validate name
        if (!editDevice.name.trim()) {
            newErrors.name = "Device name is required.";
        }

        // Validate IPv4
        const ipRegex =
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

        if (!ipRegex.test(editDevice.ip)) {
            newErrors.ip = "Please enter a valid IPv4 address.";
        }

        // Validate MAC address
        const macRegex =
            /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

        if (!macRegex.test(editDevice.mac)) {
            newErrors.mac = "Please enter a valid MAC address.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleClose = () => {
        if (device) {
            setEditDevice(device);
        }

        setErrors({});
        setShowEditModal(false);
    };

    const handleSave = async () => {

        if (!validateDevice()) {
            return;
        }

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/devices/${editDevice.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editDevice),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update device");
            }

            const updatedDevice = await response.json();

            setDevices((prevDevices) =>
                prevDevices.map((item) =>
                    item.id === updatedDevice.id
                        ? updatedDevice
                        : item
                )
            );

            setErrors({});
            setShowEditModal(false);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={showEditModal}
            onHide={handleClose}
        >

            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Device
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
                            value={editDevice.name}
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
                            value={editDevice.ip}
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
                            value={editDevice.mac}
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
                            value={editDevice.type}
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
                            value={editDevice.status}
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
                    onClick={handleClose}
                >
                    Close
                </Button>

                <Button
                    variant="primary"
                    onClick={handleSave}
                >
                    Save Changes
                </Button>

            </Modal.Footer>

        </Modal>
    );
}

