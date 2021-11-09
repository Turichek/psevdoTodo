import { Box, Paper, Modal, Fade, Backdrop, TextField, Button, FormControl, Select, MenuItem, InputLabel, FormControlLabel, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useState,forwardRef } from "react";
import { addElemToList, jsonToList } from "../helpers/toList";
import ViewTodo from "../List/ViewTodo";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import EditorField from "../ParsePsevdoCode/EditorField";
import { openCloseModalAction } from "../../store/Modal/actions";
import { setListDisabled, setListDraggable, setListType, setListEditable, setListName } from "../../store/List/actions";
import { openCloseAlertAction } from "../../store/Alert/actions";
import DatePicker from "react-datepicker";

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

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button sx={{width:1, height: '50px'}} variant={'outlined'} onClick={onClick} ref={ref}>
        {value}
    </Button>
));

export default function Main() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const modal = useSelector(state => state.modal);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const values ={
        name:{
            value: name,
            setter: setName,
        },
        additional_parameter:{
            value: value,
            setter: setValue,
        }
    }

    const SetTypeList = (event) => {
        setType(event.target.value);
        dispatch(setListType(event.target.value));
    };

    const SetDragList = (event) => {
        if (event.target.checked) dispatch(setListDraggable('true'));
        else dispatch(setListDraggable('false'));
    };

    const SetDisabledList = (event) => {
        if (event.target.checked) dispatch(setListDisabled(true));
        else dispatch(setListDisabled(false));
    };

    const SetEditList = (event) => {
        if (event.target.checked) dispatch(setListEditable(true));
        else dispatch(setListEditable(false));
    };

    const CreateList = () => {
        if (list.type !== '') {
            dispatch(setListName(name));
            setName('');
            dispatch(openCloseModalAction({ open: false, text: '' }));
        }
        else {
            dispatch(openCloseAlertAction({ open: true, text: 'Не корректное имя элемента или не указан тип листа', severity: 'error' }));
        }
    };

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <Box>
            <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-around' }}>
                <Paper sx={{ width: 0.49, height: 1 }} elevation={5}>
                    <EditorField />
                </Paper>
                <Paper sx={{ width: 0.49, overflow: 'auto' }} elevation={5}>
                    <ViewTodo mainListId={list.id} />
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
                        <Box sx={{mb: 1,display:'flex',justifyContent:'flex-end'}}>
                            <Button onClick={() => dispatch(openCloseModalAction({ open: false, text: modal.text, parent: -1 }))} sx={{p:0,minWidth:'25px',width:'25px',height: '25px'}} variant='outlined'>X</Button>
                        </Box>
                        {
                            modal.text === 'Введите до какого момента будет существовать элемент:' && list.type === 'expired' ?
                            null
                            : 
                            <TextField label={modal.text} onChange={(e) => setName(e.target.value)} value={name} variant="outlined" />
                        }
                        {
                            (modal.text === 'Введите название элемента' ||
                             modal.text === 'Введите название элементов через запятую' ||
                             modal.text === 'Введите ссылку на картинку' ) &&
                                (list.type === 'sublist' ||
                                 list.type === 'withCheckBox' ||
                                 list.type === 'input' ||
                                 list.type === 'img' ) ?
                                <Button sx={{ mt: 1 }} variant='contained' onClick={(e) => {
                                    setValue(false);
                                    addElemToList(values, modal.parent, dispatch, list.type, e)
                                }}>Добавить</Button>
                                :
                            modal.text === 'Введите текст ссылки' &&
                                list.type === 'link' ?
                                <>
                                    <TextField sx={{ mt: 1 }} label={'Введите ссылку'} onChange={(e) => setValue(e.target.value)} value={value} variant="outlined" />
                                    <Button sx={{ mt: 1 }} variant='contained' onClick={(e) => addElemToList(values, modal.parent, dispatch, list.type, e)}>Добавить</Button>
                                </>
                                :
                            modal.text === 'Введите до какого момента будет существовать элемент:' &&
                                list.type === 'expired' ?
                                <>
                                    <Typography variant="subtitle1">{modal.text}</Typography>
                                    <DatePicker selected={value}
                                        onChange={(value) => setValue(value)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        filterTime={filterPassedTime}
                                        dateFormat="MMMM d, yyyy H:mm:ss"
                                        customInput={<ExampleCustomInput />}/>
                                    <Button sx={{ mt: 1 }} variant='contained' onClick={(e) => addElemToList(values, modal.parent, dispatch, list.type, e)}>Добавить</Button>
                                </>
                                :
                            modal.text === 'Введите json для преобразования в список' ?
                                <Button sx={{ mt: 1 }} variant='contained' onClick={() => jsonToList(name, dispatch, setName)}>Добавить</Button>
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
                                            <MenuItem value={'expired'}>expired</MenuItem>
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