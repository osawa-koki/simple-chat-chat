

type Message = {
  id: string;
  channel_id: string;
  username: string;
  text: string;
  date: Date;
};

type Channel = {
  id: string;
  name: string;
  description: string;
};

type User = {
  id: string;
  name: string;
  comment: string;
};

type MyContext = {
  user_id: string;
  channel_ids: string[];
};

export type { Message, Channel, User, MyContext };
