function Post({ post }) {
  const { photo, caption, location } = post;
  return (
    <div>
      <img src={photo} alt="" />
      {caption},{location}
    </div>
  );
}

export default Post;
