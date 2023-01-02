
import { Channel } from '~/src/interface';
import guid from '~/src/guid';

const template_channels: Channel[] = [
  {
    id: 'public',
    name: '全員用',
    description: 'テスト用チャネルです。',
  },
  {
    id: 'octopus',
    name: 'タコが好きな人',
    description: '🐙🐙🐙🐙🐙 We Love Tako 🐙🐙🐙🐙🐙',
  },
  {
    id: 'squid',
    name: 'イカが好きな人',
    description: '🦑🦑🦑🦑🦑 We Love Ika 🦑🦑🦑🦑🦑',
  },
];

const template_user = {
  id: guid(),
  name: "Mr. Tako",
  comment: "実はわたくし、脳が9個あるんです。\nメインパートにひとつと、各足にひとつずつです。",
};

export { template_channels, template_user };
