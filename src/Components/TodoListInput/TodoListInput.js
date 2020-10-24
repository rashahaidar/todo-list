import React, { useState,useRef } from 'react'
import { useDispatch} from 'react-redux'
import { Input,Form,Label } from 'semantic-ui-react'
import './TodoListInput.css'


const TodoListInput=(props)=>{
    const[newTodo,setNewTodo]=useState('')
    const[todoValidation,setTodoValidation]= useState(false);
    const inputEl = useRef(null);
    const dispatch=useDispatch();

    const handleClick=()=>{
        if(!newTodo) {
            inputEl.current.focus();
            setTodoValidation(true);
            return;
        }
        dispatch({
            type:'Add',
            payload:{
                label:newTodo,
                id:Math.ceil(Math.random()*100),
                completed:false  
            }
        })
       setNewTodo('')
       setTodoValidation(false)
       }
       const onChangeTodo=(event)=>{
        setNewTodo(event.target.value); 
        if(event.target.value) {
            setTodoValidation(false)
        }  
    }
   
    return(
        <div className='InputForm'>
            <Form>
                <Form.Field>
                   <Input ref={inputEl} className="todo-title" placeholder='New item'  value={newTodo} onChange={(event)=> {onChangeTodo(event)}} action={{onClick:handleClick, icon:'add', basic: true,color:'green'}}/>
                        {
                        todoValidation ?       
                            <Label basic color='red' pointing>
                                Please enter a value
                            </Label>
                        : null
                    }

                </Form.Field>
            </Form>
        {/* <Input  action={{onClick:handleClick,icon:'add'}} value={newTodo} onChange={handleInputChange}  /> */}
        </div>
        
    );

}

export default TodoListInput;