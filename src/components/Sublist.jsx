import React from "react";
import { Box, ListItem, Button, TextField, Typography } from "@mui/material";
import ViewItemsList from "./ViewItemsList";
import { DragStart, openEditorElem, Drop, DragOver, DragEnter, editElem, removeElem, addSublist, deleteSublist } from "./helpers/toList";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";

export default function Sublist({ elem, draggable, disabled, editable }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list.elems);
    const dragElem = useSelector(state => state.dragElem.elem);

    return (
        <ListItem draggable={draggable === true ? 'true' : 'false'} disabled={disabled === true ? 'true' : null} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
            onDoubleClick={(e) => openEditorElem(e, elem, dispatch)}
            onDrop={(e) => Drop(e, elem, dispatch, dragElem, list)}
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle1'>{elem.name}</Typography>
                    <Button onClick={() => removeElem(elem, dispatch, list)} sx={{ ml: 3 }} variant='contained' color='error'><DeleteIcon /></Button>
                    {elem.childs === false ?
                        <Button sx={{ ml: 1 }} onClick={() => addSublist(elem, dispatch)} color='success' variant='contained'>Добавить саблист</Button>
                        :
                        <Button sx={{ ml: 1 }} onClick={() => deleteSublist(elem, dispatch, list)} color='error' variant='contained'>Удалить саблист</Button>
                    }
                </Box>
            }
            {elem.childs !== false ?
                <Box>
                    <ViewItemsList parent={elem.id} type={'sublist'} />
                </Box>
                : null
            }
        </ListItem>
    )
}