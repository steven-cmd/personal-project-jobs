import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userReducer";
import { useState } from "react";
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
  font-weight: bold;
  @media screen and (max-width: 800px) {
    width: 70px;
  }
  width: 101px;
`;

const Img = styled.img`
  height: 40px;
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #d1d1e9;
  align-items: center;
  height: 90px;
  font-weight: bold;
  padding: 20px;
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
  text-align: center;
  width: 30px;
`;

const MiddleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 800px) {
    display: none;
  }
  width: 300px;
`;

const LinkDiv = styled.div`
  a:hover {
    color: #e45858;
    cursor: pointer;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-weight: 800;
  font-size: 20px;
`;

const Burger = styled.button`
  font-size: 35px;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  display: none;
  width: 70px;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
  display: block;
  list-style-type: none;
  background-color: #d1d1e9;

  @media (min-width: 800px) {
    display: none;
  }
`;

const Nav = (props) => {
  const [showMenu, setShowMenu] = useState(false);

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
      <Burger onClick={() => setShowMenu(!showMenu)}>≡</Burger>

      <Link to="/">
        <LogoDiv>
          <Img
            alt="emoji wrench"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/wrench_1f527.png"
          />

          <p>
            Latest <br />
            Skill
          </p>
        </LogoDiv>
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

      {showMenu ? (
        <DropDown>
          <li>
            <LinkDiv>
              <a onClick={() => setShowMenu(!showMenu)}>X Close Menu</a>
            </LinkDiv>
          </li>
          <li>
            <LinkDiv>
              <Link to="/">Browse</Link>
            </LinkDiv>
          </li>
          <li>
            <LinkDiv>
              <Link to="/about">About</Link>
            </LinkDiv>
          </li>
          <li>
            <ProDiv>
              {user ? <Link to="/pro">Pro</Link> : <Link to="/Auth">Pro</Link>}
            </ProDiv>
          </li>
        </DropDown>
      ) : (
        <></>
      )}

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
