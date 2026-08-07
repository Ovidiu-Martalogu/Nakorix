

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AddDeviceModal({ showModal, setShowModal }) {

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
                Device form
            </Modal.Body>


            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </Button>

                <Button variant="primary">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}