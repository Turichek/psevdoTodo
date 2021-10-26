import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseAlertAction } from "../store/alertReducer";
import { addJsonAction } from "../store/jsonDataReducer";
import { updateListAction } from "../store/listReducer";
import { addMainListIdAction } from "../store/mainListIdReducer";


export default function FromJson() {
    const dispath = useDispatch();
    const list = useSelector(state => state.list.elems);

    const toList = (import_json) => {
        if (import_json !== null) {
            const str = import_json.replace(/\n/g, '').replace(/-/gm, '');
            dispath(addJsonAction(str));
            if(str.charAt(0) === '['){
                dispath(updateListAction(JSON.parse(str)));
                dispath(openCloseAlertAction({ open: true, text: 'Список успешно добавлен', severity: 'success' }));
            }
            else {
                dispath(openCloseAlertAction({ open: true, text: 'Некорректная строка для преобразования в список', severity: 'error' }));
            }
        }
        else {
            dispath(openCloseAlertAction({ open: true, text: 'Список не был добавлен', severity: 'error' }));
        }
    }

    useEffect(() => {
        if (list.length !== 0) {
            dispath(addMainListIdAction(list[0].parent));
        }
    })

    return (
        <Button onClick={() => toList(prompt())} variant='contained'>Import List</Button>
    )
}