import React, { useReducer } from "react";
import { Snackbar } from "@material-ui/core";
/**
 * withError is a hoc which will take a component and return another component with a function called alertError(msg)
 */

const initialState = {
  open: false,
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return {
        open: true,
        message: action.payload,
      };

    default:
      return { open: false, message: "" };
  }
};

const withError =
  (ParentComponent) =>
  ({ ...rest }) => {
    const [state, disptch] = useReducer(reducer, initialState);

    const handleClose = (event, reason) => {
      disptch({ type: "close" });
    };

    const alertError = (message) => {
      disptch({ type: "open", payload: message });
    };

    return (
      <div>
        <ParentComponent alertError={alertError} {...rest} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={state.message}
        />
      </div>
    );
  };

export default withError;
