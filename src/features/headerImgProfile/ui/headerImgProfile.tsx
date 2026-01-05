import c from "./headerImgProfile.module.scss";
import avatarDefault from "shared/icons/avatar-default.png";

export const HeaderImgProfile = ({ ...props }) => {
	return (
        <figure className={c.profile_img_wrapper} {...props}>
            <img src={avatarDefault} alt="Avatar icon" draggable="false" className={c.profile_img} />
        </figure>
	)
}
