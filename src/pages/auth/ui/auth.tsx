import {Layout} from "widgets/layout";
import {useEffect, useState} from "react";
import type {FormType} from "../lib/types";
import {login, register} from "entities/user";
import {SignUpForm} from "widgets/signUpForm";
import {SignInForm} from "widgets/signInForm";

export const Auth = () => {
    const [form, setForm] = useState<FormType>("login");

    useEffect(() => {
        const formElement = document.getElementById("form");
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [form]);

	return (
		<Layout>
            {form === "login" ?
                <SignInForm setCurrentForm={setForm} auth={login} />
            :
                <SignUpForm setCurrentForm={setForm} auth={register} />
            }
		</Layout>
	)
}
