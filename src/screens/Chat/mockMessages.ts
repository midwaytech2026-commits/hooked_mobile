export interface ChatMessage {
  id: string;
  text: string;
  sent: boolean;
  time: string;
}

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  chat_aurora: [
    { id: 'm1', text: 'Hey! I saw your profile — I love hiking too 🥾', sent: false, time: '2:30 PM' },
    { id: 'm2', text: 'Oh really? Where do you usually go?', sent: true, time: '2:31 PM' },
    { id: 'm3', text: 'Mostly the trails near Blue Ridge. Last weekend we did 14 miles!', sent: false, time: '2:32 PM' },
    { id: 'm4', text: 'That sounds amazing 😊', sent: false, time: '2:32 PM' },
    { id: 'm5', text: "Wow, 14 miles! I usually stick to 6–8 but I'm working up to longer distances", sent: true, time: '2:35 PM' },
    { id: 'm6', text: 'We should plan a hike together sometime!', sent: false, time: '2:36 PM' },
    { id: 'm7', text: "I'd love that! Maybe this weekend?", sent: true, time: '2:37 PM' },
  ],
  chat_liam: [
    { id: 'm1', text: 'Coffee tomorrow?', sent: false, time: '1:00 PM' },
    { id: 'm2', text: 'Sure! Which café?', sent: true, time: '1:05 PM' },
    { id: 'm3', text: 'The one on 5th Ave — great cold brew ☕', sent: false, time: '1:07 PM' },
  ],
  chat_saskia: [
    { id: 'm1', text: 'Sent you a song 🎧', sent: false, time: '11:00 AM' },
    { id: 'm2', text: 'Just listened — love it! What genre is this?', sent: true, time: '11:30 AM' },
    { id: 'm3', text: 'Indie dream-pop 🌙 glad you like it!', sent: false, time: '11:31 AM' },
  ],
  chat_eva: [
    { id: 'm1', text: 'Loved that gallery', sent: false, time: 'Yesterday' },
    { id: 'm2', text: 'Which piece was your favourite?', sent: true, time: 'Yesterday' },
    { id: 'm3', text: 'The one with the blue light in the corner 💙', sent: false, time: 'Yesterday' },
  ],
};
