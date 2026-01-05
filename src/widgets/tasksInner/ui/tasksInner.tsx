import c from "./tasksInner.module.scss";
import {TasksAddTask} from "features/tasksAddTask";
import {TasksList} from "widgets/tasksList";
import type {TaskType} from "entities/task";
import type {UserType} from "entities/user";
import React, {useEffect, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {getMyTasks} from "entities/task";

interface ITasksInnerProps {
    tasksList: TaskType[];
    setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
    setMyTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    userPrincipal: UserType;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormType: React.Dispatch<React.SetStateAction<string>>;
    setDefaultTitleValue: React.Dispatch<React.SetStateAction<string>>;
    setDefaultDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
    setEditingTaskId: React.Dispatch<React.SetStateAction<number>>
    fetchNewPage: () => void;
    hasNextPage: boolean
}

export const TasksInner = ({
    tasksList,
    setTasksList,
    setMyTasks,
    userPrincipal,
    setShowModal,
    setFormType,
    setDefaultTitleValue,
    setDefaultDescriptionValue,
    setEditingTaskId,
    fetchNewPage,
    hasNextPage,
    ...props
}: ITasksInnerProps) => {
    const loadingRef = useRef<HTMLHeadingElement>(null);

    const { data } = useQuery({
        queryKey: ["my-tasks"],
        queryFn: getMyTasks,
        enabled: true
    });

    useEffect(() => {
        if (!data?.data) return;

        setTasksList(prevTasks => [
            ...data.data.filter(newTask => !prevTasks.some(t => t.id === newTask.id)),
            ...prevTasks
        ]);
    }, [data]);

    useEffect(() => {
        const scrollHandler = () => {
            if(loadingRef.current) {
                const rect = loadingRef.current.getBoundingClientRect();
                const offset = 500;
                if (rect.top < window.innerHeight + offset) {
                    fetchNewPage();
                }
            }
        }
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

	return (
		<section className={c.tasksInner} {...props}>
			<div className="container">
                <div className={c.top_wrapper}>
                    <h1 className={c.title}>Tasks feed</h1>
                    <TasksAddTask setFormType={setFormType} setShowModal={setShowModal} />
                </div>
                <TasksList
                    setTasksList={setTasksList}
                    tasksList={tasksList}
                    idPrincipal={userPrincipal.id}
                    rolePrincipal={userPrincipal.role}
                    setFormType={setFormType}
                    setShowModal={setShowModal}
                    setDefaultTitleValue={setDefaultTitleValue}
                    setDefaultDescriptionValue={setDefaultDescriptionValue}
                    setEditingTaskId={setEditingTaskId}
                />
                {hasNextPage &&
                    <h2 ref={loadingRef} className={c.list_empty_title}>loading...</h2>
                }
            </div>
		</section>
	)
}
