import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";

type Props = {};

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

function VideoComponent({}: Props) {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentVideo } = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState<User | null>(null);

  useEffect(() => {
    async function getVideo() {
      try {
        const videoRes = await axios.get(
          `http://localhost:8800/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `http://localhost:8800/api/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    }
    getVideo();
  }, [path]);

  async function handleLike() {
    try {
      if (!currentVideo.likes) {
        return;
      }

      await axios.put(
        `http://localhost:8800/api/users/like/${currentVideo._id}`,
        {},
        { withCredentials: true }
      );

      dispatch(like(currentUser._id));
    } catch (error) {
      console.error("Error liking video:", error);
    }
  }

  const handleDislike = async () => {
    try {
      if (!currentVideo.dislikes) {
        return;
      }

      await axios.put(
        `http://localhost:8800/api/users/dislike/${currentVideo._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(dislike(currentUser._id));
    } catch (err) {
      console.log(err);
    }
  };

  async function handleSubscribe() {
    try {
      if (!currentUser.subscribedUsers) {
        return;
      }

      if (currentUser.subscribedUsers.includes(channel?._id)) {
        await axios.put(
          `http://localhost:8800/api/users/unsub/${channel?._id}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.put(
          `http://localhost:8800/api/users/sub/${channel?._id}`,
          {},
          { withCredentials: true }
        );
      }

      dispatch(subscription(channel?._id));
    } catch (error) {
      console.error("Error subscribing video:", error);
    }
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views, {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes &&
              currentVideo.likes.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo.likes && currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes &&
              currentVideo.dislikes.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            {currentUser.subscribedUsers?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  );
}

export default VideoComponent;
