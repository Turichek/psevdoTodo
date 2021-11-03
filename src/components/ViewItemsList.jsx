import React from "react";
import { Button, List, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Sublist from "./Sublist";
import { openCloseModalAction } from "../store/modalOpenReducer";
import WithCheckBox from "./WithCheckBox";
import Input from "./Input";
import DateTimePicker from "./DateTimePicker";
import { addElemToList } from "./helpers/toList";
import Img from "./Img";
import Linktype from "./Link";
import Expired from "./Expired";

export default function ViewItemsList({ parent, type }) {
    const dispath = useDispatch();
    const list = useSelector(state => state.list);

    function openCloseModal() {
        if (list.type === 'sublist' || list.type === 'withCheckBox') {
            dispath(openCloseModalAction({ open: true, text: 'Введите название элемента', parent: parent }));
        }
        else if (list.type === 'input') {
            dispath(openCloseModalAction({ open: true, text: 'Введите название элементов через запятую', parent: parent }));
        }
        else if (list.type === 'img') {
            dispath(openCloseModalAction({ open: true, text: 'Введите ссылку на картинку', parent: parent }));
        }
        else if (list.type === 'link') {
            dispath(openCloseModalAction({ open: true, text: 'Введите текст ссылки', parent: parent }));
        }
        else if (list.type === 'expired') {
            dispath(openCloseModalAction({ open: true, text: 'Введите до какого момента будет существовать элемент:', parent: parent }));
        }
    }

    return (
        <>
            <List sx={{ mx: 1, p: 0 }}>
                {
                    list.elems.map((elem, index) =>
                        elem.parent === parent ?
                            <Paper sx={{ m: 1, width: 'max-content' }} elevation={3} key={index}>
                                {
                                    list.type === 'sublist' ?
                                        <Sublist elem={elem} />
                                        :
                                    list.type === 'withCheckBox' ?
                                        <WithCheckBox elem={elem} />
                                        :
                                    list.type === 'input' ?
                                        <Input elem={elem} />
                                        :
                                    list.type === 'datepicker' || list.type === 'timepicker' ?
                                        <DateTimePicker elem={elem} />
                                        :
                                    list.type === 'img' ?
                                        <Img elem={elem} />
                                        :
                                    list.type === 'link' ?
                                        <Linktype elem={elem} />
                                        :
                                    list.type === 'expired' ?
                                        <Expired elem={elem} />
                                        :
                                        null
                                }
                            </Paper>
                            : null
                    )}
                {
                    list.editable !== false ?
                        <>
                            {
                                list.type === 'datepicker' || list.type === 'timepicker' ?
                                    <Button sx={{ m: 1 }} variant='contained' onClick={(e) => addElemToList({ name: { value: new Date() } }, list.id, dispath, list.type, e)}>Добавить новый элемент в список</Button>
                                    :
                                    <Button sx={{ m: 1 }} variant='contained' onClick={() => openCloseModal()}>Добавить новый элемент в список</Button>
                            }
                        </>
                        :
                        null
                }

            </List>

        </>
    )
}