const Auth = (props) => {
  const handleLogin = () => {
    props.history.push("/pro");
  };
  const handleRegister = () => {
    props.history.push("/pro");
  };
  return (
    <div>
      <input />
      <input />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Auth;
