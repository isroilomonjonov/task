import styles from './Layout.module.css';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ innerRoute, children }) => {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<section className={styles['layout__right']}>
				<div className={styles['layout__child']}>
					{children}
				</div>
			</section>
		</div>
	)
}

export default Layout;