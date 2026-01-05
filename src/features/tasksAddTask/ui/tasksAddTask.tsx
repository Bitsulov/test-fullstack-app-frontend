import c from "./tasksAddTask.module.scss";
import React from "react";
import {addTaskClickHandler} from "../model/addTaskClickHandler.ts";

interface ITasksAddTaskProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormType: React.Dispatch<React.SetStateAction<string>>
}

export const TasksAddTask = ({ setShowModal, setFormType, ...props }: ITasksAddTaskProps) => {
	return (
        <button
            onClick={e => addTaskClickHandler(e, setShowModal, setFormType)}
            className={c.button}
            {...props}
        >
            Create task +
        </button>
    )
}
