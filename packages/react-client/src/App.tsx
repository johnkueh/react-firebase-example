import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch
} from "react-router-dom";
import Authed from "./layouts/Authed";
import { firebaseConfig } from "./lib/firebase";
import { FirebaseProvider } from "./lib/useFirebase";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <FirebaseProvider config={firebaseConfig}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <AuthedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

const AuthedRoute: React.FC<RouteProps> = props => {
  return (
    <Authed>
      <Route {...props} />
    </Authed>
  );
};

export default App;
