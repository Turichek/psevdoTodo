import { Box } from "@mui/material";
import React from "react";

export default function MyContainer({children}){
    return(
        <Box sx={{mx: '13%', mt:'2%'}}>{children}</Box>
    )
}