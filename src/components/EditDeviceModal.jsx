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
    useEffect(() => {
        if (device) {
            setEditDevice(device);
        }
    }, [device]);

    const handleChange = (e) => {
        setEditDevice({
            ...editDevice,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        setDevices((prevDevices) =>
            prevDevices.map((item) =>
                item.id === editDevice.id
                    ? editDevice
                    : item
            )
        );

        setShowEditModal(false);
    };

    return (
        <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Device Name</Form.Label>

                        <Form.Control
                            type="text"
                            name="name"
                            value={editDevice.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>IP Address</Form.Label>

                        <Form.Control
                            type="text"
                            name="ip"
                            value={editDevice.ip}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>MAC Address</Form.Label>

                        <Form.Control
                            type="text"
                            name="mac"
                            value={editDevice.mac}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Device Type</Form.Label>

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

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>

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
                    onClick={() => setShowEditModal(false)}
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