import { AxiosPromise } from "axios";
import client from "./client";
import Cookies from "js-cookie";
import { MatchPostUpdateFormData } from "interfaces/index";
import { MatchPostFormData } from "interfaces/index";

// import { MatchPostApiJson } from "interfaces/index";

// マッチ募集一覧取得
export const getPosts = () => {
  return client.get("/posts/match_posts");
};

// マッチ募集作成
export const createPost = (data: FormData): AxiosPromise => {
  return client.post("/posts/match_posts", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// マッチ募集削除
export const deletePost = (id: string): AxiosPromise => {
  return client.delete(`/posts/match_posts/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updatePost = (data: MatchPostUpdateFormData, id: string): AxiosPromise => {
  return client.put(`/posts/match_posts/${id}`, data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updatePostItem = (data: MatchPostFormData, id: string): AxiosPromise => {
  return client.put(`/posts/match_posts/${id}`, data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// id指定でマッチ募集投稿を個別に取得
export const showPost = (id: string) => {
  return client.get(`/posts/match_posts/${id}`);
};
