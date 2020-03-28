import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { fetchCollection } from "../lib/data";
import { useFireBase } from "../lib/useFirebase";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { firebase } = useFireBase();
  const history = useHistory();

  const { isFetching, data } = useQuery("projects", async () => {
    return fetchCollection("projects", firebase);
  });

  if (isFetching) return <div>Loading projects...</div>;

  return (
    <>
      <h3>Projects</h3>
      <div>
        {data.map((project: any) => (
          <div>
            <div>{project.name}</div>
            <div>{project.description}</div>
            <hr />
          </div>
        ))}
      </div>
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
