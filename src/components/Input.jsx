import React from "react";
import { Box, ListItem, Button, TextField, List, ListItemIcon, ListItemText } from "@mui/material";
import { DragStart, openEditorElem, Drop, DragOver, DragEnter, editElem, removeElem } from "./helpers/toList";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import StarIcon from '@mui/icons-material/Star';

export default function Input({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const dragElem = useSelector(state => state.dragElem.elem);
    let qwe;

    return (
        <ListItem draggable={list.draggable} disabled={list.disabled} sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}
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
                <>
                    <List>
                        {
                            qwe = elem.name.map?.((item, index) =>
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                                
                            )
                        }
                        {console.log(qwe)}
                    </List>
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