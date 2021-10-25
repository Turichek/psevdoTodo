import React from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addElemAction, updateElemAction } from "../store/listReducer";
import Sublist from "./Sublist";

export default function ViewList({ mainListId }) {
    const dispath = useDispatch();
    const list = useSelector(state => state.list.elems);
    console.log(mainListId);

    const addToList = (name, parent) => {
        const elem = {
            id: Date.now(),
            name: name,
            parent: parent,
            childs: false,
        }
        dispath(addElemAction(elem))
    }

    const addSublist = (elem) => {
        elem.childs = true;
        dispath(updateElemAction(elem));
    }

    return (
        <>
            <List key={mainListId}>
                {
                    list.map(elem =>
                        elem.parent === mainListId ?
                            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                                onClick={() => addSublist(elem)} key={elem.id}>
                                <Box>{elem.name}</Box>
                                {elem.childs !== false ? <Sublist parentId={elem.id} /> : <></>}
                            </ListItem>
                            :
                            <ListItem key={elem.id} sx={{ display: 'none'}}></ListItem>
                    )

                }
            <Button variant='contained' onClick={() => addToList(prompt(), mainListId)}>Add to List</Button>
            </List>
            
        </>
    )
}