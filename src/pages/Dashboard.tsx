import React from "react";
import { useHistory } from "react-router-dom";
import AddProject from "../components/AddProject";
import { useCollection, useFirebase } from "../lib/useFirebase";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { firebase } = useFirebase();
  const { data } = useCollection("projects");
  const history = useHistory();
  if (data == null) return <div>Loading projects...</div>;

  return (
    <>
      <h3>All projects</h3>
      <div>
        {data.map((project: any) => (
          <div key={project.id}>
            <div>{project.name}</div>
            <div>{project.description}</div>
            <hr />
          </div>
        ))}
        <AddProject />
      </div>
      <hr />
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
