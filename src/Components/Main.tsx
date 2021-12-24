import React, { useState,useEffect } from "react";
import ToDoGeneral from "./ToDoGeneral/ToDoGeneral";
import ToDoChanges from "./ToDoChanges/ToDoChanges";
import Error from './Error';
import { Routes,Route} from "react-router-dom";

interface IToDo{
    id:number
    title:string,
    label:any[]
}
//получение sessionStorage (сохранени инфы после перезагрузки)
function getSessionStorageOrDefault(key:string, defaultValue:any[]) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    }
    return JSON.parse(stored);
  }

const ToDoComponent:React.FC=()=>{
    const [todoData,setTodoDate]=useState<IToDo[]>(
        getSessionStorageOrDefault('terms', [
            {id:Date.now(), title:'React', label:[{id:Date.now()+1,item:'State',done:true,permitTextChange:false},{id:Date.now()+2,item:'Virtual Dom',done:true,permitTextChange:false},{id:Date.now()+3,item:'Fragment', done:false,permitTextChange:false},{id:Date.now()+4,item:'Context',done:false,permitTextChange:false},{id:Date.now()+5,item:'Props',done:false,permitTextChange:false}]}
        ])
        ); 
    useEffect(() => {
        sessionStorage.setItem('terms', JSON.stringify(todoData));
        }, [todoData]);
    const [todoDataForChange,setTodoDataForChange]=useState<IToDo[]>([]); 
    //добавляем ToDoList
    const pushAll=(newtitle:string,arr:any[])=>{
        let newTodolist={
            id:Date.now(),
            title:newtitle,
            label: arr
        }
        setTodoDate([...todoData,newTodolist])
    }
    //ф-я для работы с режимом изменений
    const onchangeToDoList=(id:number)=>{
        console.log(id);
        setTodoDataForChange(todoData.filter((el)=>el.id===id))
    }
    //ф-я сохранения всех изменений 
    const saveChangesAll=()=>{
        let concatArrayBefore=todoData.filter((el)=>el.id<todoDataForChange[0].id);
        let concatArrayAfter=todoData.filter((el)=>el.id>todoDataForChange[0].id);
        let newArray=concatArrayBefore.concat(todoDataForChange,concatArrayAfter);
        setTodoDate(newArray);
    }
    //ф-я возврата предыдущего ToDoList
    const changeRestart=()=>{
        setTodoDataForChange(todoData);
    }
    //удалить ToDoList
    const deleteItem=(id:number)=>{
        console.log(id)
        setTodoDate(todoData.filter((el)=>el.id!=id));
        setTodoDataForChange([])
    }
    //ф-я сохранения изменений заголовка ToDoList в режиме изминений
    const pushTitleChanged=(text:string)=>{
        let newTodolist:any={
            id:todoDataForChange[0].id,
            title:text,
            label: todoDataForChange[0].label,
        }
       setTodoDataForChange([newTodolist])
    }
    //ф-я для появления input с возможностью изменения заголовка пункта ToDoList в режиме изминений
    const changeText=(id:number,permitTextChange:boolean)=>{
        let searchLabel=todoDataForChange[0].label.filter((el)=>el.id===id);
        let newLabel={
            id:id,
            item:searchLabel[0].item,
            done:searchLabel[0].done,
            permitTextChange: !permitTextChange
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
    //ф-я изменения заголовка выбраного пункта ToDoList
    const changeTitleInLabel=(id:number,text:string)=>{
        let searchLabel=todoDataForChange[0].label.filter((el)=>el.id===id);
        let newLabel={
            id:id,
            item:text,
            done:searchLabel[0].done,
            permitTextChange: false
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
    //ф-я изменения статуса исполняемости пункта ToDoList
    const changeDone=(id:number,done:boolean)=>{
        let searchLabel=todoDataForChange[0].label.filter((el)=>el.id===id);
        let newLabel={
            id:id,
            item:searchLabel[0].item,
            done:!searchLabel[0].done,
            permitTextChange:false
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
    //ф-я удаления пункта ToDoList
    const deleteThisItem=(id:number)=>{
        let searchLabel=todoDataForChange[0].label.filter((el)=>el.id!=id);
        let newTodolist:any={
            id:todoDataForChange[0].id,
            title:todoDataForChange[0].title,
            label: searchLabel
        }
        setTodoDataForChange([newTodolist]);
    }
    return (
            <Routes>
                <Route path="/" element={<ToDoGeneral todoData={todoData} onchangeToDoList={onchangeToDoList} onDeleted={deleteItem} pushAll={pushAll}/>}/>
                <Route path="/changeMenu" element={<ToDoChanges todoDataForChange={todoDataForChange} saveChangesAll={saveChangesAll} changeRestart={changeRestart} pushTitleChanged={pushTitleChanged}  changeText={changeText} changeTitleInLabel={changeTitleInLabel} deleteThisItem={deleteThisItem} changeDone={changeDone} onDeleted={deleteItem}/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
    );
  }
  
  export default ToDoComponent;
  