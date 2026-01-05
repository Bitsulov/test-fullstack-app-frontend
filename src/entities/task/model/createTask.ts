import type { TaskType } from "../lib/types";

export function createTask({
	id,
	title = "",
	description = "",
    status = false,
    creator
}: TaskType) {
	return {id, title, description, status, creator}
}
