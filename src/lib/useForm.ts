import { useCallback, useReducer } from "react";

export const useForm = (defaultValues: State) => {
  const [currentValues, dispatch] = useReducer(reducer, defaultValues);
  const handleChange = useCallback(
    e => {
      dispatch({
        type: "change",
        key: e.target.name,
        value: e.target.value
      });
    },
    [dispatch]
  );

  return {
    currentValues,
    handleChange
  };
};

type State = {
  [key: string]: string;
};

type Action = {
  type: "change";
  key: string;
  value: string;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.key]: action.value
      };
  }
}
