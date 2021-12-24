import {useState} from'react';

interface IAddTitle {
    pushItem:(newTitleText:string)=>void
  }

const AddTitle=({pushItem}:IAddTitle)=>{
    const [textTitle,setTextTitle]=useState('');
    const textTitleInput=(event:  { target: HTMLInputElement; })=>{
        setTextTitle(event.target.value);
    }
    const pushTitle=()=>{
    if(textTitle){
        pushItem(textTitle);
    }
}
    return(
    <>
            <div>
                <p>Make your heading</p>
                <input type="text" value={textTitle} placeholder="добавить" onChange={textTitleInput}/>
                <button onClick={pushTitle} >
                    Next
                </button>
            </div>
    </>
    )
}
export default AddTitle;