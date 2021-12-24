import ToDoListEditor from './ToDoListEditor/ToDoListEditor';
import NothingToChange from './NothingToChange/NothingToChange';
import './ToDoChanges.scss';
import { useState } from 'react';

interface IToDoChanges{
    todoDataForChange:any[],
    onDeleted:(id:number)=>void,
    changeDone:(id:number,done:boolean)=>void
}
const ToDoChanges=({todoDataForChange,changeDone, onDeleted}:IToDoChanges)=>{
    const elements=todoDataForChange.map((item)=>{
        const { id, ...itemProps  } = item;
        return (
            <ToDoListEditor {...itemProps} key={id} changeDone={changeDone} onDeleted={()=>onDeleted(id)}/>
        );
    })
    return(
        <>
            <h1 style={{textAlign:'center'}}>Welcome to the page of changes</h1>
            <div className="todoBlocks">
                {todoDataForChange.length?elements:<NothingToChange/>}
            </div>
        </>
    )
}
export default ToDoChanges;
