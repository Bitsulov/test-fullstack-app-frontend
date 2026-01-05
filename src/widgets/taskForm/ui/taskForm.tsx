import c from "./taskForm.module.scss";
import React, {useEffect, useState} from "react";
import {createTask, type TaskType, updateTask} from "entities/task";
import {useForm} from "react-hook-form";
import {FieldInput} from "features/fieldInput";
import type {ITaskForm} from "../lib/types";
import {ActionButton} from "features/actionButton";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import type {UserType} from "entities/user";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {splitArrayByCondition} from "shared/lib/splitArrayByCondition";

interface ITaskFormProps {
    setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userPrincipal: UserType;
    defaultTitleValue: string;
    defaultDescriptionValue: string;
    formType: string;
    editingTaskId: number;
}

export const TaskForm = ({
    setTasksList,
    setShowModal,
    userPrincipal,
    defaultTitleValue,
    defaultDescriptionValue,
    formType,
    editingTaskId,
    ...props
}: ITaskFormProps) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ITaskForm>({ shouldFocusError: false });
    const [submitClasses, setSubmitClasses] = useState(c.submit);
    const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);
    const [titleText, setTitleText] = useState<string>("");
    const [buttonText, setButtonText] = useState<string>("");

    const queryClient = useQueryClient();

    const addTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: (response) => {
            setTasksList(tasks => [
                {
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    status: response.data.status,
                    user: response.data.user
                },
                ...tasks
            ]);
        },
        onError: (error) => {
            console.error(`Ошибка создания задачи: ${error}`);
        },
    });

    interface IUpdateTask {
        id: number;
        data: ITaskForm;
    }

    const editTaskMutation = useMutation({
        mutationFn: ({id, data}: IUpdateTask) => updateTask(id, data),
        onSuccess: (response, request) => {
            setTasksList(tasks => {
                const {before, separator, after} = splitArrayByCondition(tasks, i => i.id === editingTaskId);

                return separator !== null ? [
                    ...before,
                    {
                        id: request.id,
                        title: request.data.title,
                        description: request.data.description,
                        status: false,
                        user: userPrincipal
                    },
                    ...after
                ] : before;
            });
        },
        onError: (error) => {
            console.error(error.message);
        },
    });

    const titleValue = watch("title");
    const descriptionError = watch("description");

    const transition = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"));

    useEffect(() => {
        isErrorSubmit ? setSubmitClasses(`${c.submit} ${c.error}`) : setSubmitClasses(c.submit);
    }, [isErrorSubmit]);

    useEffect(() => {
        if(formType === "add") {
            setTitleText("Creating task");
            setButtonText("Create");
            setValue("title", "");
            setValue("description", "");
        } else {
            setTitleText("Editing Task");
            setButtonText("Edit");
            setValue("title", defaultTitleValue);
            setValue("description", defaultDescriptionValue);
        }
    }, [formType]);

	return (
		<form
            onSubmit={handleSubmit(
                (data, e) =>
                    submitValidHandler(
                        data,
                        setShowModal,
                        formType,
                        editingTaskId,
                        addTaskMutation.mutateAsync,
                        editTaskMutation.mutateAsync,
                        queryClient,
                        e
                    ),
                (data, e) =>
                    submitInvalidHandler(
                        data,
                        setIsErrorSubmit,
                        transition,
                        e
                    )
            )}
            className={c.form}
            {...props}
        >
            <h2 className={c.title}>{titleText}</h2>
            <div className={c.inputs}>
                <FieldInput
                    {...register("title", {
                        minLength: {
                            value: 5,
                            message: "Title cannot be shorter 5 symbols"
                        },
                        maxLength: {
                            value: 20,
                            message: "Title cannot be longer 20 symbols"
                        },
                        required: "Title is required"
                    })}
                    type="text"
                    className={errors.title ? c.error : ""}
                    currentValue={titleValue}
                    placeholder="Enter task title"
                    errorText={errors.title?.message || ""}
                />
                <FieldInput
                    {...register("description", {
                        minLength: {
                            value: 30,
                            message: "Description cannot be shorter 30 symbols"
                        },
                        maxLength: {
                            value: 1000,
                            message: "Description cannot be longer 1000 symbols"
                        },
                        required: "Description is required"
                    })}
                    type="text"
                    className={errors.description ? c.error : ""}
                    currentValue={descriptionError}
                    placeholder="Enter task description"
                    errorText={errors.description?.message || ""}
                />
            </div>
            <ActionButton className={submitClasses} type="submit">
                {buttonText}
            </ActionButton>
		</form>
	)
}
