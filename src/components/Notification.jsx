import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseAlertAction } from "../store/alertReducer";

export default function Notification() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(openCloseAlertAction({open: false, text: '', severity: 'info'}));
    };

    return (
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.severity} variant='filled' sx={{ width: '100%' }}>
                {alert.text}
            </Alert>
        </Snackbar>
    )
}