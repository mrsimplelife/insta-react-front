import { Button, Card } from "antd";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import { useAxios, axiosInstance } from "api";
import { useEffect, useState } from "react";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [userList, setUserList] = useState([]);

  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: "/accounts/suggestions/",
    headers,
  });
  useEffect(() => {
    if (!origUserList) return setUserList([]);
    setUserList(origUserList.map((user) => ({ ...user, is_follow: false })));
  }, [origUserList]);

  const onFollowUser = (username) => {
    const data = { username };
    const config = { headers };
    axiosInstance
      .post("/accounts/follow/", data, config)
      .then((response) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={style}>
      <Card title="Suggestions for you " size="small">
        {loading && <div>Loading ...</div>}
        {error && <div>로딩 중에 에러가 발생했습니다.</div>}
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
              onFollowUser={onFollowUser}
            />
          ))}
      </Card>
      <Button onClick={refetch}>Reload</Button>
    </div>
  );
}
