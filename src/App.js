import "./App.css";
import Nav from "./components/Nav";
import routes from "./routes";

function App() {
  return (
    <div>
      <Nav></Nav>
      {routes}
    </div>
  );
}

export default App;
