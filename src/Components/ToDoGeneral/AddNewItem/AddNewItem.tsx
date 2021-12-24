import React,{useState} from'react';
import'./AddNewItem.scss';
import AddTitle from './AddTitle';
import AddNewItemList from './AddNewItemList';

interface INewTodo{
    pushAll:(newTitle:string,arr:string[])=>void
}

const AddNewItem=({pushAll}:INewTodo)=>{
    const [newTitleBeforeConcat,setNewTitleBeforeConcat]=useState('');
    const [next,setTextNext]=useState<boolean>(true);
    const [shomAddList,setShowAddList]=useState(false);
    const [windowAddItem,setWindowAddItem]=useState(false);
    const pushItem=(newTitleText:string)=>{
        console.log(newTitleText)
        if(newTitleText){
            setTextNext(!next);
            setNewTitleBeforeConcat(newTitleText)
            }
        }
    const addListToTitle=(arr:string[])=>{
        setTextNext(!next);
        setShowAddList(false);
        pushAll(newTitleBeforeConcat,arr);
    }
    const restart=()=>{
        setTextNext(true);
    }
    const windowAddPush=()=>{
        setWindowAddItem(!windowAddItem);
    }
    let classNameShowAdd='';
    if(shomAddList){
        classNameShowAdd='AddShowing';
        } else {
        classNameShowAdd='AddUnShowing';
        }
    let classWindowAdd='';
    if(windowAddItem){
        console.log(windowAddItem)
        classWindowAdd='windowAddToDo';
        } else {
        console.log(windowAddItem)
        classWindowAdd='windowAddNone';
        }
    return(
    <>
        <div className="newTodo">
            <div className="addHeading">
                <h2>Add a new ToDoList</h2>                            
                <input className="addTodoImage" onClick={()=>setShowAddList(!shomAddList)} type="image" name="imageFourth" src="Show.svg" alt="AddShow"></input>
            </div>
            <div className={classNameShowAdd}>
                {next?<AddTitle pushItem={pushItem}/>:<AddNewItemList addListToTitle={addListToTitle} restart={restart} windowAddPush={windowAddPush}/>}
            </div>
            <div className={classWindowAdd}>
                    <h3>New ToDo was added !</h3>
                    <button onClick={windowAddPush}>OK</button>
            </div>
        </div>
    </>
    )
}


export default AddNewItem;