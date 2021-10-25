import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function ToClipboard() {
    const json = useSelector(state => state.json.str)

    function inClipboard(){
        navigator.clipboard.writeText(json)
        alert('Текст скопирован в буфер обмена')
    }

    return (
        <Button onClick={inClipboard} variant='contained'>To Clipboard</Button>
    )
}