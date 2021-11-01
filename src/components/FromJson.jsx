import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMainListIdAction } from "../store/mainListIdReducer";
import { openCloseModalAction } from "../store/modalOpenReducer";

export default function FromJson() {
    const dispath = useDispatch();
    const list = useSelector(state => state.list);

    useEffect(() => {
        if (list.elems.length !== 0) {
            dispath(addMainListIdAction(list.elems[0].parent));
        }
    })

    return (
        <Button sx={{ width: 1 }} onClick={() => dispath(openCloseModalAction({ open: true, text: 'Введите json для преобразования в список' }))} variant='contained'>Import List</Button>
    )
}