import React from "react";
import { Box } from "@mui/material";
import ViewItemsList from "./ViewItemsList";

export default function Sublist({ parentId }) {
    return (
        <Box sx={{width:1}}>
            <ViewItemsList parent={parentId} />
        </Box>
    )
}