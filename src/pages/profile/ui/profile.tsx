import {Layout} from "widgets/layout";
import {ProfileSection} from "widgets/profileSection";
import {useSelector} from "react-redux";
import {selectIsAuthenticated, selectUserInfo} from "entities/user";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Profile = () => {
    const userPrincipal = useSelector(selectUserInfo);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!isAuthenticated) {
    //         alert("Authorization is required to this page");
    //         navigate("/auth");
    //     }
    // }, []);

	return (
		<Layout>
            <ProfileSection userPrincipal={userPrincipal} />
		</Layout>
	)
}
