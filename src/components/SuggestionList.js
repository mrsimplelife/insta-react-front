import { Button, Card } from "antd";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import useAxios from "axios-hooks";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers,
  });
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
            />
          ))}
      </Card>
      <Button onClick={refetch}>Reload</Button>
    </div>
  );
}
