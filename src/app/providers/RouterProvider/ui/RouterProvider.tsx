import { Main } from "pages/main";
import { Error } from "pages/error";
import { Tasks } from "pages/tasks";
import { Routes, Route } from "react-router-dom";
import {Auth} from "pages/auth";
import {Profile} from "pages/profile";

const RouterProvider = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export { RouterProvider };
