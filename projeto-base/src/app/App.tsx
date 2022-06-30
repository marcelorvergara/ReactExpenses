import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { apiGetUserEndpoint, apiSignOut, IUser } from "./backend";
import { Expenses } from "./Expenses";
import { ExpensesHeader } from "./ExpensesHeader";
import { LoginScreen } from "./LoginScreen";

const today = new Date();

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    apiGetUserEndpoint().then(
      (u) => {
        setUser(u);
      },
      () => setUser(null)
    );
  }, []);

  function signOutUser() {
    apiSignOut();
    setUser(null);
  }

  if (user) {
    return (
      <Router>
        <Switch>
          <Route path="/expenses/:dateParam">
            <ExpensesHeader onSignOut={signOutUser} userInfo={user} />
            <Expenses />
          </Route>
          <Redirect
            to={{
              pathname: `/expenses/${today.toISOString().substring(0, 7)}`,
            }}
          />
        </Switch>
      </Router>
    );
  } else {
    return <LoginScreen onSignIn={(user) => setUser(user)} />;
  }
}

export default App;
