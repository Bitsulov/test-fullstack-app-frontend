import React from "react";

export function editTaskHandler(
    e: React.MouseEvent,
    setFormType: React.Dispatch<React.SetStateAction<string>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    description: string,
    id: number,
    setDefaultTitleValue: React.Dispatch<React.SetStateAction<string>>,
    setDefaultDescriptionValue: React.Dispatch<React.SetStateAction<string>>,
    setEditingTaskId: React.Dispatch<React.SetStateAction<number>>
) {
    setFormType("edit");
    setDefaultTitleValue(title);
    setDefaultDescriptionValue(description);
    setEditingTaskId(id);
    setShowModal(true);
}
