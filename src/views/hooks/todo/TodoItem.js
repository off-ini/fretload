import React from 'react';

const TodoItem = ({todo, handleDelete}) => {
    return (
        <li key={todo.id}>
            {todo.name}
            <button onClick={() => handleDelete(todo.id)}>x</button>
        </li>
    );
}

export default TodoItem;
