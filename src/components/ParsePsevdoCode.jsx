import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateElemsAction, updateListAction } from "../store/listReducer";
import { addListsAction } from "../store/listsReducer";
import { addElemToList, getRandomInt } from "./helpers/toList";

export default function ParsePsevdoCode() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);
    const additionLists = useSelector(state => state.lists);
    const psevdo = useSelector(state => state.psevdo.text);
    const [parsing, setParsing] = useState(false);
    const [toRenderListStr, setToRenderListStr] = useState('');
    let elemArr = [];
    let listsArr = [];

    const findRenderList = /"([\w\d\s]+)":\s*\n([\w\d\s\W\D\S]+?$)/;
    const findType = /((\btype\b)\s*:\s*(\bsublist\b|\binput\b|\bwithCheckBox\b|\bdatepicker\b|\btimepicker\b|\bimg\b|\blink\b|\bexpired\b))/;
    const findDraggable = /((\bdraggable\b)\s*:\s*(\btrue\b|\bfalse\b))/;
    const findDisabled = /((\bdisabled\b)\s*:\s*(\btrue\b|\bfalse\b))/;
    const findEditable = /((\beditable\b)\s*:\s*(\btrue\b|\bfalse\b))/;
    const toFindElems = /(elems):\s*(\[[\s\d\w\S\D\W]+?\])/;

    const CheckRepetitions = (elem) => {
        elemArr.map(item => {
            if(elem.id === item.id){
                elem.id++;
            }
        })
    }

    const TypeToRegex = (type) => {
        switch (type) {
            case 'input':
                return /(\{\s*(items)\s*:\s*([\w\d,]+)?\})/g;


            case 'img':
                return /(\{\s*(src)\s*:\s*(.*?)\})/g;


            case 'link':
                return /(\{\s*name\s*:\s*([\w\d,]+)?,\s*link:\s*(.*?)\})/g;

            case 'datepicker':
                return /(\{\s*(date)\s*:\s*([\w\d./]+)?\})/g;

            case 'timepicker':
                return /(\{\s*(time)\s*:\s*([\w\d:]+)?\})/g;

            case 'expired':
                return /(\{\s*(expiredAt)\s*:\s*([\w\d:]+)?\})/g;

            case 'withCheckBox':
                return /(\{\s*(name)\s*:\s*([\w\d,.:]+)?\})/g;

            case 'sublist':
                return /(\s*\{\s*(name)\s*:\s*([\w\d.:]+)?\s*,\s*(elems)\s*:\s*(\[[\s\d\w\S\D\W]+?\])|\s*(name)\s*:\s*([\w\d.:]+)?\s*|\s*(href)\s*:\s*([\w\d.:]+)?\s*\})/g;

            default:
                return;
        }
    }

    const FindElemsFromPsevdo = (parent, toFindStr, type, isReturn = false) => {
        const values = {
            name: {
                value: '',
            },
            additional_parameter: {
                value: '',
            }
        }

        const findElem = TypeToRegex(type);
        const elems = [...toFindStr.matchAll(findElem)];

        for (let i = 0; i < elems.length; i++) {
            if (type === 'link') {
                values.name.value = elems[i][2];
                values.additional_parameter.value = elems[i][3];
            }
            else if (type === 'datepicker') {
                values.name.value = new Date(elems[i][3]);
            }
            else if (type === 'timepicker' || type === 'expired') {
                values.name.value = values.additional_parameter.value = new Date((new Date().getMonth() + 1) + '.' + new Date().getDate() + '.' + new Date().getFullYear() + " " + elems[i][3]);
            }
            else if (type === "sublist") {
                if (elems[i][3] !== undefined) {
                    values.name.value = elems[i][3];
                }
                else if (elems[i][7] !== undefined) {
                    values.name.value = elems[i][7];
                }
                else {
                    values.name.value = elems[i][9];
                }

                if (elems[i][1].match(toFindElems) !== null) {
                    values.additional_parameter.value = true;
                }
                else if (elems[i][9] !== undefined) {
                    values.additional_parameter.value = true;
                }
                else {
                    values.additional_parameter.value = false;
                }

                let listToAdd;
               
                listsArr.map(item => {  // eslint-disable-line
                    if (item.name === elems[i][9]) {
                        listToAdd = Object.assign({}, item);
                        item.id++;
                        item.elems.map(item => { // eslint-disable-line
                            item.id++;
                            item.parent++;
                        })
                    }
                })

                const elem = {
                    name: values.name.value,
                    parent: parent,
                    childs: values.additional_parameter.value,
                    edit: false,
                    type: type,
                }

                if (listToAdd !== undefined) {
                    elem.id = listToAdd.id;
                    //elem.type = listToAdd.type;
                    elem.elemsType = listToAdd.type;
                    elemArr.push(elem);
                    elemArr = elemArr.concat(listToAdd.elems);
                }
                else {
                    elem.id = Date.now() + getRandomInt(1000);
                    //elem.type = type;
                    elemArr.push(elem);
                }

                if (values.additional_parameter.value === true && elems[i][9] === undefined) {
                    FindElemsFromPsevdo(elemArr[elemArr.length - 1].id, elems[i][5], type);
                }
            }
            else {
                values.name.value = elems[i][3];
            }

            if (type !== 'sublist') {
                if (!isReturn) {
                    addElemToList(values, list.id, dispatch, type);
                }
                else {
                    elemArr.push(addElemToList(values, parent, dispatch, type, null, true));
                }
            }
        }
        setParsing(false);
    }

    const ParsePsevdo = () => {
        setToRenderListStr(psevdo.match(findRenderList)[2]);

        const name = psevdo.match(findRenderList)[1];
        const type = psevdo.match(findRenderList)[2].match(findType)[3];
        const draggable = reTypeAttr(psevdo.match(findRenderList)[2].match(findDraggable));
        const disabled = reTypeAttr(psevdo.match(findRenderList)[2].match(findDisabled));
        const editable = reTypeAttr(psevdo.match(findRenderList)[2].match(findEditable));

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

    const createAdditionalLists = () => {
        const toFindLists = /"([\w\d\s]+)":\s*(\[[\w\d\s\W\D\S]+?\])/g;
        const lists = [...psevdo.matchAll(toFindLists)];

        // eslint-disable-next-line
        lists.map(item => {
            const id = Date.now();
            const type = item[2].match(findType)[3];
            const elemsStr = item[2].match(toFindElems)[2];
            FindElemsFromPsevdo(id, elemsStr, type, true);

            const newList = {
                id: id,
                name: item[1],
                elems: elemArr,
                type: type,
            }

            listsArr.push(newList);
            elemArr = [];
        })

        dispatch(addListsAction(listsArr));
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
            const elemsStr = toRenderListStr.match(toFindElems)[2];

            createAdditionalLists();
            FindElemsFromPsevdo(list.id, elemsStr, list.type);

            if (list.type === 'sublist') {
                dispatch(updateElemsAction(elemArr));
            }
        }
    })

    return (
        <Button sx={{ width: 1 }} onClick={() => ParsePsevdo()} variant='contained'>Parse psevdo code</Button>
    )
}