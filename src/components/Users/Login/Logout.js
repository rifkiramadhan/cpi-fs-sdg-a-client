import { cookies } from "./Login";

const Logout = () => {
	
	window.localStorage.clear();
	cookies.remove('token')
  window.location.href= '/login'
	return <></>;
};

export default Logout;
