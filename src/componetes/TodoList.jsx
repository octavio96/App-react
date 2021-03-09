import React, { Component } from 'react'
import axios from 'axios'

export default class TodoList extends Component {

    constructor(props){
        super(props)
        this.state = {
            todos: [],
            newTodo:""
        }
    }

    componentDidMount(){
        //ir a por loos datos
        axios.get("http://localhost:8000/todos").then(
            res => {
                console.log(res.data)
                this.setState({
                    todos:res.data
                });

            }
        ).catch(
            res => console.error(res)
        )
        //actualizar el estado con los datos que nos hemos traido
    }

    onBtnClicked = () => {
        //crea nuevo tpdo objeto

        const newTodoObject = {
        "title": this.state.newTodo,
        "author": "tucas",
        "done": false
        };
        axios
            .post("http://localhost:8000/todos", newTodoObject)
            .then(
               res => this.setState({
                    todos: [...this.state.todos, res.data],
                }) 
            ).catch(err => console.error(err))

            // enviarlo por post al servidor
        };
   
    onChangeInput = (e) => {
        this.setState({
            newTodo: e.target.value.toUpperCase()
        });
    }

    borrarElemento = (id) => {
        axios.delete(`http://localhost:8000/todos/${id}`).then(
            this.setState({
                 todos:this.state.todos.filter(i =>i.id !== id)
             }) 
         ).catch(err => console.error(err))

         // enviarlo por post al servidor
     
    }
 
    render() {
        return (
            <div className="todo-list">
                <ul>
                    { 
                        this.state.todos.map(
                            i => <li key={i.id}>{i.title}<button onClick={() =>this.borrarElemento(i.id)}>Borrar</button></li>
                        ) 
                    }
                </ul>
                <input type="text" onChange={e => this.onChangeInput(e)} value={this.state.newTodo}></input>   
                <button onClick={()=>this.onBtnClicked()}>Grabar</button>
            </div>
        )
    }
}
