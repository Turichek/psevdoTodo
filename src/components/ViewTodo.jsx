import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseModalAction } from "../store/modalOpenReducer";
import ViewItemsList from "./ViewItemsList";

export default function ViewTodo({ mainListId }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);

    return (
        <>
            {
                list.name === '' ?
                    <Button onClick={() => dispatch(openCloseModalAction({ open: true, text: 'Введите название списка', parent: -1 }))}
                    sx={{ m: 1, pt: 1 }} variant="contained">Создайте список</Button>
                    :
                    <>
                        <Box sx={{ m: 1, pt: 1 }}>Ваш список: {list.name}</Box>
                        <ViewItemsList parent={mainListId} type={list.type} />
                    </>
            }
        </>
    )
}