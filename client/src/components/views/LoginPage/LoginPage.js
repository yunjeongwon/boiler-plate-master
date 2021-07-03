import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../actions/userAction";
import { withRouter } from "react-router";

const LoginPage = memo((props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPwdHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email,
        password: password,
      })
    ).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Login Fail");
      }
    });
  };
  return (
    <>
      <form>
        <lable>Email</lable>
        <input type="email" value={email} onChange={onEmailHandler}></input>
        <lable>Password</lable>
        <input type="password" value={password} onChange={onPwdHandler}></input>
        <button onClick={onClickHandler}>Login</button>
      </form>
    </>
  );
});

export default withRouter(LoginPage);
