import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userReducer";
import axios from "axios";

const Nav = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    axios
      .get("/user/logout")
      .then((res) => {
        dispatch(logout(res.data));
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/">
        <img alt="logo" />
      </Link>
      <Link to="/">Browse</Link>
      <Link to="/about">About</Link>
      {user ? <Link to="/pro">Pro</Link> : <Link to="/Auth">Pro</Link>}
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/Auth">
          <button>Sign In</button>
        </Link>
      )}
    </div>
  );
};

export default Nav;
