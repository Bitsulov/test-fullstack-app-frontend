import { Footer } from "widgets/footer";
import c from "./layout.module.scss";
import { Header } from "widgets/header";
import type { ReactNode } from "react";

interface LayoutPropsType {
	children?: ReactNode;
}

export const Layout = ({ children, ...props }: LayoutPropsType) => {
	return (
		<div className={c.wrapper}>
			<Header />
			<main className={c.main} {...props}>
				{children}
			</main>
			<Footer />
		</div>
	)
}
