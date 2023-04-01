import useId from "../hooks/useId";

// components
import Login from "../pages/login/login";
import MainPage from "../pages/main-page/main-page";
// icons
import DashboardIcon from "../assets/icons/DashboardIcon";
import SearchPage from "../pages/search-page/search-page";

const navbar = [
	{
		id: useId,
		element: <MainPage />,
		title: "Main",
		path: "/main",
		icon(isDark) {
			return <DashboardIcon isDark={isDark} />;
		},
		private: true,
		hidden: false,
	},
	{
		id: useId,
		element: <SearchPage />,
		title: "Search",
		path: "/search",
		icon(isDark) {
			return <DashboardIcon isDark={isDark} />;
		},
		private: true,
		hidden: false,
	},
	{
		id: useId,
		element: <Login />,
		title: "Login",
		path: "/login",
		private: true,
		hidden: true,
	},

];

export default navbar;
