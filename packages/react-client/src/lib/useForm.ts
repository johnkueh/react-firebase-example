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
  const reset = useCallback(() => {
    dispatch({
      type: "reset",
      defaultValues
    });
  }, [dispatch, defaultValues]);

  return {
    currentValues,
    handleChange,
    reset
  };
};

type State = {
  [key: string]: string;
};

type Action =
  | {
      type: "change";
      key: string;
      value: string;
    }
  | {
      type: "reset";
      defaultValues: any;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.key]: action.value
      };
    case "reset":
      return action.defaultValues;
  }
}
