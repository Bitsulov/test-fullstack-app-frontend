import { Link } from "react-router-dom";
import c from "./header.module.scss";
import {useSelector} from "react-redux";
import {selectIsAuthenticated, selectUserInfo} from "entities/user";
import reactIcon from  "shared/icons/react.svg";
import springIcon from "shared/icons/spring-boot.svg";
import {HeaderImgProfile} from "features/headerImgProfile";
import {HeaderButtonProfile} from "features/headerButtonProfile";
import {useEffect} from "react";

export const Header = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const linkElement = isAuthenticated
        ?   <HeaderImgProfile />
        :   <HeaderButtonProfile />
    const linkTo = isAuthenticated ? "/profile" : "/auth";

	return (
		<header className={c.header}>
			<div className="container">
                <div className={c.header_inner}>
                    <Link to="/" className={c.logo_wrapper}>
                        <figure className={c.logo_img_wrapper}>
                            <img src={reactIcon} alt="React icon" className={c.img} />
                            <img src={springIcon} alt="Spring boot icon" className={c.img} />
                        </figure>
                        <div className={c.text_wrapper}>
                            <h2 className={c.logo_title}>Test project</h2>
                            <p className={c.logo_subtitle}>Small fullstack test project</p>
                        </div>
                    </Link>
                    <Link to={linkTo} className={c.profile_link}>
                        {linkElement}
                    </Link>
                </div>
            </div>
		</header>
	)
}
