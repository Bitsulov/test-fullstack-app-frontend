import {Layout} from "widgets/layout";
import {TasksInner} from "widgets/tasksInner";
import {getTasks, type TaskType} from "entities/task";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import {Modal} from "widgets/modal";
import {useEffect, useState} from "react";
import {TaskForm} from "widgets/taskForm";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useLocation} from "react-router-dom";

export const Tasks = () => {
    const userPrincipal = useSelector(selectUserInfo);
    const [tasksList, setTasksList] = useState<TaskType[]>([]);
    const [myTasks, setMyTasks] = useState<TaskType[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>("add");
    const [defaultTitleValue, setDefaultTitleValue] = useState<string>("");
    const [defaultDescriptionValue, setDefaultDescriptionValue] = useState<string>("");
    const [editingTaskId, setEditingTaskId] = useState<number>(0);
    const location = useLocation();

    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
        getNextPageParam: (lastPage) => {
            const lastTasks = lastPage.data.taskList;
            if(!lastTasks || lastTasks.length === 0) return null;
            return lastTasks[lastTasks.length - 1].id;
        },
        initialPageParam: 0
    });

    useEffect(() => {
        queryClient.removeQueries({ queryKey: ["tasks"]});
    }, [location.pathname]);

    useEffect(() => {
        if (!data?.pages || data.pages.length === 0) return;

        const lastTasks = data?.pages[data?.pages.length - 1].data.taskList;
        if(lastTasks?.length) setTasksList(tasks => [...myTasks, ...tasks, ...lastTasks.filter(task => task.user.id !== userPrincipal.id)]);
    }, [data]);

    // useEffect(() => {
    //     if (!data?.pages || data.pages.length === 0) return;
    //
    //     const lastTasks = data.pages[data.pages.length - 1].data.taskList;
    //
    //     if(lastTasks?.length) {
    //         setTasksList(tasks => [
    //             ...tasks,
    //             ...lastTasks.filter(task =>
    //                 task.user.id !== userPrincipal.id &&
    //                 !tasks.some(x => x.id === task.id)
    //             )
    //         ]);
    //     }
    // }, [data]);

    useEffect(() => {
        setTasksList(tasks => [...myTasks, ...tasks]);
    }, [myTasks]);

	return (
		<Layout>
            <Modal setShow={setShowModal} show={showModal}>
                <TaskForm
                    defaultTitleValue={defaultTitleValue}
                    defaultDescriptionValue={defaultDescriptionValue}
                    userPrincipal={userPrincipal}
                    setShowModal={setShowModal}
                    setTasksList={setTasksList}
                    formType={formType}
                    editingTaskId={editingTaskId}
                />
            </Modal>
			<TasksInner
                tasksList={tasksList}
                setTasksList={setTasksList}
                setMyTasks={setMyTasks}
                userPrincipal={userPrincipal}
                setShowModal={setShowModal}
                setFormType={setFormType}
                setDefaultTitleValue={setDefaultTitleValue}
                setDefaultDescriptionValue={setDefaultDescriptionValue}
                setEditingTaskId={setEditingTaskId}
                fetchNewPage={fetchNextPage}
                hasNextPage={hasNextPage}
            />
		</Layout>
	)
}
