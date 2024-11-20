
import { Suspense } from "react";
import Loader from "../loader/Loader";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const LazyRegister = React.lazy(() => import(".././register/Register"));
const LazyLogin = React.lazy(() => import(".././login/Login"));

const AuthPage = () => {
  const isLogginOrRegister = useLocation().state.isSignUp;
  const [isSignUp, setIsSignUp] = useState(isLogginOrRegister);

  useEffect(() => {
    setIsSignUp(isLogginOrRegister);
  }, [isLogginOrRegister]);


  return (
    <>  
      <Suspense fallback={<Loader />}>
        {isSignUp ? <LazyLogin /> : <LazyRegister />}
      </Suspense>
    </>
  );
};

export default AuthPage;
