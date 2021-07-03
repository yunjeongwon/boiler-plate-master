import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../actions/userAction";
import { withRouter } from "react-router";

const RegisterPage = memo((props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPwdHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPwdHandler = (e) => {
    setConfirmPwd(e.currentTarget.value);
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPwd) return alert("비밀번호 달라");
    dispatch(
      registerUser({
        name: name,
        email: email,
        password: password,
      })
    ).then((res) => {
      if (res.payload.registerSuccess) {
        props.history.push("/login");
      } else {
        alert("Register Fail");
      }
    });
  };
  return (
    <>
      <form>
        <lable>Name</lable>
        <input type="text" value={name} onChange={onNameHandler}></input>
        <lable>Email</lable>
        <input type="email" value={email} onChange={onEmailHandler}></input>
        <lable>Password</lable>
        <input type="password" value={password} onChange={onPwdHandler}></input>
        <lable>Comfirm Password</lable>
        <input
          type="password"
          value={confirmPwd}
          onChange={onConfirmPwdHandler}
        ></input>
        <button onClick={onClickHandler}>Login</button>
      </form>
    </>
  );
});

export default withRouter(RegisterPage);
