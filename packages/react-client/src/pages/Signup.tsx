import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFirebase } from "../lib/useFirebase";
import { useForm } from "../lib/useForm";

interface Props {}

const Signup: React.FC<Props> = () => {
  const { isSignedIn, firebase } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentValues, handleChange } = useForm({
    email: "",
    password: ""
  });

  if (isSignedIn === true) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h2>Signup</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form
        onSubmit={async e => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          const { email, password } = currentValues;
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          } catch (e) {
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
        Have an acccount? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Signup;
