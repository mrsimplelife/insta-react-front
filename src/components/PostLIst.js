import { Alert } from "antd";
import axios from "axios";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useAppContext } from "store";
import Post from "./Post";

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [postList, setPostList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originPostList }] = useAxios({
    url: apiUrl,
    headers,
  });
  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      await axios({
        url: apiUrl,
        method,
        headers,
      });

      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {postList &&
        postList.map((post) => (
          <Post key={post.id} post={post} handleLike={handleLike} />
        ))}
    </>
  );
}

export default PostList;
const apiUrl = "http://127.0.0.1:8000/api/posts/";
