import { Avatar, Card } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
function Post({ post }) {
  const { photo, caption, location } = post;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[<HeartFilled />]}
      >
        <Card.Meta
          avatar={<Avatar size="large" icon={<UserOutlined />} />}
          title={location}
          description={caption}
        />
      </Card>
      {/* <img src={photo} alt="" style={{ width: "100px" }} />
      {caption},{location} */}
    </div>
  );
}

export default Post;
