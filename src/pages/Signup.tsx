import React from "react";
import { useForm } from "../lib/useForm";

interface Props {}

const Signup: React.FC<Props> = () => {
  const { currentValues, handleChange } = useForm({
    email: "",
    password: ""
  });

  return (
    <>
      <h2>Signup</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(currentValues);
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Signup;
