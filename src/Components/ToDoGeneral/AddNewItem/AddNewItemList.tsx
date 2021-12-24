import {useState} from'react';
import './AddNewItemList.scss';

interface IAddTitle {
    addListToTitle:(text:string[])=>void,
    restart:()=>void,
    windowAddPush:()=>void
  }

const AddNewItemList=({addListToTitle,restart,windowAddPush}:IAddTitle)=>{
    const [textItemList,setTextItemList]=useState<any[]>([]);
    const [textItem,setTextItem]=useState('');
    const [checked, setChecked] = useState(false); 
    const textItemInput=(event:  { target: HTMLInputElement; })=>{
        setTextItem(event.target.value);
    }
    const pushItemInList=()=>{
        console.log(checked)
    if(textItem){
        let itemNew={
            id:Date.now(),
            item:textItem,
            done:checked
        }
        setTextItemList([...textItemList,itemNew]);
        setTextItem('');
        }
    }
    const pushAllDone=()=>{
        if(textItemList.length===0&&textItem){
            let itemNew={
                id:Date.now(),
                item:textItem,
                done:checked
            }
            addListToTitle([...textItemList,itemNew]);
            windowAddPush();
        }else if(textItemList.length&&textItem){
            let itemNew={
                id:Date.now(),
                item:textItem,
                done:checked
            }
            addListToTitle([...textItemList,itemNew]);
            windowAddPush();
        }else if(textItemList.length){
            addListToTitle(textItemList);
            windowAddPush();
        }
    }
    const doneChange=()=>{ 
        setChecked(!checked); 
      }; 
    return(
    <>
            <div>
                <p>Make your item</p>
                <div className="labelNavbar">
                    <input type="text" value={textItem} placeholder="добавить" onChange={textItemInput}/>
                    <label>Done<input type="checkbox" name="doneList"  onChange={doneChange}/></label>
                </div>
                <div className="buttonNavbar">
                    <button onClick={pushItemInList} >
                        Next Item
                    </button>
                    <button onClick={pushAllDone} >
                        All done
                    </button>
                    <button onClick={restart}>
                        Cancel
                    </button>
                </div>
            </div>
    </>
    )
}
export default AddNewItemList;