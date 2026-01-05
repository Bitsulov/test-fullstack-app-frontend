import React, { type JSX} from 'react';
import c from "./mainIntro.module.scss";
import {Link} from "react-router-dom";
import type {UserType} from "entities/user/lib/types.ts";

interface IAuthIntroProps {
    userPrincipal: UserType;
}

export function MainIntro({ userPrincipal, ...props }: IAuthIntroProps): JSX.Element {
    const link: string = userPrincipal.name === "" ? "/auth" : "/tasks";

    return (
        <section className={c.intro} {...props}>
            <div className="container">
                <div className={c.intro_inner}>
                    <h1 className={c.title}>very big attention grabbing title</h1>
                    <p className={c.text}>
                        Hi! This is a Fullstack test application.
                        The frontend is written in React, the backend is in Spring.
                        Here you can create your own tasks, view all tasks created by any user,
                        and add information to your profile. Don't look for any special meaning in this project,
                        you won't find it here. This is just my first fully assembled small system.
                    </p>
                    <Link to={link} className={c.button}>Join us</Link>
                </div>
            </div>
        </section>
    );
}
