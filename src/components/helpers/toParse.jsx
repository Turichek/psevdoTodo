
export const getListIdx = (str, substr) => {
    let listIdx = [];
    let lastIndex = -1;
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
        listIdx.push(lastIndex);
    }
    return listIdx;
}

export const TypeToRegex = (type) => {
    switch (type) {
        case 'input':
            return /(\{\s*(items)\s*:\s*([\w\d,]+)?\})/g;

        case 'img':
            return /(\{\s*(src)\s*:\s*(.*?)\})/g;

        case 'link':
            return /(\{\s*name\s*:\s*([\w\d\s,]+)?,\s*link:\s*(.*?)\})/g;

        case 'datepicker':
            return /(\{\s*(date)\s*:\s*([\w\d./]+)?\})/g;

        case 'timepicker':
            return /(\{\s*(time)\s*:\s*([\w\d:]+)?\})/g;

        case 'expired':
            return /(\{\s*(expiredAt)\s*:\s*([\w\d:]+)?\})/g;

        case 'withCheckBox':
            return /(\{\s*(name)\s*:\s*([\w\d\s,.:]+)?\})/g;

        case 'sublist':
            return /(\s*(name)\s*:\s*([\w\d\s.:]+)?\s*,\s*(elems)\s*:\s*(\[[\s\d\w\S\D\W]+?\])|\s*(name)\s*:\s*([\w\d\s.:]+)?\s*|\s*(href)\s*:\s*([\w\d.:]+)?\s*\})/g;

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

export const ChangeStr = (str, regex) => {
    const elems = [...str.matchAll(regex)];
    console.log(elems);
}