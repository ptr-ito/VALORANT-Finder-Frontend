import client from "lib/api/client";
import { UpdateUserFormData } from "interfaces/index";

// id指定でユーザー情報を個別に取得
export const getUser = (id: number | undefined) => {
  return client.get(`users/${id}`);
};

// ユーザー情報を更新
export const updateUser = (id: number | undefined | null, data: UpdateUserFormData) => {
  return client.put(`users/${id}`, data);
};
