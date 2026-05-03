export interface InboxConversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  /** Pass a ChatDetailScreen route or ID here when that screen is built */
  chatId: string;
  placeholderBg: string;
  placeholderAccent: string;
}

export const INBOX_CONVERSATIONS: InboxConversation[] = [
  {
    id: 'ic1',
    name: 'Aurora',
    lastMessage: 'That sounds amazing 😊',
    time: '2m',
    unread: 2,
    online: true,
    chatId: 'chat_aurora',
    placeholderBg: '#1A0828',
    placeholderAccent: 'rgba(233,30,140,0.28)',
  },
  {
    id: 'ic2',
    name: 'Liam',
    lastMessage: 'Coffee tomorrow?',
    time: '1h',
    unread: 0,
    online: false,
    chatId: 'chat_liam',
    placeholderBg: '#0D1A28',
    placeholderAccent: 'rgba(99,102,241,0.28)',
  },
  {
    id: 'ic3',
    name: 'Saskia',
    lastMessage: 'Sent you a song 🎧',
    time: '3h',
    unread: 1,
    online: true,
    chatId: 'chat_saskia',
    placeholderBg: '#1A0D1A',
    placeholderAccent: 'rgba(168,85,247,0.28)',
  },
  {
    id: 'ic4',
    name: 'Eva',
    lastMessage: 'Loved that gallery',
    time: '1d',
    unread: 0,
    online: false,
    chatId: 'chat_eva',
    placeholderBg: '#0D1A1A',
    placeholderAccent: 'rgba(20,184,166,0.28)',
  },
];
