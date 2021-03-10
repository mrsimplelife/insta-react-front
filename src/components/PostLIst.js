import { Alert } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "store";
import Post from "./Post";
const apiUrl = "http://127.0.0.1:8000/api/posts/";
function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const headers = { Authorization: `JWT ${jwtToken}` };
    axios.get(apiUrl, { headers }).then((res) => {
      const { data } = res;
      setPostList(data);
    });
  }, [jwtToken]);
  return (
    <>
      {postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default PostList;
