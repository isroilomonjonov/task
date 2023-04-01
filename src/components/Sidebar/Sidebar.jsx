import styles from './Sidebar.module.css';
import navbar from '../../utils/navbar';

import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

import SidebarList from './SidebarList';
import Button from '../Generics/Button/Button';


const Sidebar = () => {
	const location = useLocation();
	const { user } = useContext(AppContext);
	const ctx = useContext(AppContext);

	function logOut() {
		ctx.onReset();
	}

	return (
		<aside className={styles['aside']}>
			<nav className={styles['aside__menu']}>
				<ul className={styles['aside__list']}>
					<SidebarList list={navbar} styles={styles} location={location} />
				</ul>
			</nav>
			<div className={styles["aside__user"]}>
			
				<Button
						size='big'
						mode='orange'
						className='main-text'
						onClick={logOut}
					>
						Log out
					</Button>
			</div>
		</aside>
	)
}

export default Sidebar;