import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateElemsAction, updateListAction } from "../store/listReducer";
import { addElemToList, getRandomInt } from "./helpers/toList";

export default function ParsePsevdoCode() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const psevdo = useSelector(state => state.psevdo.text);
    const [parsing, setParsing] = useState(false);
    const arr = [];

    const FindElemsFromPsevdo = (parent, toFindStr) => {
        const values = {
            name: {
                value: '',
            },
            additional_parameter: {
                value: '',
            }
        }

        const toFindElems = /(elems):\s*(\[[\s\d\w\S\D\W]+?\])/;
        let findElem;

        switch (list.type) {
            case 'input':
                findElem = /(\{\s*(items)\s*:\s*([\w\d,]+)?\})/g;
                break;

            case 'img':
                findElem = /(\{\s*(src)\s*:\s*(.*?)\})/g;
                break;

            case 'link':
                findElem = /(\{\s*name\s*:\s*([\w\d,]+)?,\s*link:\s*(.*?)\})/g;
                break;

            case 'datepicker':
                findElem = /(\{\s*(date)\s*:\s*([\w\d./]+)?\})/g;
                break;

            case 'timepicker':
                findElem = /(\{\s*(time)\s*:\s*([\w\d:]+)?\})/g;
                break;

            case 'expired':
                findElem = /(\{\s*(expiredAt)\s*:\s*([\w\d:]+)?\})/g;
                break;

            case 'withCheckBox':
                findElem = /(\{\s*(name)\s*:\s*([\w\d,.:]+)?\})/g;
                break;

            case 'sublist':
                findElem = /(\s*\{\s*(name)\s*:\s*([\w\d.:]+)?\s*,\s*(elems)\s*:\s*(\[[\s\d\w\S\D\W]+?\])|\s*(name)\s*:\s*([\w\d.:]+)?\s*\})/g;
                break;
            default:
                break;
        }
        const elems = [...toFindStr.matchAll(findElem)];

        for (let i = 0; i < elems.length; i++) {
            if (list.type === 'link') {
                values.name.value = elems[i][2];
                values.additional_parameter.value = elems[i][3];
            }
            else if (list.type === 'datepicker') {
                values.name.value = new Date(elems[i][3]);
            }
            else if (list.type === 'timepicker' || list.type === 'expired') {
                values.name.value = values.additional_parameter.value = new Date((new Date().getMonth() + 1) + '.' + new Date().getDate() + '.' + new Date().getFullYear() + " " + elems[i][3]);
            }
            else if (list.type === "sublist") {
                if (elems[i][3] !== undefined) {
                    values.name.value = elems[i][3];
                }
                else {
                    values.name.value = elems[i][7];
                }

                if (elems[i][1].match(toFindElems) !== null) {
                    values.additional_parameter.value = true;
                }
                else {
                    values.additional_parameter.value = false;
                }

                const elem = {
                    id: Date.now() + getRandomInt(1000),
                    name: values.name.value,
                    parent: parent,
                    childs: values.additional_parameter.value,
                    edit: false,
                }
                arr.push(elem);

                if (values.additional_parameter.value === true) {
                    FindElemsFromPsevdo(arr[arr.length - 1].id, elems[i][5]);
                }
            }
            else {
                values.name.value = elems[i][3];
            }

            if(list.type !== 'sublist'){
                addElemToList(values, list.id, dispatch, list.type);
            }
        }
        setParsing(false);
        console.log(arr);
    }

    const ParsePsevdo = () => {
        const findName = /"([\w\d\s]+)"(:)/;
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
            const findElems = /(elems):\s*(\[[\s\d\w\S\D\W]+\])/;
            const elemsStr = psevdo.match(findElems)[2];
            FindElemsFromPsevdo(list.id, elemsStr);
            if (list.type === 'sublist') {
                dispatch(updateElemsAction(arr));
            }
        }
    })

    return (
        <Button sx={{ width: 1 }} onClick={() => ParsePsevdo()} variant='contained'>Parse psevdo code</Button>
    )
}