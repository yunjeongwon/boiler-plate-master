import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../actions/userAction";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(authUser()).then((res) => {
        console.log(res.payload);
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (!option) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent></SpecificComponent>;
  }
  return AuthenticationCheck;
}
