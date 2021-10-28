import React from "react";
import { Button, List, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Sublist from "./Sublist";
import { openCloseModalAction } from "../store/modalOpenReducer";

export default function ViewItemsList({ parent, type }) {
    const dispath = useDispatch();
    const list = useSelector(state => state.list);

    function openCloseModal(value) {
        dispath(openCloseModalAction(value))
    }

    return (
        <>
            <List sx={{ p: 0, width: 'max-content' }}>
                {
                    list.elems.map(elem =>
                        elem.parent === parent ?
                            <Paper sx={{ m: 1 }} elevation={3} key={elem.id}>
                                {
                                    type === 'sublist' ?
                                        <Sublist elem={elem}
                                            draggable={list.draggable}
                                            disabled={list.disabled}
                                            editable={list.editable} />
                                        :
                                        null
                                }
                            </Paper>
                            : null
                    )}
                <Button sx={{ m: 1 }} variant='contained' onClick={() => openCloseModal({ open: true, text: 'Введите название элемента', parent: parent })}>Добавить новый элемент в список</Button>
            </List>

        </>
    )
}