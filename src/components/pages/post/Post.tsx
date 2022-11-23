import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

interface Post {
  title: string;
  caption: string;
}

const Post = () => {
  const [posts, setPosts] = useState<Post[]>();
  const { getAccessTokenWithPopup } = useAuth0();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenWithPopup({});
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  const fetchPosts = () => {
    axios.get("http://localhost:3000/api/v1/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const createPosts = () => {
    const headers = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    const data = {
      title: "タイトル2",
      caption: "説明2",
    };
    axios.post("http://localhost:3000/api/v1/posts", data, headers);
  };

  return (
    <>
      <h2>投稿作成</h2>
      <button onClick={createPosts}>投稿作成</button>
      <h2>投稿一覧</h2>
      <button onClick={fetchPosts}>投稿取得</button>
      {posts?.map((post: Post, index: number) => (
        <div key={index}>
          <p>{post.title}</p>
          <p>{post.caption}</p>
        </div>
      ))}
    </>
  );
};

export default Post;
