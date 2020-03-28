import React from "react";
import { useHistory } from "react-router-dom";
import { useFireBase } from "../lib/useFirebase";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { firebase } = useFireBase();
  const history = useHistory();

  return (
    <>
      <div>Dashboard</div>
      <button
        onClick={async e => {
          e.preventDefault();
          await firebase.auth().signOut();
          history.push("/login");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
