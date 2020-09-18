import React, {useState} from 'react';

const TodoForm = ({handleTodoAdd}) => {

    const [name, setName] = useState("");

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleSubmit = e =>
    {
        e.preventDefault();
        let id = new Date().getTime();
        handleTodoAdd({id:id, name:name});
        setName('');
    }

    return (
        <div>
            <input name="todo" type="text" onChange={handleChange} value={name} />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
}

export default TodoForm;
