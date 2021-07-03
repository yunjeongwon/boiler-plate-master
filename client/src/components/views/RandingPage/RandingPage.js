import axios from "axios";
import React from "react";
import { withRouter } from "react-router";

const RandingPage = (props) => {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.logoutSuccess) {
        props.history.push("/login");
      } else {
        alert("Logout Fail");
      }
    });
  };
  return (
    <>
      시작페이지
      <button onClick={onClickHandler}>Logout</button>
    </>
  );
};

export default withRouter(RandingPage);
