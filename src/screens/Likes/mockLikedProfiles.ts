export interface LikedProfile {
  id: string;
  name: string;
  age: number;
  distance: number;  // km
  isNew: boolean;
  locked: boolean;
  /** require() asset, or null for placeholder */
  image: number | null;
  placeholderBg: string;
  placeholderAccent: string;
}

// To add real images: swap null → require('../../assets/images/likes/aurora.jpg')
export const LIKED_PROFILES: LikedProfile[] = [
  {
    id: 'l1',
    name: 'Aurora',
    age: 26,
    distance: 2,
    isNew: true,
    locked: false,
    image: null,
    placeholderBg: '#1A0828',
    placeholderAccent: 'rgba(233,30,140,0.28)',
  },
  {
    id: 'l2',
    name: 'Liam',
    age: 28,
    distance: 5,
    isNew: true,
    locked: false,
    image: null,
    placeholderBg: '#071835',
    placeholderAccent: 'rgba(80,130,230,0.3)',
  },
  {
    id: 'l3',
    name: 'Sofia',
    age: 25,
    distance: 3,
    isNew: false,
    locked: true,
    image: null,
    placeholderBg: '#180820',
    placeholderAccent: 'rgba(180,30,100,0.2)',
  },
  {
    id: 'l4',
    name: 'Emma',
    age: 24,
    distance: 6,
    isNew: false,
    locked: true,
    image: null,
    placeholderBg: '#0A0A1A',
    placeholderAccent: 'rgba(100,50,185,0.22)',
  },
  {
    id: 'l5',
    name: 'Maya',
    age: 27,
    distance: 4,
    isNew: false,
    locked: true,
    image: null,
    placeholderBg: '#20080E',
    placeholderAccent: 'rgba(200,50,80,0.2)',
  },
  {
    id: 'l6',
    name: 'Olivia',
    age: 29,
    distance: 8,
    isNew: false,
    locked: true,
    image: null,
    placeholderBg: '#150820',
    placeholderAccent: 'rgba(120,40,185,0.22)',
  },
];
