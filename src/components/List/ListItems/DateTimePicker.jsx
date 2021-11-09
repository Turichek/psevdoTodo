import React, { useState } from "react";
import { Box, ListItem, Button, TextField } from "@mui/material";
import { DragStart, Drop, DragOver, DragEnter, editElem, removeElem, updateElemName } from "../../helpers/toList";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant={'contained'} onClick={onClick} ref={ref}>
        {value}
    </Button>
));

export default function DateTimePicker({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const dragElem = useSelector(state => state.dragElem.elem);
    const [date, setDate] = useState(new Date(elem.name));

    return (
        <ListItem draggable={list.draggable} disabled={list.disabled} sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}
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
                    {
                        elem.type === 'datepicker' ?
                            <DatePicker selected={date}
                                onChange={(date) => {
                                    setDate(date);
                                    updateElemName(elem, dispatch, date);
                                }} customInput={<ExampleCustomInput />} />
                            :
                            <DatePicker selected={date} showTimeSelect showTimeSelectOnly timeIntervals={1} dateFormat="H:mm:ss"
                                onChange={(date) => {
                                    setDate(date);
                                    updateElemName(elem, dispatch, date);
                                }} customInput={<ExampleCustomInput />} />
                    }
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