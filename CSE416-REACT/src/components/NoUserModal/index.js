import { Modal } from 'react-bootstrap/';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const NoUserModal = (props) => {
    const history = useHistory();
    return(
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
                {
                    props.continue ? 
                        <Modal.Header closeButton>
                            <Modal.Title>Before you start...</Modal.Title>
                        </Modal.Header>
                            :
                        <Modal.Header>
                            <Modal.Title>Before you start...</Modal.Title>
                        </Modal.Header>
                }
                <Modal.Body>
                    Join the community by logging into your SigmaBrain account!
                </Modal.Body>
                <Modal.Footer>
                <Button variant="info" onClick={() => history.push('/')}>
                    Go Home
                </Button>
                <Button variant="primary" onClick={() => history.push('/register')}>
                    No account?
                </Button>
                <Button variant="dark" onClick={() => history.push('/login')}>
                    Already have an account?
                </Button>
                </Modal.Footer>
            </Modal>
    )
}


export default NoUserModal;