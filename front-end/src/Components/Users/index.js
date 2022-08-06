import Pages from "../Pagination";

import "./style.css"
import {useEffect, useState} from "react";
import useNotifications from "../../hooks/useNotifications";
import useApi from "../../hooks/useApi";
import {Toast} from "react-bootstrap";
import UserEdit from "../UserEdit";
import UserItem from "../UserItem";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserCreate from "../UserCreate";
import UserTodos from "../UserTodos";



const LIMIT = 5

const Users = () => {
    const notifications = useNotifications();
    const api = useApi();

    const [users, setUsers] = useState({
        data: [],
        total: undefined,
        limit: undefined,
        page: undefined,
    });
    const [selectedUser, setSelectedUser] = useState(null)
    const [showUserTodos, setShowUserTodos] = useState(false)
    const [createUser, setCreateUser] = useState(false)
    const [showToast, setShowToast] = useState({ visibility: false, text: "" })
    const [inputText, setInputText] = useState("")

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async (page = 1) => {
        const usrs = await api.getAllUsers({limit: LIMIT, page: page - 1})
        setUsers(usrs)
    }

    const handleShow = () => setShowUserTodos(true);

    const handleClose = () => {
        setSelectedUser(null);
        setCreateUser(false)
        setShowUserTodos(false)
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteUser(id)
            getAllUsers()
            setShowToast({ visibility: true, text: "User successfully removed" })
        } catch (error) {
            setShowToast({ visibility: true, text: "Failed" });
            notifications.error({message: `User no delete`})
        }
    }

    const handleEdit = (id) => {
        setSelectedUser(users.data.find((user) => user.id === id))
    };

    const handleSave = async ({ id, firstName, lastName, email, dateOfBirth}) => {
        try {
            await api.updateUser(id, { firstName, lastName, email, dateOfBirth });
            getAllUsers();
            handleClose();
        } catch (error) {
            console.error(error);
            setShowToast({ visibility: true, text: "Failed" });
        }
        setShowToast({ visibility: true, text: "User successfully updated" });
    };

    const onChangePage = (page) => {
        if (page === users.page) return;
        getAllUsers(page);
    };

    const getPagesCount = () => {
        return Math.ceil(users.total / users.limit);
    };

    function search () {
        let textToSearch = inputText.length < 2 ? '' : inputText
        return users.data.filter(user => user.email.toLowerCase().includes(textToSearch))
    }


    return (
            <div className="user">
                <Button className="button_edit"
                        variant="primary"
                        onClick={() => setCreateUser(true)}
                >
                    Create User
                </Button>

                <UserCreate
                show={createUser}
                onHide={handleClose}
                handleClose={handleClose}
                />

                <UserTodos
                show={showUserTodos}
                handleClose={handleClose}/>

                <input type="text"
                       className="form-control search-input"
                       placeholder="Find user"
                       onChange={(e) => setInputText(e.target.value)}
                />
                <div>
                    {search().map((usr) => (
                        <UserItem
                            key={usr.id}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleShow={handleShow}
                            {...usr}/>
                    ))}
                </div>
                <Pages
                    onChange={onChangePage}
                    active={users.page}
                    pages={getPagesCount()}
                    maxButtons={3}
                />
                <UserEdit
                    show={selectedUser}
                    handleClose={handleClose}
                    {...selectedUser}
                    handleSave={handleSave}
                />

                <Toast
                    onClose={() => setShowToast({ visibility: false, text: "" })}
                    show={showToast.visibility}
                    delay={2000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">User</strong>
                    </Toast.Header>
                    <Toast.Body>{showToast.text}</Toast.Body>
                </Toast>
            </div>

        )

}

export default Users

