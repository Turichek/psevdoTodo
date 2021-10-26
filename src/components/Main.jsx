import { Box } from "@mui/material";
import React from "react";
import ToPDF from "./ToPDF";
import ToClipboard from "./ToClipboard";
import FromJson from "./FromJson";
import ViewTodo from "./ViewTodo";
import { useSelector } from "react-redux";
import Notification from "./Notification";

export default function Main() {
    const mainListId = useSelector(state=>state.mainListId.value);

    return (
        <Box>
            <Box>
                <ToPDF />
                <ToClipboard />
                <FromJson />
            </Box>
            <Box>
                <ViewTodo mainListId={mainListId} />
            </Box>
            <Notification />
        </Box>
    )
}