import ListGroup from 'react-bootstrap/ListGroup';

const TodoSharedWithItem = ({firstName, lastName}) => {

    return (
        <div>
            <ListGroup>
                <ListGroup.Item>{firstName} {lastName}</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default TodoSharedWithItem
