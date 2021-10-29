import React from "react";
import { Box, ListItem, Button, TextField, Checkbox, Typography } from "@mui/material";
import { DragStart, openEditorElem, Drop, DragOver, DragEnter, editElem, removeElem} from "./helpers/toList";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Expired({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const dragElem = useSelector(state => state.dragElem.elem);

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