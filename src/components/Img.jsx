import React from "react";
import { Box, ListItem, Button, TextField } from "@mui/material";
import { DragStart, Drop, DragOver, DragEnter, editElem, removeElem, openEditorElem } from "./helpers/toList";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";

export default function Img({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const dragElem = useSelector(state => state.dragElem.elem);

    return (
        <ListItem draggable={list.draggable} disabled={list.disabled} sx={{ display: 'flex', alignItems: 'stretch' }}
            onDoubleClick={(e) => openEditorElem(e, elem, dispatch, list)}
            onDrop={(e) => Drop(e, elem, dispatch, dragElem, list.elems)}
            onDragOver={(e) => DragOver(e)}
            onDragEnter={(e) => DragEnter(e)}
            onDragStart={(e) => DragStart(e, elem, dispatch)}
        >
            {elem.edit !== false ?
                <Box>
                    <TextField onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => editElem(e, elem, dispatch)}
                        onChange={(e) => editElem(e, elem, dispatch)} value={elem.src} variant="standard" />
                </Box>
                :
                <>
                    <Box><img src={elem.src} alt="" /></Box>
                    {
                        list.editable !== false ?
                            <Button onClick={() => removeElem(elem, dispatch, list.elems)} sx={{ ml: 3 }} variant='contained' color='error'>
                                <DeleteIcon />
                            </Button>
                            :
                            null
                    }

                </>
            }
        </ListItem>
    )
}