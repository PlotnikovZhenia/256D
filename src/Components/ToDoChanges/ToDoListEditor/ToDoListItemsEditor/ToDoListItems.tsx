
interface IToDoListItems{
    items:any
}
const ToDoListItems=({items}:IToDoListItems)=>{
        const{item,done}=items;
        let classDone='';
        if(done){
            classDone='itemDone';
        } else {
            classDone='';
            }
        return(
            <>
                <li className={classDone}>
                    {item}
                </li>
            </>
        )
}
export default ToDoListItems;