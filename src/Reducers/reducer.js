
function loadState() {
        try {
            debugger;
        const state = localStorage.getItem('state');
        if(state !== null) {
            const newState = JSON.parse(state);
            return newState
        }        
    } catch(e) {
         console.log(e);
     }

    return {
        todoList: [],
        completedTaskToShowTheMessage: 2
    }  
} 
function saveNewTodo(newState) {
    // newState.counter = newState.todoList.length;
    localStorage.setItem('state', JSON.stringify(newState));
}
    
const reducer=(state=loadState(),action)=>{
    debugger;
    let newState = state;
    switch (action.type){
        case "Add" : 
            newState= {
                ...state,
                todoList:[...state.todoList, action.payload]
            };
        break;
        case "Delete":
            newState={
                ...state,
                todoList:state.todoList.filter((todo)=>todo.id!== action.id)
              
            };
        break;
        case "Edit":
            const find=state.todoList.find(todo=>todo.id===action.payload.id)
            const newItem={...find,label:action.payload.label}
            newState={
                ...state,
                todoList:state.todoList.map(todo=>todo.id!==action.payload.id ? todo : newItem)
                
            };
        break;
        case "ChangeToDoStatus": 
            newState = {
                ...state,
                todoList: state.todoList.map((todo)=> todo.id === action.payload.id ? { ...todo, completed: true} : todo)
                
            }
        break;
    }
    saveNewTodo(newState);
    return newState;

}

export default reducer;