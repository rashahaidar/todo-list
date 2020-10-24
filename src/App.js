import React from 'react';
import TodoListInput from './Components/TodoListInput/TodoListInput'
import { Header,Container } from 'semantic-ui-react'
import TodoList from './Components/TodoList/TodoList.js'
import classes from './App.css'
import DisplayMessage from './Components/DisplayMessage'
import { useSelector } from 'react-redux'


const App = () => {
  const state = useSelector(s => s)
  const filterCompleted = state.todoList.filter(item => item.completed)
  let message = filterCompleted.length === state.completedTaskToShowTheMessage ? <DisplayMessage></DisplayMessage> : null

  return (
    <div>
      <Header as='h2' >
        <div className='appheader'>
          TODO LIST
        </div>
      </Header>
      <Container>
        {message}
        <TodoListInput></TodoListInput>
        <TodoList></TodoList>
      </Container>
    </div>
  );
}


export default App;
