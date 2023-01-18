import { AxiosPromise } from "axios";
import client from "./client";
import Cookies from "js-cookie";
import { PostCommentFormData, GetComments } from "interfaces/index";

// マッチ募集コメント一覧
export const getPostComment = (params: GetComments): AxiosPromise => {
  return client.get(`/comments`, {
    params: {
      commentable_type: params.commentableType,
      commentable_id: params.commentableId,
    },
  });
};

// マッチ募集コメント作成
export const createPostComment = (data: FormData): AxiosPromise => {
  return client.post(`/comments/`, data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// マッチ募集コメント更新
export const updatePostComment = (data: PostCommentFormData, id: string): AxiosPromise => {
  return client.put(`/comments/${id}`, data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// マッチ募集コメント削除
export const deletePostComment = (id: string): AxiosPromise => {
  return client.delete(`/comments/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
