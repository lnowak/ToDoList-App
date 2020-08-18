import React, {Component} from "react";
import ReactDOM from "react-dom";

class ToDoList extends Component {
    state = {
        tasks: [],
        newTask: '',
        editTask: ''
    }

    handleChange = e => {
        this.setState({
            newTask: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        
        if (this.state.newTask !== '') {
            const newTask = {
                id: this.state.tasks.length+1,
                name: this.state.newTask,
                done: false,
                edit: false
            };
            this.state.tasks.map(item => {
                if(newTask.id === item.id) {
                    return newTask.id += this.state.tasks.length;
                }
            })
            this.setState({
                tasks: [...this.state.tasks, newTask],
                newTask: ''
            })
        }
    }

    changeDone = e => {
        const id = Number(e.target.dataset.id);
        
        const newTasks = this.state.tasks.map(item => {
            if(item.id === id) {
                item.done = !item.done;
                item.edit = false;
            }
            return item;
        });

        this.setState({
            tasks: newTasks,
        })
    }

    clickEdit = e => {
        const id = Number(e.target.parentElement.dataset.id);
        const editTasks = this.state.tasks.map(item => {
            if(item.id === id) {
                item.edit = !item.edit
            }
            if(item.id !== id) {
                item.edit = false
            }
            return item;
        });

        this.setState({
            tasks: editTasks,
            editTask: ''
        });
    }

    editChange = e => {
        this.setState({
            editTask: e.target.value
        })
    }

    editSubmit = e => {
        e.preventDefault();
        const id = Number(e.target.dataset.id);
        
        if (this.state.editTask !== '') {
            const editTasks = this.state.tasks.map(item => {
                if (id === item.id) {
                    item.name = this.state.editTask,
                    item.edit = !item.edit
                }
                return item
            })

            this.setState({
                tasks: editTasks,
                editTask: ''
            })
        }
    }

    handleRemoveClick = e => {
        e.preventDefault();
        const id = Number(e.target.dataset.id);
        const newTasks = this.state.tasks.filter(item => {
            if (!item.done) {
               id !== item.id
               return item
            } 
            
        })

        this.setState({
            tasks: newTasks
        })
    }

    sessionCleared = e => {
        localStorage.clear();
        this.setState({
            tasks: []
        })
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            const data = JSON.parse(localStorage.getItem('user')).tasks;
            this.setState({
                tasks: [...data],
            })
        } 
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState))
        console.log(localStorage)
    }

    render() {
        let editInput;
        this.state.tasks.map(item => {
            if (item.edit === true) {
                editInput = (
                    <form key={item.id} onSubmit={this.editSubmit} data-id={item.id} className={item.edit ? '' : 'none', !item.done ? 'formActive' : 'none' }>
                        <input type='text' value={this.state.editTask } onChange={this.editChange} placeholder={item.name} />
                        <button className='btn-edit'>Zapisz</button>
                    </form>
                )
                return
            }
        })

        const list = this.state.tasks.map(
            task => (<li data-id={task.id} onClick={this.changeDone} key={task.id} className={task.done ? 'done' : 'listItems'}>
                {task.name}
                <button className={task.done ? 'none' : 'btn-edit'} onClick={this.clickEdit}>{task.edit ? 'Anuluj' : 'Edytuj'}</button>
                {task.edit ? editInput : null}
            </li>)
        );
        
        let liClass = '';
        this.state.tasks.length > 0 ? liClass='none' : liClass='visibleLi'

        return (
            <div className="toDoList">
                <button onClick={this.sessionCleared}>Wyczyść sesję</button>
                <form className="header" onSubmit={this.handleSubmit}>
                    <div className="headerTitle">
                        <h2>Lista zadań</h2>
                        <button onClick={this.handleRemoveClick} className='removeButton'>Usuń</button>
                    </div>
                    <div className="inputs">
                        <input type="text" value={this.state.newTask} placeholder="Wpisz zadanie do wykonania" onChange={this.handleChange}/>
                        <button className="btn-add">Dodaj</button>
                    </div>
                </form>
                <ul>
                    <p className={liClass}>Tutaj pojawi się Twoja lista zadań</p>
                    {list}
                </ul>
            </div>
        )
    }
}

const App = () => <ToDoList />
ReactDOM.render(<App />, document.getElementById("app"));