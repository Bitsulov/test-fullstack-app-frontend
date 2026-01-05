import type {TaskPageResponse, TaskRequest, TaskStatusRequest, TaskType} from "../lib/types";
import {api} from "shared/api/instance";
import type {AxiosResponse} from "axios";
import {getTasksLimitConst} from "../const/getTasksLimitConst";
import type {QueryFunctionContext} from "@tanstack/react-query";

const urls = {
    baseUrl: "/tasks",
    getTasks: function () { return `${this.baseUrl}` },
    getMyTasks: function () { return `${this.baseUrl}/my` },
    getTask: function (id: number) { return `${this.baseUrl}/${id}` },
    createTask: function () { return `${this.baseUrl}` },
    updateTask: function (id: number) { return `${this.baseUrl}/${id}` },
    patchTask: function (id: number) { return `${this.baseUrl}/${id}` },
    updateStatus: function (id: number) { return `${this.baseUrl}/${id}/status` },
    deleteTasks: function () { return `${this.baseUrl}` },
    deleteTask: function (id: number) { return `${this.baseUrl}/${id}` },
}

interface IGetTasks {
    pageParam: number;
}

export const getTasks = ({ pageParam }: IGetTasks): Promise<AxiosResponse<TaskPageResponse>> => {
    const limit = getTasksLimitConst;
    console.log("Calling tasks");
    return api.get(urls.getTasks(), {params: {cursor: pageParam, limit: limit}});
}

export const getMyTasks = (): Promise<AxiosResponse<TaskType[]>> => {
    console.log("Calling my tasks");
    return api.get(urls.getMyTasks());
}

export const getTask = (id: number): Promise<AxiosResponse<TaskType[]>> => {
    console.log("Calling task", id);
    return api.get(urls.getTask(id));
}

export const createTask = (data: TaskRequest): Promise<AxiosResponse<TaskType>> => {
    console.log("Calling create task", data);
    return api.post(urls.createTask(), data);
}

export const updateTask = (id: number, data: TaskRequest): Promise<AxiosResponse<string>> => {
    console.log("Calling update task", data);
    return api.put(urls.updateTask(id), data);
}

export const patchTask = (id: number, data: Partial<TaskRequest>): Promise<AxiosResponse<string>> => {
    console.log("Calling patch task", data);
    return api.put(urls.patchTask(id), data);
}

export const updateStatus = (id: number, data: TaskStatusRequest): Promise<AxiosResponse<string>> => {
    console.log("Calling update task status", data);
    return api.put(urls.updateStatus(id), data);
}

export const deleteTasks = (): Promise<AxiosResponse<string>> => {
    console.log("Calling delete tasks");
    return api.delete(urls.deleteTasks());
}

export const deleteTask = (id: number): Promise<AxiosResponse<string>> => {
    console.log("Calling delete task", id);
    return api.delete(urls.deleteTask(id));
}
