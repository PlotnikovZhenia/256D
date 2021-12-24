import ToDoListEditor from './ToDoListEditor/ToDoListEditor';
import NothingToChange from './NothingToChange/NothingToChange';
import './ToDoChanges.scss';

interface IToDoChanges{
    todoDataForChange:any[],
    pushTitleChanged:(text:string)=>void,
    saveChangesAll:()=>void,
    changeRestart:(id:number)=>void,
    onDeleted:(id:number)=>void,
    changeText:(id:number,permitTextChange:boolean)=>void,
    changeTitleInLabel:(id:number,text:string)=>void,
    changeDone:(id:number,done:boolean)=>void,
    deleteThisItem:(id:number)=>void
}
const ToDoChanges=({todoDataForChange,pushTitleChanged, saveChangesAll, changeRestart, changeTitleInLabel,changeText,changeDone, deleteThisItem, onDeleted}:IToDoChanges)=>{
    const elements=todoDataForChange.map((item)=>{
        const { id, ...itemProps  } = item;
        return (
            <ToDoListEditor {...itemProps} key={id}changeText={changeText} saveChangesAll={saveChangesAll}  changeRestart={()=>changeRestart(id)} pushTitleChanged={pushTitleChanged} changeTitleInLabel={changeTitleInLabel}  changeDone={changeDone} deleteThisItem={deleteThisItem} onDeleted={()=>onDeleted(id)}/>
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
