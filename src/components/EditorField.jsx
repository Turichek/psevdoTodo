import { TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPsevdoCodeAction } from "../store/psevdoCodeReducer";

export default function EditorField() {
    const dispatch = useDispatch();
    const psevdo = useSelector(state => state.psevdo.text);
    const [text, setText] = useState(psevdo);
    const [strAdded,setStrAdded] = useState(false);

    const EditText = (e) => {
        setText(e.target.value);
    }

    const addStrForPsevdo = () => {
        try {
            const toFindElems = /(elems):\s*(\[[\s\d\w\S\D\W]+?\])/;
            const elems = psevdo.match(toFindElems);
            

            if(elems === null && strAdded === false){
                const findType = /((\btype\b)\s*:\s*(\bsublist\b|\binput\b|\bwithCheckBox\b|\bdatepicker\b|\btimepicker\b|\bimg\b|\blink\b|\bexpired\b))/;
                const type = psevdo.match(findType)[3];

                switch (type) {
                    case 'input':
                        setText(text + "\n\nelems:[\n\t{items: }\n]");
                        setStrAdded(true);
                        break;

                    case 'img':
                        setText(text + "\n\nelems:[\n\t{src: }\n]");
                        setStrAdded(true);
                        break;

                    case 'link':
                        setText(text + "\n\nelems:[\n\t{name: , link: }\n]");
                        setStrAdded(true);
                        break;

                    case 'datepicker':
                        setText(text + "\n\nelems:[\n\t{date: }\n]");
                        setStrAdded(true);
                        break;

                    case 'timepicker':
                        setText(text + "\n\nelems:[\n\t{time: }\n]");
                        setStrAdded(true);
                        break;

                    case 'expired':
                        setText(text + "\n\nelems:[\n\t{expiredAt: }\n]");
                        setStrAdded(true);
                        break;

                    case 'withCheckBox':
                        setText(text + "\n\nelems:[\n\t{name: }\n]");
                        setStrAdded(true);
                        break;

                    case 'sublist':
                        setText(text + "\n\nelems:[\n\t{name:  ,\n\t\telems:[\n\t\t\t{name:  }\n\t\t]\n\t}\n]");
                        setStrAdded(true);
                        break;
                    default:
                        break;
                }
            }
            else {
                setStrAdded(false);
            }
        }
        catch {
            setStrAdded(false);
        }
        dispatch(addPsevdoCodeAction(text));
    }

    useEffect(() => {
        addStrForPsevdo();
    })

    return (
        <TextField sx={{ width: 1, height: 1 }}
            multiline variant='outlined'
            onChange={(e) => EditText(e)} value={text}
        />
    )
}