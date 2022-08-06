import {Button, Modal, Toast} from "react-bootstrap";
import {useEffect, useState} from "react";
import TodoItem from "../TodoItem";
import useApi from "../../hooks/useApi";


const UserTodos = ({show , handleClose}) => {


    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Todos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserTodos