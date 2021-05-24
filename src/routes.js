import { Switch, Route } from "react-router-dom";
import Browse from "./components/Browse";
import Auth from "./components/Auth";
import About from "./components/About";
import TitleDetail from "./components/TitleDetail";
import Pro from "./components/Pro";

export default (
  <Switch>
    <Route exact path="/" component={Browse} />
    <Route path="/auth" component={Auth} />
    <Route path="/about" component={About} />
    <Route path="/titledetail/:id" component={TitleDetail} />
    <Route path="/pro" component={Pro} />
  </Switch>
);
