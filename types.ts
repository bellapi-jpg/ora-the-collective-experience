export enum Category {
  DINING = 'Dining',
  DRINKS = 'Drinks',
  CULTURE = 'Culture',
  NATURE = 'Nature',
  SOCIAL = 'Social',
  CUSTOM = 'Community'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  bio?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: Date;
}

export interface AppNotification {
  id: string;
  type: 'invite' | 'message' | 'new_activity';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  activityId?: string;
  sender?: User;
}

export interface Activity {
  id: string;
  title: string;
  category: Category;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  host: User;
  participants: User[];
  maxParticipants: number;
  minParticipants: number;
  imageUrl: string;
  isAnchor: boolean;
  messages: ChatMessage[];
}
