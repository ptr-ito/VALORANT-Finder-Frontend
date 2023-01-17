import client from "lib/api/client";
import Cookies from "js-cookie";

import { SignUpParams, SignInParams, UpdateUserFormData, ResetPasswordFormData, ForgotPassword, ResetPassword } from "interfaces/index";

export const signUp = (params: SignUpParams) => {
  return client.post("auth", params);
};

export const signIn = (params: SignInParams) => {
  return client.post("auth/sign_in", params);
};

export const signOut = () => {
  return client.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return;
  return client.get("/user/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateUserSettings = (data: UpdateUserFormData) => {
  return client.put("/auth", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const forgotPassword = (params: ForgotPassword) => {
  return client.post("/auth/password", params);
};

export const resetPassword = (params: ResetPassword) => {
  return client.put("/auth/password", params, {
    headers: {
      "access-token": params.accessToken,
      client: params.client,
      uid: params.uid,
    },
  });
};
