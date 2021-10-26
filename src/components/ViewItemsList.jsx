import React from "react";
import { Box, Button, List, ListItem, Modal, TextField, Backdrop, Typography, Fade } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addElemAction, removeElemAction, updateElemAction } from "../store/listReducer";
import Sublist from "./Sublist";
import { useState } from "react";
import { openCloseAlertAction } from "../store/alertReducer";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ViewItemsList({ parent }) {
    const dispath = useDispatch();
    const list = useSelector(state => state.list.elems);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let timer = 0;
    const delay = 200;
    let prevent = false; // eslint-disable-line

    function deleteChilds(parent){
        list.map(item => { // eslint-disable-line
            if (item.parent === parent.id) {
                deleteChilds(item);
                dispath(removeElemAction(item.id));
            }
        })
    }

    const addToList = (name, parent) => {
        if (name !== null) {
            const elem = {
                id: Date.now(),
                name: name,
                parent: parent,
                childs: false,
                edit: false,
            }
            dispath(addElemAction(elem))
            setName('');
            setOpen(false);
        }
        else {
            dispath(openCloseAlertAction({ open: true, text: 'Элемент не добавлен в список', severity: 'error' }));
        }
    }

    const addSublist = (elem) => {
        elem.childs = true;
        dispath(updateElemAction(elem));
    }

    const deleteSublist = (elem) => {
        elem.childs = false;
        deleteChilds(elem);
        dispath(updateElemAction(elem));
    }

    const removeElem = (elem) => {
        if (elem.childs === true) {
            deleteChilds(elem);
        }
        dispath(removeElemAction(elem.id));
    }

    const openEditorElem = (e, elem) => {
        clearTimeout(timer);
        prevent = true;

        elem.edit = true;
        dispath(updateElemAction(elem));

        setTimeout(() => {
            prevent = false;
        }, delay);
        e.stopPropagation()
    }

    const editElem = (e, elem) => {
        if (e.keyCode === 13) {
            elem.edit = false;
        }
        elem.name = e.target.value;
        dispath(updateElemAction(elem));
    }

    return (
        <>
            <List>
                {
                    list.map(elem =>
                        elem.parent === parent ?
                            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}

                                onDoubleClick={(e) => openEditorElem(e, elem)}
                                key={elem.id}>
                                {
                                    elem.edit !== false ?
                                        <Box>
                                            <TextField onClick={(e) => e.stopPropagation()}
                                                onKeyDown={(e) => editElem(e, elem)}
                                                onChange={(e) => editElem(e, elem)} value={elem.name} variant="standard" />
                                        </Box>
                                        :
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant='subtitle1'>{elem.name}</Typography>
                                            <Button onClick={() => removeElem(elem)} sx={{ ml: 3 }} variant='contained' color='error'><DeleteIcon /></Button>
                                            {elem.childs === false ?
                                                <Button sx={{ ml: 1 }} onClick={() => addSublist(elem)} color='success' variant='contained'>Добавить саблист</Button>
                                                : 
                                                <Button sx={{ ml: 1 }} onClick={() => deleteSublist(elem)} color='error' variant='contained'>Удалить саблист</Button>
                                            }
                                        </Box>
                                }

                                {elem.childs !== false ?
                                    <Sublist parentId={elem.id} />
                                    : null}
                            </ListItem>
                            :
                            null
                    )
                }
                <Button sx={{ mx: 1 }} variant='contained' onClick={handleOpen}>Добавить в список</Button>
            </List>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Введите название элемента
                        </Typography>
                        <TextField onChange={(e) => setName(e.target.value)} value={name} variant="standard" />
                        <Button sx={{ mt: 1 }} variant='contained' onClick={() => addToList(name, parent)}>Add to List</Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}