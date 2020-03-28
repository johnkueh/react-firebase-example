import "firebase/auth";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { FirebaseProvider } from "./lib/useFirebase";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
