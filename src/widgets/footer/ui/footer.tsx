import c from "./footer.module.scss";
import tsIcon from "shared/icons/ts.svg";
import reactIcon from "shared/icons/react.svg";
import reduxIcon from "shared/icons/redux.svg";
import viteIcon from "shared/icons/vite.svg";
import javaIcon from "shared/icons/java.svg";
import springIcon from "shared/icons/spring-boot.svg";
import postgreIcon from "shared/icons/postresql.svg";
import {Link} from "react-router-dom";

export const Footer = () => {
	return (
		<footer className={c.footer}>
			<div className="container">
                <div className={c.footer_inner}>
                    <h2 className={c.title}>Technologies</h2>
                    <div className={c.sections}>
                        <div className={c.section}>
                            <h3 className={c.title}>Frontend</h3>
                            <div className={c.items}>
                                <Link target="_blank" to="https://www.typescriptlang.org/">
                                    <img src={tsIcon} alt="TypeScript icon" className={c.item} />
                                </Link>
                                <Link target="_blank" to="https://react.dev/">
                                    <img src={reactIcon} alt="React icon" className={c.item} />
                                </Link>
                                <Link target="_blank" to="https://redux-toolkit.js.org/">
                                    <img src={reduxIcon} alt="Redux icon" className={c.item} />
                                </Link>
                                <Link target="_blank" to="https://vite.dev/">
                                    <img src={viteIcon} alt="Vite icon" className={c.item} />
                                </Link>
                            </div>
                        </div>
                        <div className={c.section}>
                            <h3 className={c.title}>Backend</h3>
                            <div className={c.items}>
                                <Link target="_blank" to="https://www.java.com/">
                                    <img src={javaIcon} alt="Java icon" className={c.item} />
                                </Link>
                                <Link target="_blank" to="https://spring.io/">
                                    <img src={springIcon} alt="Spring boot icon" className={c.item} />
                                </Link>
                                <Link target="_blank" to="https://www.postgresql.org/">
                                    <img src={postgreIcon} alt="PostgreSql icon" className={c.item} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</footer>
	)
}
