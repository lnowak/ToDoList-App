# ToDoList

## Project Name & Pitch

ToDoList App

An application used to create a simple To-Do List, built with React, JavaScript, and CSS.

Live Demo: https://lnowak.github.io/ToDoList-App/

## Project Status

Done

## Project Screen Shot

![ToDoList](https://user-images.githubusercontent.com/51715910/91836377-fb88c100-ec4a-11ea-9696-bd520b82484b.png)

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your device.

Installation:

`npm install`

To Start Server:

`npm start`

To Visit App:

`localhost:3001`

## Documentation

Function handling inputs changes.

```javascript
handleChange = e => {
        this.setState({
            newTask: e.target.value
        })
    }
```

Function handling form submits.

```javascript
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
```

Function handling created list items done.

```javascript
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
```

Function making new items editable.

```javascript
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
```

Function handling new items inputs changes.

```javascript
editChange = e => {
        this.setState({
            editTask: e.target.value
        })
    }
```

Function handling edit-form submits.

```javascript
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
```

Function handling new items remove from the list.

```javascript
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
```

Function clearing all list items.

```javascript
    sessionCleared = e => {
        localStorage.clear();
        this.setState({
            tasks: []
        })
    }
```

Component life cycles updating state in local storage.

```javascript
    componentDidMount() {
        if (localStorage.getItem('user')) {
            const data = JSON.parse(localStorage.getItem('user')).tasks;
            this.setState({
                tasks: [...data],
            });
        } 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            localStorage.setItem('user', JSON.stringify(this.state));
        }
    }
```