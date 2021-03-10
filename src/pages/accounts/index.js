import { Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";

function Routes({ match }) {
  return (
    <>
      {JSON.stringify(match)}
      <Route exact path={match.path + "/profile"} component={Profile} />
      <Route exact path={match.path + "/login"} component={Login} />
    </>
  );
}

export default Routes;
