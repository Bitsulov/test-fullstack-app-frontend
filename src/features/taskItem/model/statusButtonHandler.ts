import React from "react";
import type {TaskType} from "entities/task";
import type {AxiosResponse} from "axios";

interface IEditTaskStatus {
    id: number;
    data: {
        status: boolean;
    }
}

type EditTaskStatusFn = ({id, data}: IEditTaskStatus) => Promise<AxiosResponse<string>>;

export async function statusButtonHandler(e: React.MouseEvent, id: number, status: boolean, editTaskStatusApi: EditTaskStatusFn) {
    try {
        await editTaskStatusApi({ id: id, data: { status: !status }});
    } catch(er) {}
}
