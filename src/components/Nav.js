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
  :hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

const Img = styled.img`
  height: 40px;
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d1d1e9;
  align-items: center;
`;

const ProDiv = styled.div`
  background-color: #e45858;
  color: #fffffe;
  :hover {
    filter: brightness(90%);
  }
  margin: 5px;
  padding: 3px;
  border-radius: 3px;
  border: 2px solid #e45858;
`;

const MiddleDiv = styled.div`
  display: flex;
`;

const LinkDiv = styled.div`
  a:hover {
    color: #e45858;
  }
  margin: 5px;
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
    <MainDiv>
      <Link to="/">
        <Img
          alt="emoji wrench"
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/wrench_1f527.png"
        />

        <span>Latest Skill</span>
      </Link>
      <MiddleDiv>
        <LinkDiv>
          <Link to="/">Browse</Link>
        </LinkDiv>
        <LinkDiv>
          <Link to="/about">About</Link>
        </LinkDiv>
        <ProDiv>
          {user ? <Link to="/pro">Pro</Link> : <Link to="/Auth">Pro</Link>}
        </ProDiv>
      </MiddleDiv>

      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Link to="/Auth">
          <Button>Sign In</Button>
        </Link>
      )}
    </MainDiv>
  );
};

export default Nav;
