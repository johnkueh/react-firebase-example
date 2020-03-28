import React from "react";

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <>
      <h2>Login</h2>
      <form>
        <input placeholder="Email" name="email" />
        <input placeholder="Password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
