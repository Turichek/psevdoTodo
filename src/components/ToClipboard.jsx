import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseAlertAction } from "../store/alertReducer";
import { addJsonAction } from "../store/jsonDataReducer";

export default function ToClipboard() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list.elems);
    const json = useSelector(state => state.json.str)

    function inClipboard() {
        if (list.length !== 0) {
            navigator.clipboard.writeText(json);
            dispatch(openCloseAlertAction({ open: true, text: 'Список добавлен в буфер обмена', severity: 'success' }));
        }
        else{
            dispatch(openCloseAlertAction({ open: true, text: 'Список пуст', severity: 'error' }));
        }
    }

    function addInfoToClipboard() {
        dispatch(addJsonAction(JSON.stringify(list)));
    }

    return (
        <Button sx={{ width: 1 }} onMouseEnter={addInfoToClipboard} onClick={inClipboard} variant='contained'>To Clipboard</Button>
    )
}