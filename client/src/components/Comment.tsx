import styled from "styled-components";
import { CommentType, User } from "../types";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";

type Props = {
  comment: CommentType;
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

function Comment({ comment }: Props) {
  const [channel, setChannel] = useState<User | null>(null);

  useEffect(() => {
    async function fetchComment() {
      const res = await axios.get(
        `http://localhost:8800/api/users/find/${comment.userId}`
      );
      setChannel(res.data);
    }
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel?.name}
          <Date>{format(comment?.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
}

export default Comment;
