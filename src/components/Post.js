import { Avatar, Card } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import CommentList from "./CommentList";

function Post({ post, handleLike }) {
  const { author, caption, location, photo, is_like } = post;

  const { username, avatar_url } = author;

  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={<img src={avatar_url} alt={username} />}
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        />
        <CommentList post={post} />
      </Card>
    </div>
  );
}

export default Post;
