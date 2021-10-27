import { Button } from "@mui/material";
import React from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector } from "react-redux";
import MyDocument from "./MyDocument";

export default function ToPDF() {
    const list = useSelector(state => state.list.elems);
    const infoToPDF = [];

    function addInfoPDF() {
        list.map(elem => { // eslint-disable-line
            infoToPDF.push(Object.values(elem));
        })
    }

    return (
        <PDFDownloadLink document={<MyDocument info={infoToPDF} />}
            fileName={Date.now() + '.pdf'} style={{ color: 'white', textDecoration: "none", }}>
            <Button sx={{width:1}} variant="contained" onClick={addInfoPDF()}>
                To PDF
            </Button>
        </PDFDownloadLink>
    )
}