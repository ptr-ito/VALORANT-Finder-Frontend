import { AxiosPromise } from "axios";
import client from "./client";
import Cookies from "js-cookie";
import { PostCommentFormData } from "interfaces/index";

// マッチ募集コメント一覧
export const getPostComment = (match_post_id: string): AxiosPromise => {
  return client.get(`/posts/match_posts/${match_post_id}/comments`);
};

// マッチ募集コメント作成
export const createPostComment = (data: FormData, match_post_id: string): AxiosPromise => {
  return client.post(`/posts/match_posts/${match_post_id}/comments`, data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// マッチ募集コメント更新
export const updatePostComment = (data: PostCommentFormData, id: string): AxiosPromise => {
  return client.put(`/posts/comments/${id}`, data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// マッチ募集コメント削除
export const deletePostComment = (id: string): AxiosPromise => {
  return client.delete(`/posts/comments/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
