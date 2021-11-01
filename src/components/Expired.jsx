import React, { useEffect } from "react";
import { Box, ListItem, TextField, Typography } from "@mui/material";
import { DragStart, Drop, DragOver, DragEnter, editElem, deleteExpider } from "./helpers/toList";
import { useDispatch, useSelector } from "react-redux";

export default function Expired({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const dragElem = useSelector(state => state.dragElem.elem);

    useEffect(() => {
        const timer = setInterval(deleteExpider, 1000, elem, dispatch, list);
        return () => {
            clearTimeout(timer)
        }
    }, []) // eslint-disable-line

    return (
        <ListItem draggable={list.draggable} disabled={list.disabled} sx={{ display: 'flex', alignItems: 'start' }}
            onDrop={(e) => Drop(e, elem, dispatch, dragElem, list.elems)}
            onDragOver={(e) => DragOver(e)}
            onDragEnter={(e) => DragEnter(e)}
            onDragStart={(e) => DragStart(e, elem, dispatch)}
        >
            {elem.edit !== false ?
                <Box>
                    <TextField onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => editElem(e, elem, dispatch)}
                        onChange={(e) => editElem(e, elem, dispatch)} value={elem.name} variant="standard" />
                </Box>
                :
                <Typography variant='subtitle1'>{elem.name}</Typography>
            }
        </ListItem>
    )
}