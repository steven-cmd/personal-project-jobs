import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userReducer";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #6246ea;
  color: #6246ea;
  :hover {
    cursor: pointer;
    background: #6246ea;
    color: #fffffe;
  }
  width: 100px;
  height: 29px;
  font-weight: bold;
  margin: 10px 10px 0px 10px;
`;

const Input = styled.input`
  width: 90%;
  font-family: inherit;
  font-size: 20px;
  border-radius: 3px;

  :focus {
    outline-color: #e45858;
  }
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`;

const Label = styled.label`
  margin-right: auto;
`;

const ButtonWrapperDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    axios
      .post("/user/login", { email, password })
      .then((res) => {
        dispatch(updateUser(res.data));
        props.history.push("/pro");
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect email or password.");
      });
  };

  const handleRegister = () => {
    if (email.length < 1 || email.length > 128) {
      alert(
        "Username / Email must be at least 1 character and less than 128 characters."
      );
    } else if (password.length < 6 || password.length > 128) {
      alert(
        "Password must be at least 6 characters and less than 128 characters."
      );
    } else {
      axios
        .post("/user/register", { email, password })
        .then((res) => {
          dispatch(updateUser(res.data));
          props.history.push("/pro");
        })
        .catch((err) => {
          console.log(err);
          alert("Username/email already exists.");
        });
    }
  };

  return (
    <MainDiv>
      <h1>Access Pro Area</h1>
      <LoginDiv>
        <InputDiv>
          <Label htmlFor={"email"}>Email Addresss</Label>
          <Input
            id={"email"}
            placeholder={"Your Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor={"pw"}>Password</Label>
          <Input
            id={"pw"}
            placeholder={"Enter Password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputDiv>
        <ButtonWrapperDiv>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </ButtonWrapperDiv>
      </LoginDiv>
    </MainDiv>
  );
};

export default Auth;
