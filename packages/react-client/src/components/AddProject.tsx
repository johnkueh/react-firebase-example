import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "../lib/useForm";

interface Props {}

const AddProject: React.FC<Props> = () => {
  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS }]
  });
  const { currentValues, handleChange, reset } = useForm({
    name: "",
    description: ""
  });

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        createProject({
          variables: { input: currentValues }
        });
        reset();
      }}
    >
      <h3>Add project</h3>
      <div>
        <input
          value={currentValues["name"]}
          onChange={handleChange}
          placeholder="name"
          name="name"
        />
      </div>
      <div>
        <input
          value={currentValues["description"]}
          onChange={handleChange}
          placeholder="description"
          name="description"
        />
      </div>
      <button disabled={loading} type="submit">
        {loading ? "Loading..." : "Add Project"}
      </button>
    </form>
  );
};

export default AddProject;

const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
    }
  }
`;

const PROJECTS = gql`
  query {
    projects {
      id
      name
      description
    }
  }
`;
