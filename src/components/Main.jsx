import { Box, Paper,Grid } from "@mui/material";
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
            <Grid container spacing={1} columns={9}>
                <Grid item xl={3}>
                    <ToPDF />
                </Grid>
                <Grid item xl={3}>
                    <ToClipboard />
                </Grid>
                <Grid item xl={3}>
                    <FromJson />
                </Grid>
            </Grid>
            <Paper sx={{mt:3}} elevation={5}>
                <ViewTodo mainListId={mainListId} />
            </Paper>
            <Notification />
        </Box>
    )
}