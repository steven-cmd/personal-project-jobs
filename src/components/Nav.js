import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userReducer";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #2b2c34;
  color: #2b2c34;
  :hover {
    cursor: pointer;
    background: #e45858;
    border: 2px solid #e45858;
    color: #fffffe;
  }
  font-weight: bold;
  @media screen and (max-width: 800px) {
    width: 70px;
  }
  width: 101px;
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
  margin-bottom: 8px;
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

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 0px;

  :hover {
    color: #e45858;
    cursor: pointer;
  }
`;

const Tools = styled.p`
  font-size: 30px;
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
          <Tools>🛠</Tools>
          <p>
            Latest <br />
            Skill
          </p>
        </LogoDiv>
      </Link>

      <MiddleDiv>
        <LinkDiv>
          <NavLink
            exact
            to="/"
            activeStyle={{
              backgroundColor: "#e45858",
              color: "#fffffe",
              padding: "3px",
              borderRadius: "3px",
              border: "2px solid #e45858",
              textAlign: "center",
            }}
          >
            Browse
          </NavLink>
        </LinkDiv>
        <LinkDiv>
          <NavLink
            exact
            to="/about"
            activeStyle={{
              backgroundColor: "#e45858",
              color: "#fffffe",
              padding: "3px",
              borderRadius: "3px",
              border: "2px solid #e45858",
              textAlign: "center",
            }}
          >
            About
          </NavLink>
        </LinkDiv>

        <LinkDiv>
          {user ? (
            <NavLink
              exact
              to="/pro"
              activeStyle={{
                backgroundColor: "#e45858",
                color: "#fffffe",
                padding: "3px",
                borderRadius: "3px",
                border: "2px solid #e45858",
                textAlign: "center",
              }}
            >
              Pro
            </NavLink>
          ) : (
            <NavLink
              exact
              to="/Auth"
              activeStyle={{
                backgroundColor: "#e45858",
                color: "#fffffe",
                padding: "3px",
                borderRadius: "3px",
                border: "2px solid #e45858",
                textAlign: "center",
              }}
            >
              Pro
            </NavLink>
          )}
        </LinkDiv>
      </MiddleDiv>

      {showMenu ? (
        <DropDown>
          <li>
            <LinkDiv>
              <CloseButton onClick={() => setShowMenu(!showMenu)}>
                X Close Menu
              </CloseButton>
            </LinkDiv>
          </li>
          <li>
            <LinkDiv>
              <NavLink
                exact
                to="/"
                activeStyle={{
                  backgroundColor: "#e45858",
                  color: "#fffffe",
                  padding: "3px",
                  borderRadius: "3px",
                  border: "2px solid #e45858",
                  textAlign: "center",
                }}
              >
                Browse
              </NavLink>
            </LinkDiv>
          </li>
          <li>
            <LinkDiv>
              <NavLink
                exact
                to="/about"
                activeStyle={{
                  backgroundColor: "#e45858",
                  color: "#fffffe",
                  padding: "3px",
                  borderRadius: "3px",
                  border: "2px solid #e45858",
                  textAlign: "center",
                }}
              >
                About
              </NavLink>
            </LinkDiv>
          </li>
          <li>
            <LinkDiv>
              {user ? (
                <NavLink
                  exact
                  to="/pro"
                  activeStyle={{
                    backgroundColor: "#e45858",
                    color: "#fffffe",
                    padding: "3px",
                    borderRadius: "3px",
                    border: "2px solid #e45858",
                    textAlign: "center",
                  }}
                >
                  Pro
                </NavLink>
              ) : (
                <NavLink
                  exact
                  to="/Auth"
                  activeStyle={{
                    backgroundColor: "#e45858",
                    color: "#fffffe",
                    padding: "3px",
                    borderRadius: "3px",
                    border: "2px solid #e45858",
                    textAlign: "center",
                  }}
                >
                  Pro
                </NavLink>
              )}
            </LinkDiv>
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
