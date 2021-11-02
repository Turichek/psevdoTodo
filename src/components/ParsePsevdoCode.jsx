import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateListAction } from "../store/listReducer";
import { addElemToList } from "./helpers/toList";

export default function ParsePsevdoCode() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const psevdo = useSelector(state => state.psevdo.text);
    const [parsing, setParsing] = useState(false);

    const FindElemsFromPsevdo = () => {
        const values = {
            name: {
                value: '',
            },
            additional_parameter: {
                value: '',
            }
        }
        const findElems = /(elems):(\[[\s\d\w\S\D\W]*\])/;
        let findElem;
        let elemsStr;
        let elems;

        switch (list.type) {
            case 'input':
                findElem = /(\{(name):\s*([a-z0-9,]*)?\})/g;
                elemsStr = psevdo.match(findElems)[2];
                elems = [...elemsStr.matchAll(findElem)];
                break;

            case 'img':
                findElem = /(\{(src):\s*(.*?)\})/g;
                elemsStr = psevdo.match(findElems)[2];
                elems = [...elemsStr.matchAll(findElem)];
                break;

            case 'link':
                findElem = /(\{name:\s*([a-z0-9,]*)?,link:\s*(.*?)\})/g;
                elemsStr = psevdo.match(findElems)[2];
                elems = [...elemsStr.matchAll(findElem)];
                break;

            default:
                break;
        }

        for (let i = 0; i < elems.length; i++) {
            values.name.value = elems[i][3]
            addElemToList(values, list.id, dispatch, list.type);
        }
        setParsing(false);
    }

    const ParsePsevdo = () => {
        const findName = /([a-z0-9]+)(:)/;
        const findType = /((\btype\b)\s*:\s*(\bsublist\b|\binput\b|\bwithCheckBox\b|\bdatepicker\b|\btimepicker\b|\bimg\b|\blink\b|\bexpired\b))/;
        const findDraggable = /((\bdraggable\b)\s*:\s*(\btrue\b|\bfalse\b))/;
        const findDisabled = /((\bdisabled\b)\s*:\s*(\btrue\b|\bfalse\b))/;
        const findEditable = /((\beditable\b)\s*:\s*(\btrue\b|\bfalse\b))/;

        const name = psevdo.match(findName)[1];
        const type = psevdo.match(findType)[3];
        const draggable = reTypeAttr(psevdo.match(findDraggable));
        const disabled = reTypeAttr(psevdo.match(findDisabled));
        const editable = reTypeAttr(psevdo.match(findEditable));

        dispatch(updateListAction({
            id: list.id,
            name: name,
            elems: [],
            type: type,
            draggable: '' + draggable,
            disabled: disabled,
            editable: editable,
        }));
        setParsing(true);
    }

    const reTypeAttr = (value) => {
        if (value === null || value[3] === "false") {
            return value = false;
        }
        else if (value[3] === "true") {
            return value = true;
        }
    }

    useEffect(() => {
        if (parsing !== false) {
            FindElemsFromPsevdo();
        }
    })

    return (
        <Button sx={{ width: 1 }} onClick={() => ParsePsevdo()} variant='contained'>Parse psevdo code</Button>
    )
}

