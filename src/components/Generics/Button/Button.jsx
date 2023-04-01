import styles from "./Button.module.css";

const Button = ({ children, type, mode, size, newFont, className, ...rest }) => {
	return (
		<button
			type={type || 'button'}
			className={`${styles.button} ${newFont && styles['new-font']} ${styles[mode]} ${styles[size]} ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button;