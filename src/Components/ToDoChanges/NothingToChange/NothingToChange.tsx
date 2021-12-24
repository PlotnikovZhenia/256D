import React from "react";
import {Link} from "react-router-dom"
import './NothingToChange.scss';

const NothingToChange:React.FC=()=>{
    return(
        <div className="nothingToDo">
            <h2>You have not got ToDoList to change now!</h2>
            <h3>
                Firstly, you should choose ToDoList. So we recommended you to return to the list !
            </h3>
           <Link to="/"><button>Back to main page</button></Link>
        </div>
    )
}
export default NothingToChange;