import React, { useState } from "react";
import ToDoGeneral from "./ToDoGeneral/ToDoGeneral";
import ToDoChanges from "./ToDoChanges/ToDoChanges";
import Error from './Error';
import { Routes,Route} from "react-router-dom";

interface IToDo{
    id:number
    title:string,
    label:any[]
}

const ToDoComponent:React.FC=()=>{
    const [todoData,setTodoDate]=useState<IToDo[]>([
        {id:Date.now(), title:'React', label:[{id:Date.now()+1,item:'State',done:true},{id:Date.now()+2,item:'Virtual Dom',done:true},{id:Date.now()+3,item:'Fragment', done:false},{id:Date.now()+4,item:'Context',done:false},{id:Date.now()+5,item:'Props',done:false}]}
    ]); 
    const [todoDataForChange,setTodoDataForChange]=useState<IToDo[]>([]); 
    const pushAll=(newtitle:string,arr:any[])=>{
        let newTodolist={
            id:Date.now(),
            title:newtitle,
            label: arr
        }
        setTodoDate([...todoData,newTodolist])
    }
    const onchangeToDoList=(id:number)=>{
        console.log(id);
        setTodoDataForChange(todoData.filter((el)=>el.id===id))
    }
    const deleteItem=(id:number)=>{
        console.log(id)
        setTodoDate(todoData.filter((el)=>el.id!=id));
        setTodoDataForChange([])
    }
    const changeDone=(id:number,done:boolean)=>{
        let searchLabel=todoDataForChange[0].label.filter((el)=>el.id===id);
        let newLabel={
            id:id,
            item:searchLabel[0].item,
            done:!searchLabel[0].done
        }
        let concatLabelsBefore=todoDataForChange[0].label.filter((el)=>el.id<id);
        let concatLabelsAfter=todoDataForChange[0].label.filter((el)=>el.id>id);
        let newTodolist:any={
            id:todoDataForChange[0].id,
            title:todoDataForChange[0].title,
            label: [...concatLabelsBefore,newLabel,...concatLabelsAfter]
        }
        setTodoDataForChange([newTodolist]);
    }
    return (
            <Routes>
                <Route path="/" element={<ToDoGeneral todoData={todoData} onchangeToDoList={onchangeToDoList} onDeleted={deleteItem} pushAll={pushAll}/>}/>
                <Route path="/changeMenu" element={<ToDoChanges todoDataForChange={todoDataForChange} changeDone={changeDone} onDeleted={deleteItem}/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
    );
  }
  
  export default ToDoComponent;
  