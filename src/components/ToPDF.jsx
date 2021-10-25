import { Button } from "@mui/material";
import React from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from "react-redux";
import { addJsonAction } from "../store/jsonDataReducer";
import MyDocument from "./MyDocument";

export default function ToPDF() {
    const dispath = useDispatch();
    const list = useSelector(state => state.list.elems);
    const json = useSelector(state => state.json.str);
    dispath(addJsonAction(JSON.stringify(list)))

    return (
        <PDFDownloadLink document={<MyDocument json={json} />}
            fileName={Date.now() + '.pdf'} style={{ color: 'white', textDecoration: "none", }}>
            <Button variant='contained'>
                To PDF
            </Button>
        </PDFDownloadLink>

    )
}