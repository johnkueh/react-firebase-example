## Example of Firebase usage with modern, idiomatic React

- [useFirebase](https://github.com/johnkueh/react-firebase-example/blob/master/src/lib/useFirebase.tsx) hook
- [useForm](https://github.com/johnkueh/react-firebase-example/blob/master/src/lib/useForm.ts) hook
- [Example usage](https://github.com/johnkueh/react-firebase-example/blob/master/src/pages/Signup.tsx)
- [Fetching collection from Cloud Firestore](https://github.com/johnkueh/react-firebase-example/blob/feature/firestore/src/pages/Dashboard.tsx)

![Auth Preview](/public/auth-preview.gif)

### useFirebase hook

1. First, wrap your app with `FirebaseProvider`

```tsx
import React from "react";
import { firebaseConfig } from "./lib/firebase";
import { FirebaseProvider } from "./lib/useFirebase";
import App from './App';

function App() {
  return (
    <FirebaseProvider config={firebaseConfig}>
      <App>
    </FirebaseProvider>
  );
}

export default App;
```

2. Now, any child component can access firebase state and instance with the `useFirebase` hook

```tsx
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
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

  if (isSignedIn) {
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
```
