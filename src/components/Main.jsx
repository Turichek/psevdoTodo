import { Box, Paper, Modal, Fade, Backdrop, TextField, Button, FormControl, Select, MenuItem, InputLabel, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { useState } from "react";
import { addToList, toList } from "./helpers/toList";
import ViewTodo from "./ViewTodo";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import EditorField from "./EditorField";
import { openCloseModalAction } from "../store/modalOpenReducer";
import { setListDisabled, setListDraggable, setListType, setListEditable, setListName } from "../store/listReducer";

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

export default function Main() {
    const dispatch = useDispatch();
    const mainListId = useSelector(state => state.mainListId.value);
    const modal = useSelector(state => state.modal);
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const SetTypeList = (event) => {
        setType(event.target.value);
        dispatch(setListType(event.target.value));
    };

    const SetDragList = (event) => {
        if (event.target.value === 'on') dispatch(setListDraggable(true));
        else dispatch(setListDraggable(false));
    };

    const SetDisabledList = (event) => {
        if (event.target.value === 'on') dispatch(setListDisabled(true));
        else dispatch(setListDisabled(false));
    };

    const SetEditList = (event) => {
        if (event.target.value === 'on') dispatch(setListEditable(true));
        else dispatch(setListEditable(false));
    };

    const CreateList = () => {
        dispatch(setListName(name));
        setName('');
        dispatch(openCloseModalAction({ open: false, text: '' }));
    }

    return (
        <Box>
            <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-around' }}>
                <Paper sx={{ width: 0.49, height: 1 }} elevation={5}>
                    <EditorField />
                </Paper>
                <Paper sx={{ width: 0.49 }} elevation={5}>
                    <ViewTodo mainListId={mainListId} type={'sublist'} />
                </Paper>
            </Box>
            <Notification />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal.open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={modal.open}>
                    <Box sx={style}>
                        <TextField label={modal.text} onChange={(e) => setName(e.target.value)} value={name} variant="outlined" />
                        {
                            modal.text === 'Введите json для преобразования в список' ?
                                <Button sx={{ mt: 1 }} variant='contained' onClick={() => toList(name, dispatch, setName)}>Добавить</Button>
                                :
                            modal.text === 'Введите название элемента' ?
                                <Button sx={{ mt: 1 }} variant='contained' onClick={(e) => addToList(e, name, modal.parent, setName, dispatch)}>Добавить</Button>
                                :
                            modal.text === 'Введите название списка' ?
                                <>
                                    <FormControl sx={{ mt: 1 }}>
                                        <InputLabel id="typetitle">Введите тип листа</InputLabel>
                                        <Select
                                            labelId="typetitle"
                                            value={type}
                                            onChange={SetTypeList}
                                            autoWidth
                                            label="Введите тип листа"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'sublist'}>sublist</MenuItem>
                                            <MenuItem value={'withCheckBox'}>withCheckBox</MenuItem>
                                            <MenuItem value={'input'}>input</MenuItem>
                                            <MenuItem value={'datepicker'}>datepicker</MenuItem>
                                            <MenuItem value={'timepicker'}>timepicker</MenuItem>
                                            <MenuItem value={'img'}>img</MenuItem>
                                            <MenuItem value={'link'}>link</MenuItem>
                                            <MenuItem value={'expireddate'}>expireddate</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ mt: 1, display: "flex", justifyContent: 'space-between' }}>
                                        <FormControlLabel control={<Checkbox onChange={SetDragList} />} label="Draggable" />
                                        <FormControlLabel control={<Checkbox onChange={SetDisabledList} />} label="Disabled" />
                                        <FormControlLabel control={<Checkbox onChange={SetEditList} />} label="Editable" />
                                    </Box>
                                    <Button sx={{ mt: 1 }} variant='contained' onClick={CreateList}>Добавить</Button>
                                </>
                                :
                                null
                        }
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}