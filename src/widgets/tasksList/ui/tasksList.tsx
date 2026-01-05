import c from "./tasksList.module.scss";
import type {TaskType} from "entities/task";
import {TaskItem} from "features/taskItem";
import type React from "react";
import {ROLES} from "entities/role";

interface ITasksListProps {
    tasksList: TaskType[];
    setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
    idPrincipal: number;
    rolePrincipal: ROLES;
    setFormType: React.Dispatch<React.SetStateAction<string>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaultTitleValue: React.Dispatch<React.SetStateAction<string>>;
    setDefaultDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
    setEditingTaskId: React.Dispatch<React.SetStateAction<number>>
}

export const TasksList = ({
    tasksList,
    setTasksList,
    idPrincipal,
    rolePrincipal,
    setFormType,
    setShowModal,
    setDefaultTitleValue,
    setDefaultDescriptionValue,
    setEditingTaskId,
    ...props
}: ITasksListProps) => {
	return (
		<div className={c.list} {...props}>
            {tasksList.length !== 0 &&
                tasksList.map(task => (
                    <TaskItem
                        id={task.id}
                        title={task.title}
                        status={task.status}
                        creator={task.user}
                        description={task.description}
                        idPrincipal={idPrincipal}
                        rolePrincipal={rolePrincipal}
                        setTasksList={setTasksList}
                        setFormType={setFormType}
                        setShowModal={setShowModal}
                        setDefaultTitleValue={setDefaultTitleValue}
                        setDefaultDescriptionValue={setDefaultDescriptionValue}
                        setEditingTaskId={setEditingTaskId}
                        key={task.id}
                    />
                ))
            }
		</div>
	)
}
