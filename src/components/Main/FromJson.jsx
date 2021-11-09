import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { openCloseModalAction } from "../../store/Modal/actions";

export default function FromJson() {
    const dispath = useDispatch();

    return (
        <Button sx={{ width: 1 }} onClick={() => dispath(openCloseModalAction({ open: true, text: 'Введите json для преобразования в список' }))} variant='contained'>Import List</Button>
    )
}