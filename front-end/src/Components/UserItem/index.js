import "./style.css"

const UserItem = (props) => {
    const { firstName, lastName, id, handleEdit, handleDelete, handleShow} = props

    return (
        <div
            className="user-item"

        >
            <h6 className="user-item__name" onClick={handleShow}>{firstName} {lastName}</h6>

                <div className="user-item__btns-wrapper">
                    <i className="fa fa-pencil" onClick={() => handleEdit(id)}/>
                    <i className="fa fa-trash" onClick={() => handleDelete(id)}/>
                </div>
        </div>
    )
}

export default UserItem