import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState} from "react";

const TodoShare = ({show, handleClose, id, handleSave, text}) => {

    const [sharedWithId, setSharedWithId] = useState('62dc2aad8da52d8f912ddcb4')

    const onChangeEmail = (e) => {
        setSharedWithId(e.target.value)
    }

    const handleShare = () => {
        handleSave({sharedWith: sharedWithId, id})
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                onChange={onChangeEmail}
                                defaultValue={sharedWithId}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <h5>Users for whom the todo is distributed</h5>
                            <ListGroup>
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            </ListGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleShare}>
                        Share todo
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TodoShare