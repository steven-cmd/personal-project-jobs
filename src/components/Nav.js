import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userReducer";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
  background: #6246ea;
  border-radius: 3px;
  border: 2px solid #6246ea;
  color: #fffffe;
`;

const Img = styled.img`
  height: 40px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d1d1e9;
`;

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
    <Div>
      <Link to="/">
        <Img
          alt="emoji wrench"
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/wrench_1f527.png"
        />

        <span>Latest Skill</span>
      </Link>
      <div>
        <Link to="/">Browse</Link>
        <Link to="/about">About</Link>
        {user ? <Link to="/pro">Pro</Link> : <Link to="/Auth">Pro</Link>}
      </div>

      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Link to="/Auth">
          <Button>Sign In</Button>
        </Link>
      )}
    </Div>
  );
};

export default Nav;
