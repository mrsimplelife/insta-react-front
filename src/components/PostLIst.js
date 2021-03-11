import { Alert } from "antd";
import { useAxios, axiosInstance } from "api";
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
    url: "/api/posts/",
    headers,
  });
  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      await axiosInstance({
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
