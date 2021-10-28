import { addElemAction, removeElemAction, updateElemAction, updateListAction } from "../../store/listReducer";
import { openCloseAlertAction } from "../../store/alertReducer";
import { addDragElemAction } from "../../store/dragElemReducer";
import { openCloseModalAction } from "../../store/modalOpenReducer";
import { addJsonAction } from "../../store/jsonDataReducer";

const delay = 200;
let timer = 0;
let prevent = false; // eslint-disable-line

export const toList = (import_json, dispath, setName) => {
    if (import_json !== null) {
        const str = import_json.replace(/\n/g, '').replace(/-/gm, '');
        dispath(addJsonAction(str));
        if (str.charAt(0) === '[') {
            dispath(updateListAction(JSON.parse(str)));
            dispath(openCloseAlertAction({ open: true, text: 'Список успешно добавлен', severity: 'success' }));
            dispath(openCloseModalAction({ open: false, text: '', parent: -1}));
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
    }
    else {
        dispath(openCloseAlertAction({ open: true, text: 'Не корректное имя элемента', severity: 'error' }));
    }
    e.stopPropagation();
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
    dispath(updateListAction(res));
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

// function findAllChilds(parentId, list) {
//     let childs = [];

//     list.map(item => { // eslint-disable-line
//         if (item.parent === parentId) {
//             childs.push(item);
//         }
//     })

//     return childs;
// }

const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]