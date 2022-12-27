import { createContext, useState, ReactNode } from "react";

export const AuthGuardContext = createContext({});

export const AuthGuardProvider = ({ children }: { children?: ReactNode }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [client, setClient] = useState(null);
  const [uid, setUid] = useState(null);

  return <AuthGuardContext.Provider value={{ accessToken, setAccessToken, client, setClient, uid, setUid }}>{children}</AuthGuardContext.Provider>;
};
