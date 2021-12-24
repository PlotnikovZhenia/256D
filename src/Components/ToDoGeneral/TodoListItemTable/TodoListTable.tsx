import { useState } from "react";
import { Link } from "react-router-dom";
import './TodoListItemTable.scss';
import './Show.svg';
import './change.svg';

interface IToDo{
    title:string,
    label:any[],
    onchangeToDoList:()=>void
}
const TodoListTable=({title,label,onchangeToDoList,}:IToDo)=>{
    const [shomList,setShowList]=useState(false)
    const labelElements=label.map((element)=>{
        const{id,item,done}=element;
        let classDone='';
        if(done){
            classDone='itemDone';
        } else {
            classDone='';
            }
        return(
        <li className={classDone} key={id}>{item}</li>
        )
    })
    let classNameShow='';
    if(shomList){
        classNameShow='labelShowing';
    } else {
        classNameShow='labelUnShowing';
    }
    return(
        <>
            <div className="todoItemList">
                <h2>{title}</h2>
                <div>
                    <input onClick={()=>setShowList(!shomList)} type="image" name="imageFirst" src="Show.svg" alt="Show"></input>
                    <Link to="/changeMenu"onClick={onchangeToDoList}><img className="linkChange" src="change.svg" alt="Change"/></Link>
                </div>
            </div>
            <div className={classNameShow}>
                <ul>
                    {labelElements}
                </ul>
            </div>
        </>
    )
}
export default TodoListTable;