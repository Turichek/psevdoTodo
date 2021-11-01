import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPsevdoCodeAction } from "../store/psevdoCodeReducer";

export default function EditorField() {
    const dispatch = useDispatch();
    const psevdo = useSelector(state => state.psevdo.text)
    const [text, setText] = useState('');

    const EditText = (e) =>{
        setText(e.target.value);
        dispatch(addPsevdoCodeAction(text));
    }

    return (
        <TextField sx={{ width: 1, height: 1 }}
            multiline variant='outlined'
            onChange={(e) => EditText(e)} value={text}
        />
    )
}