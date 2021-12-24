import { Link } from 'react-router-dom';
import './ToDoListEditor.scss';
import { useState } from 'react';

interface IToDo{
    title:string,
    label:any[],
    pushTitleChanged:(text:string)=>void,
    saveChangesAll:()=>void,
    changeRestart:()=>void,
    onDeleted:()=>void,
    changeText:(id:number,permitTextChange:boolean)=>void,
    changeTitleInLabel:(id:number,text:string)=>void,
    changeDone:(id:number,done:boolean)=>void,
    deleteThisItem:(id:number)=>void
}
const ToDoListEditor=({title,label,pushTitleChanged, saveChangesAll, changeRestart,changeTitleInLabel,changeText,onDeleted,changeDone,deleteThisItem}:IToDo)=>{
    const [onchangePermit, setOnchangePermit]=useState(false);
    const [windowDelete,setWindowDelete]=useState(false);
    const [titleNew,setTitleNew]=useState('');
    const [textNew,setTextNew]=useState('');
    const inputNewTitle=(event:  { target: HTMLInputElement; })=>{
        setTitleNew(event.target.value);
    }
    const inputNewItemList=(event:  { target: HTMLInputElement; })=>{
        setTextNew(event.target.value);
    }
    const pushNewTitleChanged=()=>{
        if(titleNew)
        pushTitleChanged(titleNew);
        setTitleNew('')
    }
    const pushNewTitle=(id:number)=>{
        changeTitleInLabel(id,textNew);
    }
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
        const{id,item,done,permitTextChange}=element;
        let classDone='';
        if(done){
            classDone='itemDone';
        } else {
            classDone='';
            }
        let classPermitEditor='';
            if(permitTextChange){
                classPermitEditor='itemTextPermit';
            } else {
                classPermitEditor='classNotPermitEditor';
                }
        return(
        <li className={classDone} key={id} >
            {item}
            <button onClick={()=>changeText(id,permitTextChange)}>Change text</button>
            <button onClick={()=>changeDone(id,done)}>Change done</button>
            <button  onClick={()=>deleteThisItem(id)}>Delete</button>
            <div className={classPermitEditor}>
                <input type="text" value={textNew} onChange={inputNewItemList} />
                <button onClick={()=>pushNewTitle(id)}>Push</button>
            </div>   
        </li>
        )
    })
    return(
        <>
            <div className="todoItemList">
                <h2>{title}</h2>
                <button onClick={()=>setOnchangePermit(!onchangePermit)}>Change text</button>
            </div>
            {onchangePermit?<div><input type="text" onChange={inputNewTitle} value={titleNew} className="titleChangeStyle"/><button onClick={pushNewTitleChanged} >OK</button></div>:null}
            <div className="labelShowing">
                <ul>
                    {labelElements}
                </ul>
                <hr/>
                <div className="editorButtons">
                    <Link to="/"><button onClick={saveChangesAll}>Save all</button></Link>
                    <button onClick={changeRestart}>Restart</button>
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