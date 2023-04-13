import React,{useContext} from 'react';
import "./Left.css";
import { GlobalContext } from "../../context";

const Srearch = () => {
    const { setSearch } = useContext(GlobalContext);
  
    return (<div id="search-left" className="p-2 d-flex justify-content-center align-items-center">
            <input id="input" type="text" onChange={(e)=>setSearch(e.target.value)} className="form-control rounded p-2" placeholder="Search or start new chat" />
        </div>
    )
}

export default Srearch;
