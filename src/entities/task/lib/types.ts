import type {UserType} from "entities/user";

export interface TaskType {
	id: number;
	title: string;
	description: string;
    status: boolean;
    user: UserType
}

export interface TaskRequest {
    title: string;
    description: string;
}

export interface TaskStatusRequest {
    status: boolean;
}

export interface TaskPageResponse {
    taskList: TaskType[];
    hasNext: boolean;
    cursor: number;
}
