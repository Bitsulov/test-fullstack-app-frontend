import c from "./headerButtonProfile.module.scss";

export const HeaderButtonProfile = ({ ...props }) => {
	return (
        <div className={c.enter_wrapper} {...props}>
            <p className={c.enter_button}>Enter</p>
        </div>
	)
}
