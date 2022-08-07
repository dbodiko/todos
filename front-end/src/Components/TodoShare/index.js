import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {useEffect, useState} from "react";
import TodoSharedWithItem from "../TodoSharedWithList";


const TodoShare = ({show, handleClose, id, handleSave, text, sharedWith}) => {

    const handleShare = () => {
        console.log(sharedWith)
        //handleSave({sharedWith: sharedWithId, id})
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
                               // onChange={onChangeSharedId}
                                //defaultValue={sharedWithId}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <h5>Users for whom the todo is distributed</h5>

                            {sharedWith?.length > 0 && sharedWith.map((user) => (
                                <TodoSharedWithItem key={user.id} {...user}/>
                            ))}

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