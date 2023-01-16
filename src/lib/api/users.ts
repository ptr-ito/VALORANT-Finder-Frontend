import client from "lib/api/client";
import { UpdateUserFormData } from "interfaces/index";

// id指定でユーザー情報を個別に取得
export const getUser = (uuid: number | undefined) => {
  return client.get(`user/users/${uuid}`);
};

// ユーザー情報を更新
export const updateUser = (id: number | undefined | null, data: UpdateUserFormData) => {
  return client.put(`users/${id}`, data);
};
