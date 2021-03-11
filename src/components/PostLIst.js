import { Alert } from "antd";
import useAxios from "axios-hooks";
import { useAppContext } from "store";
import Post from "./Post";

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: postList, loading, error }, refetch] = useAxios({
    url: apiUrl,
    headers,
  });
  console.log(postList);
  return (
    <>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. :-(" />
      )}
      {postList && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
}

export default PostList;
const apiUrl = "http://127.0.0.1:8000/api/posts/";
