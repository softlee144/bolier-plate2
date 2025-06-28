import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  return function AuthenticatedComponent(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth())
        .then((response) => {
          console.log(response);
          if (!response.payload) {
            if (option) navigate("/login");
            return;
          }

          const { isAuth, isAdmin } = response.payload;

          // 로그인하지 않은 상태
          if (!isAuth) {
            if (option) navigate("/login");
          } else {
            // 로그인한 상태
            if (adminRoute && !isAdmin) {
              navigate("/");
            } else if (option === false) {
              navigate("/");
            }
          }
        })
        .catch((error) => {
          console.error("auth 요청 에러:", error);
          if (option) navigate("/login");
        });
    }, [dispatch, navigate]);

    return <SpecificComponent {...props} />;
  };
}
