import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useHistory } from "react-router-dom";
import AddProject from "../components/AddProject";
import { useFirebase } from "../lib/useFirebase";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const history = useHistory();
  const { firebase } = useFirebase();
  const { data } = useQuery(PROJECTS);
  if (data == null) return <div>Loading projects...</div>;
  const { projects } = data;

  return (
    <>
      <h3>All projects</h3>
      <div>
        {projects.map((project: any) => (
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

const PROJECTS = gql`
  query {
    projects {
      id
      name
      description
    }
  }
`;
