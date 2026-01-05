import type React from "react";
import type {AxiosResponse} from "axios";

type DeleteTaskFn = (id: number) => Promise<AxiosResponse<string>>;

export async function deleteTaskHandler(e: React.MouseEvent, id: number, deleteTaskApi: DeleteTaskFn) {
    try {
        await deleteTaskApi(id)
    } catch(er) {}
}
