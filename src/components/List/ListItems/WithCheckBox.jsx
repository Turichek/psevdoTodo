import React from "react";
import { Box, ListItem, Button, TextField, Checkbox, Typography } from "@mui/material";
import { DragStart, openEditorElem, Drop, DragOver, DragEnter, editElem, removeElem } from "../../helpers/toList";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function WithCheckBox({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const dragElem = useSelector(state => state.dragElem.elem);
    const [checked, setChecked] = useState(false)

    return (
        <ListItem draggable={list.draggable} disabled={list.disabled} sx={{ display: 'flex', alignItems: 'start' }}
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
                        onChange={(e) => editElem(e, elem, dispatch)} value={elem.name} variant="standard" />
                </Box>
                :
                <Box sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox onChange={(e) => setChecked(e.target.checked)} />
                        {
                            checked === true ?
                                <s>
                                    <Typography variant="subtitle1">{elem.name}</Typography>
                                </s>
                                :
                                <Typography variant="subtitle1">{elem.name}</Typography>
                        }
                    </Box>
                    {
                        list.editable !== false ?
                            <Button onClick={() => removeElem(elem, dispatch, list.elems)} sx={{ ml: 3 }} variant='contained' color='error'><DeleteIcon /></Button>
                            :
                            null
                    }
                </Box>
            }
        </ListItem>
    )
}