import { Switch, Route } from "react-router-dom";

export default (
  <Switch>
    <Route exact path="/" component={Browse} />
    <Route path="/auth" component={Auth} />
    <Route path="/about" component={About} />
    <Route path="/titledetail/:id" component={TitleDetail} />
    <Route path="/pro" component={Pro} />
  </Switch>
);
