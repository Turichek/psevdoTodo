import React from "react";
import { Button, List, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Sublist from "./ListItems/Sublist";
import { openCloseModalAction } from "../../store/Modal/actions";
import WithCheckBox from "./ListItems/WithCheckBox";
import Input from "./ListItems/Input";
import DateTimePicker from "./ListItems/DateTimePicker";
import { addElemToList } from "../helpers/toList";
import Img from "./ListItems/Img";
import Linktype from "./ListItems/Link";
import Expired from "./ListItems/Expired";

export default function ViewItemsList({ parent, type }) {
    const dispath = useDispatch();
    const list = useSelector(state => state.list);

    function openCloseModal() {
        if (type === 'sublist' || type === 'withCheckBox') {
            dispath(openCloseModalAction({ open: true, text: 'Введите название элемента', parent: parent }));
        }
        else if (type === 'input') {
            dispath(openCloseModalAction({ open: true, text: 'Введите название элементов через запятую', parent: parent }));
        }
        else if (type === 'img') {
            dispath(openCloseModalAction({ open: true, text: 'Введите ссылку на картинку', parent: parent }));
        }
        else if (type === 'link') {
            dispath(openCloseModalAction({ open: true, text: 'Введите текст ссылки', parent: parent }));
        }
        else if (type === 'expired') {
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
                                    type === 'sublist' ?
                                        <Sublist elem={elem} />
                                        :
                                    type === 'withCheckBox' ?
                                        <WithCheckBox elem={elem} />
                                        :
                                    type === 'input' ?
                                        <Input elem={elem} />
                                        :
                                    type === 'datepicker' || type === 'timepicker' ?
                                        <DateTimePicker elem={elem} />
                                        :
                                    type === 'img' ?
                                        <Img elem={elem} />
                                        :
                                    type === 'link' ?
                                        <Linktype elem={elem} />
                                        :
                                    type === 'expired' ?
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
                                type === 'datepicker' || type === 'timepicker' ?
                                    <Button sx={{ m: 1 }} variant='contained' onClick={(e) => addElemToList({ name: { value: new Date() } }, list.id, dispath, type, e)}>Добавить новый элемент в список</Button>
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