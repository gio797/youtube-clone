export type Video = {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  img: string;
  subscribers: number;
  subscribedUsers: string[];
  fromGoogle: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CommentType = {
  _id: string;
  userId: string;
  videoId: string;
  desc: string;
};
