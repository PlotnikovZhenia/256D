import TodoListItemTable from './TodoListItemTable/TodoListTable';
import AddNewItem from './AddNewItem/AddNewItem';
import './ToDoGeneral.scss';

interface IToDoGeneral{
    todoData:any[],
    pushAll:(newTitle:string,arr:string[])=>void,
    onchangeToDoList:(id:number)=>void,
    onDeleted:(id:number)=>void
}
const ToDoGeneral=({todoData, onchangeToDoList, onDeleted, pushAll}:IToDoGeneral)=>{
    const elements=todoData.map((item)=>{
        const { id, ...itemProps  } = item;
        return (
            <TodoListItemTable {...itemProps} key={id} onchangeToDoList={()=>onchangeToDoList(id)} onDeleted={()=>onDeleted(id)}/>
        );
    })
    return(
        <div className="todoAPI">
            <div>
                <AddNewItem pushAll={pushAll}/>
            </div>
            <div className="todoBlocks">
                {todoData.length?elements:<h3 style={{padding:'20px',color:'#d5e2eb'}}>Sorry, you have not got any ToDoLists now. If you want, you can create it !</h3>}
            </div>
        </div>
    )
}
export default ToDoGeneral;
