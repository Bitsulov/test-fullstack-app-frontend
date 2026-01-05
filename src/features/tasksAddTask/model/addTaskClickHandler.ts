import React from "react";

export function addTaskClickHandler(
    e: React.MouseEvent,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setFormType: React.Dispatch<React.SetStateAction<string>>
) {
    setFormType("add");
    setShowModal(true);
}
