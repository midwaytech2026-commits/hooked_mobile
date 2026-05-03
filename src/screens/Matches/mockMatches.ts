export interface Match {
  id: string;
  name: string;
  age: number;
  online: boolean;
  image: number | null;
  placeholderBg: string;
  placeholderAccent: string;
}

export interface Conversation {
  id: string;
  name: string;
  age: number;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  image: number | null;
  placeholderBg: string;
  placeholderAccent: string;
}

export const NEW_MATCHES: Match[] = [
  {
    id: 'm1',
    name: 'Aurora',
    age: 26,
    online: true,
    image: null,
    placeholderBg: '#1A0828',
    placeholderAccent: 'rgba(233,30,140,0.25)',
  },
  {
    id: 'm2',
    name: 'Liam',
    age: 28,
    online: true,
    image: null,
    placeholderBg: '#0D1A28',
    placeholderAccent: 'rgba(99,102,241,0.25)',
  },
  {
    id: 'm3',
    name: 'Saskia',
    age: 25,
    online: true,
    image: null,
    placeholderBg: '#1A0D1A',
    placeholderAccent: 'rgba(168,85,247,0.25)',
  },
  {
    id: 'm4',
    name: 'Eva',
    age: 27,
    online: false,
    image: null,
    placeholderBg: '#0D1A1A',
    placeholderAccent: 'rgba(20,184,166,0.25)',
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Aurora',
    age: 26,
    lastMessage: 'That sounds amazing 😊',
    time: '2m',
    unread: 2,
    online: true,
    image: null,
    placeholderBg: '#1A0828',
    placeholderAccent: 'rgba(233,30,140,0.25)',
  },
  {
    id: 'c2',
    name: 'Liam',
    age: 28,
    lastMessage: 'Coffee tomorrow?',
    time: '1h',
    unread: 0,
    online: false,
    image: null,
    placeholderBg: '#0D1A28',
    placeholderAccent: 'rgba(99,102,241,0.25)',
  },
  {
    id: 'c3',
    name: 'Saskia',
    age: 25,
    lastMessage: 'Sent you a song 🎧',
    time: '3h',
    unread: 1,
    online: true,
    image: null,
    placeholderBg: '#1A0D1A',
    placeholderAccent: 'rgba(168,85,247,0.25)',
  },
  {
    id: 'c4',
    name: 'Eva',
    age: 27,
    lastMessage: 'Loved that gallery',
    time: '1d',
    unread: 0,
    online: false,
    image: null,
    placeholderBg: '#0D1A1A',
    placeholderAccent: 'rgba(20,184,166,0.25)',
  },
];
