import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Unauthorized = () => {
  const [redirect, setRedirect] = useState(false);

  const onClick = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <h3>Unauthorized - You do not have access to this page.</h3>
      <h1>404</h1>
      <h4>Not found</h4>
      <Button className="px-4 mt-2" onClick={onClick}>
        Okay
      </Button>
    </div>
  );
};

export default Unauthorized;
