import type {FieldValues} from "react-hook-form";
import type React from "react";
import type {TaskType} from "entities/task";
import type {UserType} from "entities/user";
import {splitArrayByCondition} from "shared/lib/splitArrayByCondition";
import type {AxiosResponse} from "axios";
import type {ITaskForm} from "../lib/types";
import type {QueryClient} from "@tanstack/react-query";

type addTaskFn = (data: ITaskForm) => Promise<AxiosResponse<TaskType>>;

interface IEditTaskFn {
    id: number;
    data: ITaskForm
}

export async function submitValidHandler(
    data: FieldValues,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    formType: string,
    editingTaskId: number,
    addTask: addTaskFn,
    editTask: ({id, data}: IEditTaskFn) => Promise<AxiosResponse<string>>,
    queryClient: QueryClient,
    e?: React.BaseSyntheticEvent
) {
    try {
        if(formType === "add") {
            await addTask({title: data.title, description: data.description});
        } else {
            await editTask({ id: editingTaskId, data: {title: data.title, description: data.description}});
        }
        await queryClient.invalidateQueries({ queryKey: ["my-tasks"]});
        setShowModal(false);
    } catch (error) {}
}
