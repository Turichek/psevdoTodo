import { Box } from "@mui/material";
import React from "react";
import ViewItemsList from "./ViewItemsList";

export default function ViewTodo({ mainListId }) {
    return (
        <>
            <Box sx={{m:1, pt:1}}>Ваш список:</Box>
            <ViewItemsList parent={mainListId} />
        </>
    )
}