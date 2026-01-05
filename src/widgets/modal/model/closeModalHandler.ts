import React from "react";

export function closeModalHandler(
    e: React.MouseEvent,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) {
    setShowModal(false);
}
