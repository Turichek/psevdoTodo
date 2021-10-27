import { Box, Button, Modal, TextField, Backdrop, Fade } from "@mui/material";
import React,{useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseAlertAction } from "../store/alertReducer";
import { addJsonAction } from "../store/jsonDataReducer";
import { updateListAction } from "../store/listReducer";
import { addMainListIdAction } from "../store/mainListIdReducer";

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FromJson() {
    const dispath = useDispatch();
    const list = useSelector(state => state.list.elems);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toList = (import_json) => {
        if (import_json !== null) {
            const str = import_json.replace(/\n/g, '').replace(/-/gm, '');
            dispath(addJsonAction(str));
            if (str.charAt(0) === '[') {
                dispath(updateListAction(JSON.parse(str)));
                dispath(openCloseAlertAction({ open: true, text: 'Список успешно добавлен', severity: 'success' }));
                setOpen(false);
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

    useEffect(() => {
        if (list.length !== 0) {
            dispath(addMainListIdAction(list[0].parent));
        }
    })

    return (
        <>
            <Button sx={{ width: 1 }} onClick={handleOpen} variant='contained'>Import List</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <TextField label='Введите json для преобразования в список' onChange={(e) => setName(e.target.value)} value={name} variant="standard" />
                        <Button sx={{ mt: 1 }} variant='contained' onClick={() => toList(name)}>Добавить</Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}