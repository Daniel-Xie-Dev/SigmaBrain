import React from 'react';
import { Modal, Button } from "react-bootstrap";

const deleteMsg = "Are you sure about deleting this/these quizzes? This action cannot be undo."

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, i}) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{deleteMsg}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(i) }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
 
export default DeleteConfirmation;
