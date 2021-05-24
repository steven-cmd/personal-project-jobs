import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to="/">
        <img alt="logo" />
      </Link>
      <Link to="/">Browse</Link>
      <Link to="/about">About</Link>
      <Link to="/pro">Pro</Link>
    </div>
  );
};

export default Nav;
