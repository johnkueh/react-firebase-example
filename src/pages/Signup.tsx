import React, { useState } from "react";
import { useFireBase } from "../lib/useFirebase";
import { useForm } from "../lib/useForm";

interface Props {}

const Signup: React.FC<Props> = () => {
  const { isSignedIn, firebase } = useFireBase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentValues, handleChange } = useForm({
    email: "",
    password: ""
  });

  console.log(isSignedIn, firebase);

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
            const result = await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
            console.log(result);
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
    </>
  );
};

export default Signup;
