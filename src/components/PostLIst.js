import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "store";
import Post from "./Post";
const apiUrl = "http://127.0.0.1:8000/api/posts/";
function PostList() {
  const { store } = useAppContext();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      const { data } = res;
      setPostList(data);
    });
  }, []);
  return (
    <>
      {JSON.stringify(store)}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default PostList;
