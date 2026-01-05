import { Layout } from "widgets/layout";
import { MainIntro } from "widgets/mainIntro";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";

export const Main = () => {
    const userPrincipal = useSelector(selectUserInfo);

	return (
		<Layout>
			<MainIntro userPrincipal={userPrincipal} />
		</Layout>
	)
}
