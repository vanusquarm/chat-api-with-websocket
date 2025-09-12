export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sent: boolean; // true if sent by user, false if received
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount?: number;
  messages: Message[];
}

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! Are we still on for dinner tonight?",
    lastMessageTime: new Date(2024, 8, 10, 18, 30),
    unreadCount: 2,
    messages: [
      {
        id: "1",
        content: "Hi there! How's your day going?",
        timestamp: new Date(2024, 8, 10, 14, 20),
        sent: false,
      },
      {
        id: "2", 
        content: "Pretty good! Just finished a big project at work. How about you?",
        timestamp: new Date(2024, 8, 10, 14, 25),
        sent: true,
      },
      {
        id: "3",
        content: "That's awesome! Congratulations 🎉",
        timestamp: new Date(2024, 8, 10, 14, 27),
        sent: false,
      },
      {
        id: "4",
        content: "Thanks! Want to celebrate over dinner tonight?",
        timestamp: new Date(2024, 8, 10, 14, 30),
        sent: true,
      },
      {
        id: "5",
        content: "Hey! Are we still on for dinner tonight?",
        timestamp: new Date(2024, 8, 10, 18, 30),
        sent: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bob Smith",
    lastMessage: "Thanks for the help with the presentation!",
    lastMessageTime: new Date(2024, 8, 10, 15, 45),
    messages: [
      {
        id: "1",
        content: "Could you help me with the presentation slides?",
        timestamp: new Date(2024, 8, 10, 10, 15),
        sent: false,
      },
      {
        id: "2",
        content: "Of course! I'll send you some examples right now",
        timestamp: new Date(2024, 8, 10, 10, 17),
        sent: true,
      },
      {
        id: "3",
        content: "Thanks for the help with the presentation!",
        timestamp: new Date(2024, 8, 10, 15, 45),
        sent: false,
      },
    ],
  },
  {
    id: "3",
    name: "Sarah Wilson",
    lastMessage: "See you tomorrow! 👋",
    lastMessageTime: new Date(2024, 8, 9, 20, 30),
    messages: [
      {
        id: "1",
        content: "Are you coming to the team meeting tomorrow?",
        timestamp: new Date(2024, 8, 9, 19, 15),
        sent: true,
      },
      {
        id: "2",
        content: "Yes, I'll be there at 9 AM sharp!",
        timestamp: new Date(2024, 8, 9, 19, 45),
        sent: false,
      },
      {
        id: "3",
        content: "Perfect! Looking forward to your presentation",
        timestamp: new Date(2024, 8, 9, 20, 0),
        sent: true,
      },
      {
        id: "4",
        content: "See you tomorrow! 👋",
        timestamp: new Date(2024, 8, 9, 20, 30),
        sent: false,
      },
    ],
  },
  {
    id: "4",
    name: "Mike Chen",
    lastMessage: "Perfect, let's do it! 🚀",
    lastMessageTime: new Date(2024, 8, 9, 16, 20),
    unreadCount: 1,
    messages: [
      {
        id: "1",
        content: "Want to collaborate on the new project?",
        timestamp: new Date(2024, 8, 9, 16, 15),
        sent: true,
      },
      {
        id: "2",
        content: "Perfect, let's do it! 🚀",
        timestamp: new Date(2024, 8, 9, 16, 20),
        sent: false,
      },
    ],
  },
  {
    id: "5",
    name: "Emma Davis",
    lastMessage: "Have a great weekend!",
    lastMessageTime: new Date(2024, 8, 8, 17, 30),
    messages: [
      {
        id: "1",
        content: "Thanks for all your help this week!",
        timestamp: new Date(2024, 8, 8, 17, 25),
        sent: true,
      },
      {
        id: "2",
        content: "Have a great weekend!",
        timestamp: new Date(2024, 8, 8, 17, 30),
        sent: false,
      },
    ],
  },
];