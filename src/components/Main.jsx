import { Box } from "@mui/material";
import React from "react";
import ToPDF from "./ToPDF";
import ToClipboard from "./ToClipboard";
import FromJson from "./FromJson";

export default function Main(){



    return(
        <Box>
            <ToPDF/>
            <ToClipboard/>
            <FromJson/>
        </Box>
    )
}