import c from "./taskItem.module.scss";
import type {UserType} from "entities/user";
import React from "react";
import {statusButtonHandler} from "../model/statusButtonHandler";
import {deleteTaskHandler} from "../model/deleteTaskHandler";
import {deleteTask, type TaskType, updateStatus} from "entities/task";
import {editTaskHandler} from "../model/editTaskHandler";
import {useMutation} from "@tanstack/react-query";
import type {AxiosError} from "axios";
import type {AppError} from "shared/lib/types";
import {ROLES} from "entities/role";

interface ITaskItemProps {
    id: number;
    title: string;
    description: string;
    creator: UserType;
    status: boolean;
    setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
    idPrincipal: number;
    rolePrincipal: ROLES;
    setFormType: React.Dispatch<React.SetStateAction<string>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaultTitleValue: React.Dispatch<React.SetStateAction<string>>;
    setDefaultDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
    setEditingTaskId: React.Dispatch<React.SetStateAction<number>>
}

export const TaskItem = ({
    id = 0,
    title = "loading...",
    creator,
    description = "loading...",
    status = false,
    idPrincipal,
    rolePrincipal,
    setTasksList,
    setFormType,
    setShowModal,
    setDefaultTitleValue,
    setDefaultDescriptionValue,
    setEditingTaskId,
    ...props
}: ITaskItemProps) => {
    const isAdmin = rolePrincipal === ROLES.ADMIN;
    const isYourTask = (creator?.id || 0) === idPrincipal;
    const creatorText = creator.name ? isYourTask ? `${creator?.name} (You)` : creator?.name : "no name data";
    const statusText = status ? "Completed" : "Uncompleted";
    const statusButtonClassname = status ? c.status_button_completed : c.status_button;

    interface IUpdateTaskStatus {
        id: number;
        data: {
            status: boolean;
        }
    }

    const editTaskStatusMutation = useMutation({
        mutationFn: ({id, data}: IUpdateTaskStatus) => updateStatus(id, data),
        onSuccess: (_, variables) => {
            setTasksList(tasks =>
                tasks.map(task =>
                    task.id === variables.id
                        ? { ...task, status: !task.status }
                        : task
                )
            );
        },
        onError: (error: AxiosError<AppError>) => {
            console.error(error.response?.data.message);
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: number) => deleteTask(id),
        onSuccess: (_, id) => {
            setTasksList(tasks =>
                tasks.filter(task => task.id !== id)
            );
        },
        onError: (error: AxiosError<AppError>) => {
            console.error(error.response?.data.message);
        },
    });

	return (
		<article className={c.task} {...props}>
            <div className={c.task_top}>
                <h3 className={c.title}>{title}</h3>
                <p className={c.creator}>{creatorText}</p>
            </div>
            <p className={c.description}>{description}</p>
            {(isAdmin || isYourTask) && (
                <div className={c.buttons}>
                    {isYourTask && (
                        <button
                            onClick={e => statusButtonHandler(e, id, status, editTaskStatusMutation.mutateAsync)}
                            className={`${c.button} ${statusButtonClassname}`}
                        >
                            {statusText}
                        </button>
                    )}
                    <div className={c.buttons_right}>
                        {isYourTask && (
                            <button
                                onClick={e =>
                                    editTaskHandler(
                                        e,
                                        setFormType,
                                        setShowModal,
                                        title,
                                        description,
                                        id,
                                        setDefaultTitleValue,
                                        setDefaultDescriptionValue,
                                        setEditingTaskId,
                                    )}
                                className={`${c.button} ${c.edit_button}`}
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={e => deleteTaskHandler(e, id, deleteTaskMutation.mutateAsync)}
                            className={`${c.button} ${c.delete_button}`}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
		</article>
	)
}
