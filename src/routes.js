import { Switch, Route } from "react-router-dom";
import Browse from "./components/Browse";
import Auth from "./components/Auth";
import About from "./components/About";
import JobDetail from "./components/JobDetail";
import Pro from "./components/Pro";

export default (
  <Switch>
    <Route exact path="/" component={Browse} />
    <Route path="/auth" component={Auth} />
    <Route path="/about" component={About} />
    <Route path="/jobdetail/:id" component={JobDetail} />
    <Route path="/pro" component={Pro} />
  </Switch>
);
