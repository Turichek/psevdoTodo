import React from "react";
import ViewItemsList from "./ViewItemsList";

export default function ViewTodo({ mainListId }) {
    return (
        <>
            <ViewItemsList parent={mainListId} />
        </>
    )
}