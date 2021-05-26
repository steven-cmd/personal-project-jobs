import "./App.css";
import Nav from "./components/Nav";
import routes from "./routes";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJobs } from "./redux/jobReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/data/get_data")
      .then((res) => {
        dispatch(setJobs(res.data.jobs.job));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div>
      <Nav></Nav>
      {routes}
    </div>
  );
}

export default App;
