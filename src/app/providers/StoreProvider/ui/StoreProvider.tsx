import { Provider } from "react-redux";
import { store } from "../../../store";
import type { ReactNode } from "react";

interface StorePropsType {
    children?: ReactNode;
};

export const StoreProvider = ({ children }: StorePropsType) => {
    return <Provider store={store}>{children}</Provider>;
};
