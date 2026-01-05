import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface IProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}});

export function QueryProvider({children}: IProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
