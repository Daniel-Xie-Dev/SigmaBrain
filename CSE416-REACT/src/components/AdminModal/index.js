import React from 'react';
import { Modal, Button } from "react-bootstrap";


const AdminModal = ({ showModal, setModal, remove, block, confirm, msg}) => {
    return (
        <Modal show={showModal} onHide={()=>{setModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{msg}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={()=>{setModal(false)}}>
            Cancel
          </Button>
          {
              remove && <Button variant="danger" onClick={confirm}>
              Delete
            </Button>
          }

        {
            block && <Button variant="danger" onClick={confirm}>
              Block
            </Button>
          }

        </Modal.Footer>
      </Modal>
    )
}
 
export default AdminModal;