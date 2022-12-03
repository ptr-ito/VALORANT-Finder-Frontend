import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileIcon = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  } else if (isAuthenticated && user) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileIcon;
