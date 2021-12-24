import { Link } from 'react-router-dom';
import './ToDoListEditor.scss';
import { useState } from 'react';

interface IToDo{
    title:string,
    label:any[],
    onDeleted:()=>void,
    changeDone:(id:number,done:boolean)=>void
}
const ToDoListEditor=({title,label,onDeleted,changeDone}:IToDo)=>{
    const [onchangePermit, setOnchangePermit]=useState(false);
    const [windowDelete,setWindowDelete]=useState(false);
    const windowDeleteAnswer=()=>{
        setWindowDelete(!windowDelete);
    }
    let classWindowDelete='';
    if(windowDelete){
        classWindowDelete='windowDeleteToDo';
        } else {
        classWindowDelete='windowDeleteNone';
        }
    const labelElements=label.map((element)=>{
        const{id,item,done}=element;
        let classDone='';
        if(done){
            classDone='itemDone';
        } else {
            classDone='';
            }
        return(
        <li className={classDone} key={id} >
            {console.log(id)}
            {item}
            <button>Change text</button>
            <button onClick={()=>changeDone(id,done)}>Change done</button>
            <button>Delete</button>     
        </li>
        )
    })
    return(
        <>
            <div className="todoItemList">
                <h2>{title}</h2>
                <button onClick={()=>setOnchangePermit(!onchangePermit)}>Change text</button>
            </div>
            {onchangePermit?<div><input type="text" value={title} className="titleChangeStyle"/><button >OK</button></div>:null}
            <div className="labelShowing">
                <ul>
                    {labelElements}
                </ul>
                <hr/>
                <div className="editorButtons">
                    <button>Save all</button>
                    <button>Restart</button>
                    <Link to="/"><button>Cancel</button></Link>
                    <button onClick={windowDeleteAnswer}>Delete this ToDo</button>
                </div>
            </div>
            <div className={classWindowDelete}>
                    <h3>Are you sure to delete this ToDoList ? !</h3>
                    <button onClick={onDeleted}>Yes</button>
                    <button onClick={()=>setWindowDelete(!windowDelete)}>No</button>
            </div>
        </>
    )
}
export default ToDoListEditor;