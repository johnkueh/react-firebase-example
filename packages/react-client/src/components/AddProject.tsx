import React from "react";
import { useAddDocument } from "../lib/useFirebase";
import { useForm } from "../lib/useForm";

interface Props {}

const AddProject: React.FC<Props> = () => {
  const { add, loading } = useAddDocument("projects");
  const { currentValues, handleChange, reset } = useForm({
    name: "",
    description: ""
  });

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await add(currentValues);
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
