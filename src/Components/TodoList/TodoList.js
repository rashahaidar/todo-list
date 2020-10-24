import React, { useState } from 'react';
import {Icon, Input, Card } from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'


const TodoList=()=>{
      
       const todo=useSelector(s=>s)
       const[id,setId]=useState('')
       const dispatch=useDispatch();
       const[newTodo,setNewTodo]=useState('')
       const[todoValidation,setTodoValidation]= useState(true);
       const[counter,setCounter]=useState(0)
       const updateTaskHandler=(id,label, itemIndex)=>{
              setId(id)
              setNewTodo(label);
              debugger;
              setTimeout(() => {
                     document.getElementById('todoLabel' + itemIndex).focus();                     
              }, 250);
       }

       const deleteTaskHandler=(id)=> dispatch({
                           type:'Delete',
                           id: id
                     }
              )
       const closeEditHandler=()=>{
              setId('')
              setNewTodo('')
              setTodoValidation(true)
       }
       
       const inputChangeHandler=(event)=>{
              setNewTodo(event.target.value)
              if(!event.target.value){
                     setTodoValidation(true)
              }
              else{
                     setTodoValidation(false)
              }
       }
       const submitEditHandler=(id)=>{
       dispatch({
              type:'Edit',
              payload:{
                     label:newTodo,
                      id:id,
                     }
               }
       )
       setId('')
       setNewTodo('')
       setTodoValidation(true)
}
const completeTaskHandler=(todo)=>{
       dispatch(
              {
                     type: 'ChangeToDoStatus',
                     payload: {
                            id: todo.id,
                            
                     }
              }
       )
       setId('')
       setNewTodo('')
       setTodoValidation(true)
       setCounter(counter+1)
}
       


    let list=null;
       if(todo.todoList && todo.todoList.length){
             list=todo.todoList.map((todo, index)=>{
                     let color = "yellow";
                     let cardBackground = { background: "white" };
                     let taskComplete = { textDecoration: "none" };
                     if (todo.completed) {
                            color = "green";
                            cardBackground.background = "beige";
                            taskComplete["textDecoration"] = "line-through";
                     }
                     return(
                     
                            <Card key={todo.id} color={color} fluid style={cardBackground}>
                                   <Card.Content>
                                          <Card.Header textAlign="left"style={taskComplete} >
                                                 {id && todo.id===id?
                                                 <Input type='text' id={'todoLabel' + index}  transparent action fluid   value={newTodo} onChange={inputChangeHandler}></Input>
                                                 :<div style={{ wordWrap: "break-word" }}>{todo.label}</div>
                                                 }
                                   
                                          
                                                 
                                          </Card.Header>
                                          {id && todo.id===id ?
                                          <Card.Meta textAlign="right">
                                          <Icon
                                          disabled={todoValidation}
                                          link
                                          name="check"
                                          color="green"
                                          onClick={()=>submitEditHandler(todo.id)}
                                          />
                                          <span style={{ paddingRight: 10 }}>Update</span>
                                          <Icon
                                          link
                                          name="close"
                                          color="black"
                                          onClick={() =>closeEditHandler()}
                                          />
                                          <span style={{ paddingRight: 10 }}>Close</span>
                                           </Card.Meta>
                                            :
                                           <Card.Meta textAlign="right">
                                           <Icon
                                           link
                                           name="pencil alternate"
                                           color="blue"
                                           onClick={() => updateTaskHandler(todo.id,todo.label, index)}
                                           />
                                           <span style={{ paddingRight: 10 }}>Edit</span>

                                           <Icon
                                           link
                                           name="check"
                                           color="green"
                                           onClick={() => completeTaskHandler(todo)}
                                           />
                                           <span style={{ paddingRight: 10 }}>Done</span>
                                           <Icon
                                           link
                                           name="trash"
                                           color="red"
                                           onClick={() =>deleteTaskHandler(todo.id)}
                                           />
                                           <span style={{ paddingRight: 10 }}>Delete</span>
                                     </Card.Meta>
                             
                                          }
                                          </Card.Content> 
                            </Card>
                           // }
                  // </>
                     )
              })
             








              
              // <List relaxed>
              // {todo.todoList.map((todo)=>
              
              // <List.Item key={todo.id}>
              // {id && id===todo.id ?
              //  <Input type='text' action fluid onChange={inputChangeHandler}  value={newTodo} ><input />
              //  <Button icon onClick={()=>submitEditHandler(todo.id)}><Icon name='check' ></Icon></Button>
              //  <Button icon onClick={()=>closeEditHandler()}><Icon name='close' ></Icon></Button>
              //  </Input>:
              //  <>
               
              // <Segment color='pink' textAlign='left'>
              //  {todo.label}
              // </Segment>
              // <Button  icon='trash'  onClick={()=>deleteHandler(todo.id)} ></Button>
              // <Button icon='pencil alternate'  onClick={()=>handleUpdate(todo.id,todo.label)} ></Button></>}
              // </List.Item>
               
              // )}
              //  </List>
       
       }
       
       
return(
      <div>
       <Card.Group>
       {list}
       </Card.Group>
       
       
       
       </div>

);




     }


export default TodoList;