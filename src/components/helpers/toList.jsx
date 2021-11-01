import { addElemAction, removeElemAction, updateElemAction, updateElemsAction, updateListAction } from "../../store/listReducer";
import { openCloseAlertAction } from "../../store/alertReducer";
import { addDragElemAction } from "../../store/dragElemReducer";
import { openCloseModalAction } from "../../store/modalOpenReducer";
import { addJsonAction } from "../../store/jsonDataReducer";

const delay = 200;
let timer = 0;
let prevent = false; // eslint-disable-line

export const jsonToList = (import_json, dispath, setName) => {
    if (import_json !== null) {
        const str = import_json.replace(/\n/g, '').replace(/-/gm, '');
        dispath(addJsonAction(str));
        if (str.charAt(0) === '[') {
            const import_list=JSON.parse(str);
            dispath(updateListAction({
                id: import_list.id,
                name: import_list.name}));
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

export const addToList = (e, name, parent, setName, dispath) => {
    if (name !== null && name !== '') {
        const elem = {
            id: Date.now(),
            name: name,
            parent: parent,
            childs: false,
            edit: false,
        }
        dispath(addElemAction(elem))
        setName('');
        dispath(openCloseModalAction({ open: false, text: '', parent: -1, func: () => { } }));
        dispath(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    }
    else {
        dispath(openCloseAlertAction({ open: true, text: 'Не корректное имя элемента', severity: 'error' }));
    }
    e.stopPropagation();
}

export const addToListInput = (e, name, parent, setName, dispath) => {
    if (name !== null && name !== '') {
        const arr = name.split(',')
        const elem = {
            id: Date.now(),
            name: arr,
            parent: parent,
            edit: false,
        }
        dispath(addElemAction(elem))
        setName('');
        dispath(openCloseModalAction({ open: false, text: '', parent: -1, func: () => { } }));
        dispath(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    }
    else {
        dispath(openCloseAlertAction({ open: true, text: 'Не корректное имя элемента', severity: 'error' }));
    }
    e.stopPropagation();
}

export const addToListPicker = (e, parent, dispath) => {
    const elem = {
        id: Date.now(),
        name: Date.now(),
        parent: parent,
        edit: false,
    }
    dispath(addElemAction(elem))
    dispath(openCloseModalAction({ open: false, text: '', parent: -1, func: () => { } }));
    dispath(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    e.stopPropagation();
}

export const addToListImg = (e, name, setName, parent, dispath) => {
    const elem = {
        id: Date.now(),
        src: name,
        parent: parent,
        edit: false,
    }
    dispath(addElemAction(elem))
    setName('');
    dispath(openCloseModalAction({ open: false, text: '', parent: -1, func: () => { } }));
    dispath(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    e.stopPropagation();
}

export const addToListLink = (e, name, link, setName, setLink, parent, dispath) => {
    const elem = {
        id: Date.now(),
        name: name,
        link: link,
        parent: parent,
        edit: false,
    }
    dispath(addElemAction(elem))
    setName('');
    setLink('');
    dispath(openCloseModalAction({ open: false, text: '', parent: -1, func: () => { } }));
    dispath(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    e.stopPropagation();
}

export const addToListExpired = (e, value, setValue, parent, dispath) => {
    const jwt = require('jsonwebtoken');
    const now = new Date();
    const diff = new Date(value - now);
    const name = 'Элемент пропадет через ' + timeFormater(diff.getHours() - 3) + ':' + timeFormater(diff.getMinutes()) + ':' + timeFormater(diff.getSeconds());

    const elem = {
        id: Date.parse(now.toString()),
        name: name,
        expiredAt: Date.parse(value.toString()),
        parent: parent,
        timer: true,
        edit: false,
    }

    const token = jwt.sign({
        exp: value / 1000,
        data: elem
    }, 'secret');
    localStorage.setItem(Date.parse(now.toString()), token);

    dispath(addElemAction(elem))
    setValue('');
    dispath(openCloseModalAction({ open: false, text: '', parent: -1, func: () => { } }));
    dispath(openCloseAlertAction({ open: true, text: 'Элемент добавлен в список', severity: 'success' }));
    e.stopPropagation();
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

export const openEditorElem = (e, elem, dispath) => {
    clearTimeout(timer);
    prevent = true;

    elem.edit = true;
    dispath(updateElemAction(elem));

    setTimeout(() => {
        prevent = false;
    }, delay);
    e.stopPropagation()
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

const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]