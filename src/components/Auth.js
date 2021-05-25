import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userReducer";

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
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Auth;
