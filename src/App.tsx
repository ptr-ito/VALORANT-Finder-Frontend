import React, { useState, useEffect, createContext } from "react";
import Routers from "router/Routers";
import { BrowserRouter, useLocation } from "react-router-dom";
import { getCurrentUser } from "lib/api/auth";
import { User } from "interfaces/index";
import { AuthGuardProvider } from "providers/AuthGuard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { css, Global } from "@emotion/react";
import { MediaQueryProvider } from "providers/MediaQueryProvider";

export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  }
);

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      console.log(res?.data.data);

      if (res?.data.data.attributes.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <Global styles={global} />
      <AuthGuardProvider>
        <MediaQueryProvider>
          <BrowserRouter>
            <ToastContainer limit={1} css={toastStyle} />
            <AuthContext.Provider
              value={{
                loading,
                setLoading,
                isSignedIn,
                setIsSignedIn,
                currentUser,
                setCurrentUser,
              }}
            >
              <ScrollToTop />
              <Routers />
            </AuthContext.Provider>
          </BrowserRouter>
        </MediaQueryProvider>
      </AuthGuardProvider>
    </>
  );
};

export default App;

// css

const toastStyle = css`
  width: 450px;
`;

const global = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700&display=swap");
`;
