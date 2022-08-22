import React, { useEffect } from "react";
import Routes from "./routes";
import { connect, useDispatch } from "react-redux";

const App = () => {
  return (
      <Routes />
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alertState,
    loading: state.loadingState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAlert: (data) =>
      dispatch({
        type: "RESET_ALERT",
      }),
    validateToken: (data) =>
      dispatch({
        type: "VALIDATE_TOKEN",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
