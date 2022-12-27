import { FC, memo, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "App";
import { Box } from "@mui/material";

export const PrivateRoute = memo(() => {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (!loading) {
    if (!isSignedIn) {
      return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></Box>
  );
});
