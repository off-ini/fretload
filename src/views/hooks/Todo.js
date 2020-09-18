import React, { Component } from 'react';
import TodoForm from './todo/TodoForm';
import TodoItem from './todo/TodoItem';

class Todo extends Component {
    constructor()
    {
        super();
        this.state = {
            todos:[]
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
    }

    handleTodoAdd = (todo) => {
        let updateTodos = this.state.todos;
            updateTodos.push(todo);
        this.setState({todo:updateTodos});
    }

    handleDelete = (id) => {
        let updateTodos = this.state.todos;
        const index = updateTodos.findIndex(todo => todo.id === id);
        updateTodos.splice(index, 1);
        this.setState({todo:updateTodos});
    }
    
    render()
    {
        return (
            <div style={{marginLeft:'20px'}}>
               <h1> {this.state.todos.length} To - Do</h1>
                <ul>
                    {
                        this.state.todos.map((todo) =>{
                            return(
                                <>
                                    <TodoItem key={todo.id} todo={todo} handleDelete={this.handleDelete} />
                                </>
                            )
                        })
                    }
                </ul> 
                <TodoForm handleTodoAdd={this.handleTodoAdd} />
            </div>
        );
    }
}

export default Todo;
