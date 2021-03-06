import { Route } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";

function Routes({ match }) {
  return (
    <>
      <LoginRequiredRoute
        exact
        path={match.url + "/profile"}
        component={Profile}
      />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
    </>
  );
}

export default Routes;
