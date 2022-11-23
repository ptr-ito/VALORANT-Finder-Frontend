import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const UserProfileAvatar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  } else if (isAuthenticated && user) {
    return (
      <div>
        <Avatar style={{ width: "30px" }} src={user.picture} />
      </div>
    );
  } else {
    return null;
  }
};

export default UserProfileAvatar;
