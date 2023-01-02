

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

export type { Message, Channel };
