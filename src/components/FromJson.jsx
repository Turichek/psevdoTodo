import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJsonAction } from "../store/jsonDataReducer";
import { updateListAction } from "../store/listReducer";
import { addMainListIdAction } from "../store/mainListIdReducer";

export default function FromJson() {
    const dispath = useDispatch();
    const list = useSelector(state => state.list.elems);
    const json = useSelector(state => state.json.str);
    const mainListId = useSelector(state=>state.mainListId.value);

    const toList = (import_json) =>{
        dispath(addJsonAction(import_json));
        dispath(updateListAction(JSON.parse(import_json)));
    }

    useEffect(()=>{
        if(list.length !== 0){
            dispath(addMainListIdAction(list[0].parent));
        }
    })

    return (
        <Button onClick={() => toList(prompt().replace(/\n/g,'').replace(/-/gm,''))} variant='contained'>Import List</Button>
    )
}