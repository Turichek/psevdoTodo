import { insert } from "./toList";

export const getListIdx = (str, substr) => {
    let listIdx = [];
    let lastIndex = -1;
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
        listIdx.push(lastIndex);
    }
    return listIdx;
}

export const TypeToRegex = (type, isFirst = false) => {
    switch (type) {
        case 'input':
            return /(\{\s*(items)\s*:\s*([\w\d,]+)?\s*\})/g;

        case 'img':
            return /(\{\s*(src)\s*:\s*(.*?)\s*\})/g;

        case 'link':
            return /(\{\s*name\s*:\s*([\w\d\s,]+)?,\s*link:\s*(.*?)\s*\})/g;

        case 'datepicker':
            return /(\{\s*(date)\s*:\s*([\w\d./]+)?\s*\})/g;

        case 'timepicker':
            return /(\{\s*(time)\s*:\s*([\w\d:]+)?\s*\})/g;

        case 'expired':
            return /(\{\s*(expiredAt)\s*:\s*([\w\d:]+)?\s*\})/g;

        case 'withCheckBox':
            return /(\{\s*(name)\s*:\s*([\w\d\s,.:]+)?\s*\})/g;

        case 'sublist':
            if (!isFirst) {
                return /(\s*(name)\s*:\s*([\w\d\s.:]+)?\s*,\s*(elems)\s*:\s*(\[[\s\d\w\S\D\W]+?\])|\s*(name)\s*:\s*([\w\d\s.:]+)?\s*|\s*(href)\s*:\s*([\w\d.:]+)?\s*\})/g;
            }
            else {
                return /(\s*(name)\s*:\s*([\w\d\s.:]+)?\s*,\s*(elems)\s*:\s*(\[[\s\d\w\S\D\W]+?#)|\s*(name)\s*:\s*([\w\d\s.:]+)?\s*|\s*(href)\s*:\s*([\w\d.:]+)?\s*\})/g;
            }

        default:
            return;
    }
}

export const reTypeAttr = (value) => {
    if (value === null || value[3] === "false") {
        return value = false;
    }
    else if (value[3] === "true") {
        return value = true;
    }
}

let findSymbolsEndElems;

export const ChangeStr = (str, isReturnSymbol) => {
    if (!isReturnSymbol) {
        const findSymbolsBeginElems = getListIdx(str, '[');
        findSymbolsEndElems = getListIdx(str, ']');
        const arr = str.split('');

        findSymbolsEndElems = CheckToDeleteSymbol(findSymbolsBeginElems, findSymbolsEndElems);
        
        findSymbolsEndElems.reverse();
        for (let i = 0; i < findSymbolsEndElems.length; i++) {
            console.log(arr[findSymbolsEndElems[i]]);
            arr.splice(findSymbolsEndElems[i], 1);
        }
        findSymbolsEndElems.reverse();

        console.log(arr.join(''));
        console.log(findSymbolsBeginElems, 'begin');
        console.log(findSymbolsEndElems, 'end');
        return arr.join('');
    }
    else {
        const diff = str[1].match(/(\s*name\s*:\s*[\w\d\s.:]+?\s*,\s*elems\s*:\s*)/)[1].length + str.index;

        let arr = str[5].split('');
        
        for (let i = 0; i < findSymbolsEndElems.length; i++) {
            if(findSymbolsEndElems[i] - diff > arr.length || findSymbolsEndElems[i] < str.index){
                continue;
            }
            arr = insert(arr, findSymbolsEndElems[i] - diff, ']');
        }

        console.log(arr.join(''));
        return arr.join('');
    }
}

const CheckToDeleteSymbol = (begin, end) => {
    let allSymbols = [];
    let toDelete = [];
    let count = 0;

    begin.forEach(item => {
        allSymbols.push({index: item, symbol: '['})
    })
    end.forEach(item => {
        allSymbols.push({index: item, symbol: ']'})
    })

    allSymbols.sort((a, b) => a.index > b.index ? 1 : -1)
    for(let i = 1;i<allSymbols.length - 1;i++){
        if(allSymbols[i].symbol === '['){
            count++;
        }
        else {
            if(count !== 1){
                toDelete.push(allSymbols[i].index)
            }
            count--;
        }
    }

    console.log(allSymbols);
    return toDelete;
}