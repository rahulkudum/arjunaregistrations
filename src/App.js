import Form from "./form";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
 return (
  <Switch>
   <Route exact path="/">
    {" "}
    <Redirect to="/" />
   </Route>
   <Route path="/:webinarId">
    <Form />
   </Route>
  </Switch>
 );
}

export default App;
