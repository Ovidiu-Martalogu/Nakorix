import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function DeleteDeviceModal({
    showDeleteModal,
    setShowDeleteModal,
    device,
    setDevices
}) {

    const handleDelete = () => {
        setDevices((prevDevices) =>
            prevDevices.filter((item) => item.id !== device.id)
        );

        setShowDeleteModal(false);
    };

    return (
        <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Device Name</Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.name || ""}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>IP Address</Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.ip || ""}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>MAC Address</Form.Label>

                        <Form.Control
                            type="text"
                            value={device?.mac || ""}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>

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
                    onClick={() => setShowDeleteModal(false)}
                >
                    Close
                </Button>

                <Button
                    variant="danger"
                    onClick={handleDelete}
                >
                    Delete
                </Button>

            </Modal.Footer>

        </Modal>
    );
}