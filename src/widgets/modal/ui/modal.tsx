import c from "./modal.module.scss";
import React, {useEffect, useState} from "react";
import {closeModalHandler} from "../model/closeModalHandler.ts";
import {modalClickHandler} from "../model/modalClickHandler.ts";

interface IModalProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode
}

export const Modal = ({ show, setShow, children, ...props }: IModalProps) => {
    const [modalClasses, setModalClasses] = useState<string>(c.modal);
    const [showResult, setShowResult] = useState<boolean>(show);

    const modalHidingTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--modal-hiding-time"));

    useEffect(() => {
        let timer = 0;

        if(show) {
            setShowResult(true);
            setModalClasses(`${c.modal} ${c.show}`);
        } else {
            setModalClasses(`${c.modal} ${c.hide}`);
            timer = setTimeout(() => {
                setShowResult(false)
                setModalClasses(c.modal);
            }, modalHidingTime);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [show]);

	return (
        <>
            {showResult &&
                <dialog onClick={e => closeModalHandler(e, setShow)} className={modalClasses} {...props}>
                    <div onClick={e => modalClickHandler(e)} className={c.modal_inner}>
                        {children}
                    </div>
                    <button
                        onClick={e => closeModalHandler(e, setShow)}
                        className={c.close_button}
                    ></button>
                </dialog>
            }
        </>
	)
}
