import { Box } from "@mui/material";
import React from "react";
import ToPDF from "./ToPDF";
import ToClipboard from "./ToClipboard";
import FromJson from "./FromJson";
import ViewList from "./ViewList";
import { useSelector } from "react-redux";

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
                <ViewList mainListId={mainListId} />
            </Box>
        </Box>
    )
}