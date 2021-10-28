import { TextField } from "@mui/material";
import React from "react";

export default function EditorField() {
    return (
        <TextField sx={{ width: 1, height: 1 }}
            multiline variant='outlined'
        />
    )
}