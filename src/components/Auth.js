import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userReducer";
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

const Input = styled.input`
  width: 90%;
`;

const MainDiv = styled.div`
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
      .catch((err) => console.log(err));
  };

  const handleRegister = () => {
    axios
      .post("/user/register", { email, password })
      .then((res) => {
        dispatch(updateUser(res.data));
        props.history.push("/pro");
      })
      .catch((err) => console.log(err));
  };

  return (
    <MainDiv>
      <h1>Access Pro Area</h1>
      <LoginDiv>
        <div>
          <Label for={"email"}>Email Addresss</Label>
          <Input
            id={"email"}
            placeholder={"Your Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label for={"pw"}>Password</Label>
          <Input
            id={"pw"}
            placeholder={"Enter Password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ButtonWrapperDiv>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </ButtonWrapperDiv>
      </LoginDiv>
    </MainDiv>
  );
};

export default Auth;
