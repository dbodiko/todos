import { useEffect, useState } from "react";
import {Modal} from "react-bootstrap";
import "./style.css"


const UserEdit =({show, id, firstName, lastName, email, dateOfBirth, handleClose, handleSave}) => {
    useEffect(() => {
        setNewUserName(firstName);
        setNewUserLastName(lastName);
        setNewUserEmail(email);
        setNewUserBirthDay(dateOfBirth);
    }, [firstName, lastName, email, dateOfBirth]);


    const [newUserName, setNewUserName] = useState("");
    const [newUserLastName, setNewUserLastName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserBirthDay, setNewUserBirthDay] = useState("");

    const [form, setForm] = useState({
        password: undefined,
        confirmPassword: undefined,
    });

    const validateForm = () => {
        return (
            Object.values(form).some((item) => !item) ||
            form.password !== form.confirmPassword
        );
    };

    const onChangeFormValue = (key, e) => {
        setForm({ ...form, [key]: e.target.value });
    };

    const onChangeName = (e) => {
        setNewUserName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setNewUserLastName(e.target.value)
    }


    const onChangeEmail = (e) => {
        setNewUserEmail(e.target.value);
    }

    const onChangeBirthDay = (e) => {
        setNewUserBirthDay(e.target.value)
    }

    const handleSubmit = () => {
        handleSave({firstName: newUserName, lastName: newUserLastName, email: newUserEmail, dateOfBirth: newUserBirthDay, id});
        setForm("")
    };


    return (
        <div className="edit-user-form">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="edit-user-form__input-wrapper">
                        <label className="edit-user-form__input-label" htmlFor="title">
                            First name:
                        </label>
                        <input
                            placeholder="First name"
                            className="edit-user-form__input"
                            id="text"
                            type="text"
                            defaultValue={newUserName}
                            onChange={onChangeName}
                        />
                    </div>
                    <div className="edit-user-form__input-wrapper">
                        <label className="edit-user-form__input-label" htmlFor="title">
                            Last name:
                        </label>
                        <input
                            placeholder="Last name"
                            className="edit-user-form__input"
                            id="text"
                            type="text"
                            defaultValue={newUserLastName}
                            onChange={onChangeLastName}
                        />
                    </div>
                    <div className="edit-user-form__input-wrapper">
                        <label className="edit-user-form__input-label" htmlFor="title">
                            Email:
                        </label>
                        <input
                            placeholder="name@email.com"
                            className="edit-user-form__input"
                            id="text"
                            type="text"
                            defaultValue={newUserEmail}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className="edit-user-form__input-wrapper">
                        <label className="edit-user-form__input-label" htmlFor="title">
                            Password:
                        </label>
                        <input
                            placeholder="password"
                            className="edit-user-form__input"
                            id="text"
                            type="text"
                            defaultValue={form.password}
                            onChange={(e) => onChangeFormValue("password", e)}

                        />
                    </div>
                    <div className="edit-user-form__input-wrapper">
                        <label className="edit-user-form__input-label" htmlFor="title">
                            Confirm password:
                        </label>
                        <input
                            placeholder="confirm password"
                            className="edit-user-form__input"
                            id="text"
                            type="text"
                            value={form.confirmPassword}
                            onChange={(e) => onChangeFormValue("confirmPassword", e)}
                        />
                    </div>
                    <div className="edit-user-form__input-wrapper">
                        <label className="edit-user-form__input-label" htmlFor="title">
                            Date of birthday:
                        </label>
                        <input
                            placeholder="date of birthday"
                            className="edit-user-form__input"
                            id="text"
                            type="text"
                            defaultValue={newUserBirthDay}
                            onChange={onChangeBirthDay}
                        />
                    </div>
                    <input
                        className="list-item__checkbox"
                        type="checkbox"
                    />
                    <label className="list-item__checkbox-name"><h6>is Admin</h6></label>


                </Modal.Body>
                <Modal.Footer>
                    <div className="edit-user-form__btns-wrapper">
                        <button
                            onClick={handleClose}
                            className="edit-user-form__submit-btn"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={validateForm()}
                            onClick={handleSubmit}
                            className="edit-todo-form__submit-btn"
                        >
                            Save
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserEdit