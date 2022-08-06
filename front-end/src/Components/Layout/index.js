import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";

const Layout = () => {
  const auth = useAuth();
  const userData = useUserData();

  const handleLogout = () => {
    auth.singOut();
  };
  return (
    <div>
      <nav>
        {userData.role === "admin" && <button>
          <NavLink to="admin/users">Users</NavLink>
        </button>}
        <button>
          <NavLink to="list"> List</NavLink>
        </button>
        <button>
          <NavLink to="profile">Profile</NavLink>
        </button>
        <button onClick={handleLogout}>LogOut</button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
