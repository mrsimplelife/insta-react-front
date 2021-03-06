import React, { useState } from "react";
import { Button, Input } from "antd";
import { useAppContext } from "store";
import Comment from "./Comment";
import { axiosInstance, useAxios } from "api";

export default function CommentList({ post }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [commentContent, setCommentComment] = useState("");

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: commentList }, refetch] = useAxios({
    url: `/api/posts/${post.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `/api/posts/${post.id}/comments/`;

    try {
      await axiosInstance.post(
        apiUrl,
        { message: commentContent },
        { headers }
      );
      setCommentComment("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {commentList &&
        commentList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        value={commentContent}
        onChange={(e) => setCommentComment(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글 쓰기
      </Button>
    </div>
  );
}
