

type Message = {
  id: string;
  name: string;
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
};

export type { Message, Channel, User };
