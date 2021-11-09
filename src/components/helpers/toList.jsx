import { addElemAction, removeElemAction, updateElemAction, updateElemsAction, updateListAction } from "../../store/List/actions";
import { openCloseAlertAction } from "../../store/Alert/actions";
import { addDragElemAction } from "../../store/DragElem/actions";
import { openCloseModalAction } from "../../store/Modal/actions";
import { addJsonAction } from "../../store/JsonData/actions";

const delay = 200;
let timer = 0;
let prevent = false; // eslint-disable-line

export const jsonToList = (import_json, dispath, setName) => {
    if (import_json !== null) {
        const str = import_json.replace(/\n/g, '').replace(/-/gm, '');
        dispath(addJsonAction(str));
        if (str.charAt(0) === '{') {
            const import_list = JSON.parse(str);
            dispath(updateListAction({
                id: import_list.id,
                name: import_list.name,
                elems: import_list.elems,
                type: import_list.type,
                draggable: import_list.draggable,
                disabled: import_list.disabled,
                editable: import_list.editable,
            }));
            dispath(openCloseAlertAction({ open: true, text: 'Список успешно добавлен', severity: 'success' }));
            dispath(openCloseModalAction({ open: false, text: '', parent: -1 }));
            setName('');
        }
        else {
            dispath(openCloseAlertAction({ open: true, text: 'Некорректная строка для преобразования в список', severity: 'error' }));
        }
    }
    else {
        dispath(openCloseAlertAction({ open: true, text: 'Список не был добавлен', severity: 'error' }));
    }
}

export const addElemToList = (values, parent, dispatch, type, e = null, isReturn = false) => {
    let elem = {};

    if (values.name.value !== null) {
        switch (type) {
            case 'sublist':
                elem = {
                    id: Date.now() + getRandomInt(1000),
                    name: values.name.value,
                    childs: false,
                    elemsType: 'sublist',
                }
                break;

            case 'withCheckBox':
                elem = {
                    id: Date.now() + getRandomInt(1000),
                    name: values.name.value,
                }
                break;

            case 'input':
                const arr = values.name.value.split(',')
                elem = {
                    id: Date.now() + getRandomInt(1000),
                    name: arr,
                }
                break;

            case 'timepicker':
            case 'datepicker':
                elem = {
                    id: Date.now() + getRandomInt(1000),
                    name: Date.parse(values.name.value),
                }
                break;

            case 'img':
                elem = {
                    id: Date.now() + getRandomInt(1000),
                    src: values.name.value,
                }
                break;

            case 'link':
                elem = {
                    id: Date.now() + getRandomInt(1000),
                    name: values.name.value,
                    link: values.additional_parameter.value,
                }
                break;

            case 'expired':
                const jwt = require('jsonwebtoken');
                const now = new Date();
                const diff = new Date(values.additional_parameter.value - now);
                const name = 'Элемент пропадет через ' + timeFormater(diff.getHours() - 3) + ':' + timeFormater(diff.getMinutes()) + ':' + timeFormater(diff.getSeconds());
                const rand = getRandomInt(1000);

                elem = {
                    id: Date.parse(now.toString()) + rand,
                    name: name,
                    expiredAt: Date.parse(values.additional_parameter.value.toString()),
                }

                const token = jwt.sign({
                    exp: values.additional_parameter.value / 1000,
                    data: elem
                }, 'secret');
                localStorage.setItem(Date.parse(now.toString()) + rand, token);
                break;

            default:
                break;
        }
        elem.parent = parent;
        elem.edit = false;
        elem.type = type;

        if(isReturn){
            return elem;
        }
        dispatch(addElemAction(elem));
        if (values.additional_parameter.setter !== undefined) values.additional_parameter.setter('');
        if (values.name.setter !== undefined) values.name.setter('');
        dispatch(openCloseModalAction({ open: false, text: '', parent: -1 }));
        dispatch(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    }
    else {
        dispatch(openCloseAlertAction({ open: true, text: 'Не корректное имя элемента', severity: 'error' }));
    }

    if (e !== null) {
        e.stopPropagation();
    }

}

export const deleteExpider = (elem, dispath, list) => {
    const jwt = require('jsonwebtoken');
    const item = localStorage.getItem(elem.id);

    jwt.verify(item, 'secret', function (err, decoded) {
        if (decoded.exp - 1 <= (Date.now() / 1000)) {
            localStorage.removeItem(elem.id);
            removeElem(elem, dispath, list);
        }
        else {
            const now = new Date();
            const diff = new Date(decoded.exp * 1000 - now);
            const name = 'Элемент пропадет через ' + timeFormater(diff.getHours() - 3) + ':' + timeFormater(diff.getMinutes()) + ':' + timeFormater(diff.getSeconds());
            elem.name = name;
            dispath(updateElemAction(elem));
        }
    })
}

export const updateElemName = (elem, dispatch, date) => {
    elem.name = Date.parse(date.toString());
    dispatch(updateElemAction(elem));
}

export const addSublist = (elem, dispath) => {
    elem.childs = true;
    dispath(updateElemAction(elem));
}

export const deleteSublist = (elem, dispath, list) => {
    elem.childs = false;
    deleteChilds(elem, dispath, list);
    dispath(updateElemAction(elem));
}

export const removeElem = (elem, dispath, list) => {
    if (elem.childs === true) {
        deleteChilds(elem, dispath, list);
    }
    dispath(removeElemAction(elem.id));
}

export const openEditorElem = (e, elem, dispath, list) => {
    if (list.editable !== false) {
        clearTimeout(timer);
        prevent = true;

        elem.edit = true;
        dispath(updateElemAction(elem));

        setTimeout(() => {
            prevent = false;
        }, delay);
        e.stopPropagation()
    }
}

export const editElem = (e, elem, dispath) => {
    if (e.keyCode === 13) {
        elem.edit = false;
    }
    elem.name = e.target.value;
    dispath(updateElemAction(elem));
}

export const DragStart = (e, elem, dispath) => {
    dispath(addDragElemAction(elem));

    console.log(elem, 'start');
    e.stopPropagation();
}

export const DragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
}

export const DragEnter = (e, dragElem) => {
    e.preventDefault();
    console.log(dragElem, 'enter');
    e.stopPropagation();
}

export const Drop = (e, elem, dispath, dragElem, list) => {
    console.log(dragElem);
    let newParent = {};
    let res = [];

    list.splice(list.indexOf(dragElem), 1);
    if (dragElem.parent !== elem.parent) {
        newParent = {
            id: dragElem.id,
            name: dragElem.name,
            parent: elem.parent,
            childs: dragElem.childs,
            edit: dragElem.edit,
        }
        res = insert(list, list.indexOf(elem), newParent);
    }
    else {
        res = insert(list, list.indexOf(elem), dragElem);
    }
    dispath(updateElemsAction(res));
    dispath(addDragElemAction({}));

    console.log(dragElem, elem, list, ' drop elem');

    e.stopPropagation();
    return false;
}

function deleteChilds(parent, dispath, list) {
    list.map(item => { // eslint-disable-line
        if (item.parent === parent.id) {
            deleteChilds(item, dispath, list);
            dispath(removeElemAction(item.id));
        }
    })
}

function timeFormater(value) {
    if (value < 10) {
        return "0" + value;
    }
    else {
        return value;
    }
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function sleep(miliseconds) {
    let currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

export const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]