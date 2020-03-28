import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFireBase } from "../lib/useFirebase";
import { useForm } from "../lib/useForm";

interface Props {}

const Login: React.FC<Props> = () => {
  const { isSignedIn, firebase } = useFireBase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentValues, handleChange } = useForm({
    email: "",
    password: ""
  });

  if (isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form
        onSubmit={async e => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          const { email, password } = currentValues;
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            setError(e.message);
          }
          setLoading(false);
        }}
      >
        <input
          value={currentValues["email"]}
          onChange={handleChange}
          placeholder="Email"
          name="email"
          type="email"
        />
        <input
          value={currentValues["password"]}
          onChange={handleChange}
          placeholder="Password"
          name="password"
          type="password"
        />
        <button disabled={loading} type="submit">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div>
        Dont have an account? <Link to="/signup">Signup</Link> for one
      </div>
    </>
  );
};

export default Login;
