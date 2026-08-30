

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function DeleteDeviceModal({
    showDeleteModal,
    setShowDeleteModal,
    device,
    setDevices
}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClose = () => {
        if (loading) {
            return;
        }

        setError("");
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {

        if (!device) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `http://127.0.0.1:8000/api/devices/${device.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete device");
            }

            setDevices((prevDevices) =>
                prevDevices.filter((item) => item.id !== device.id)
            );

            setLoading(false);
            setShowDeleteModal(false);

        } catch (error) {

            console.error(error);

            setError(
                "The device could not be deleted. Please try again."
            );

            setLoading(false);
        }
    };

    return (
        <Modal
            show={showDeleteModal}
            onHide={handleClose}
            backdrop={loading ? "static" : true}
            keyboard={!loading}
        >

            <Modal.Header closeButton={!loading}>
                <Modal.Title>
                    Delete Device
                </Modal.Title>
            </Modal.Header>


            <Modal.Body>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <Form>

                    {/* Device Name */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            Device Name
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.name || ""}
                            readOnly
                        />

                    </Form.Group>


                    {/* IP Address */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            IP Address
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.ip || ""}
                            readOnly
                        />

                    </Form.Group>


                    {/* MAC Address */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            MAC Address
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.mac || ""}
                            readOnly
                        />

                    </Form.Group>


                    {/* Status */}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            Status
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.status || ""}
                            readOnly
                        />

                    </Form.Group>

                </Form>

            </Modal.Body>


            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                    disabled={loading}
                >
                    Close
                </Button>

                <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>

            </Modal.Footer>

        </Modal>
    );
}

