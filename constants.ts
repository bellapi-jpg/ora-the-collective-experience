
import { Category, Activity, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Helena',
  avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200',
  interests: ['Vinhos Naturais', 'Cine Cult', 'Arquitetura', 'Cerâmica'],
  bio: 'Colecionando momentos, não desculpas.'
};

export const ANCHOR_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Wine & Unwind',
    category: Category.DRINKS,
    description: 'Vinhos selecionados e a melhor vista da cidade. Um brinde ao agora no terraço mais cool de Manaus.',
    date: 'Sexta',
    time: '19:00',
    location: 'Terraço Clube',
    address: 'Adrianópolis, Manaus',
    host: { id: 'ora', name: 'ORA Curator', avatar: 'https://picsum.photos/seed/ora/200', interests: [] },
    participants: [],
    minParticipants: 3,
    maxParticipants: 8,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXfLcz-XuhxyNflX6rVUXEgCaP237mtH1hXg&s',
    isAnchor: true,
    messages: []
  },
  {
    id: 'a2',
    title: 'Martinis & Fries',
    category: Category.SOCIAL,
    description: 'Drinks clássicos e batatas crocantes no spot mais disputado do Vieiralves. Zero esforço, muita vibe.',
    date: 'Quinta',
    time: '20:00',
    location: 'Mizura Bar',
    address: 'Vieiralves, Manaus',
    host: { id: 'ora', name: 'ORA Curator', avatar: 'https://picsum.photos/seed/ora/200', interests: [] },
    participants: [],
    minParticipants: 3,
    maxParticipants: 8,
    imageUrl: 'https://www.tinbuilding.com/wp-content/uploads/2025/02/martini-and-fries-1.jpg',
    isAnchor: true,
    messages: []
  },
  {
    id: 'a3',
    title: "let's go for a run?",
    category: Category.NATURE,
    description: 'Endorfina e natureza. Um trote leve pelo Mindu seguido de água de coco e boas conversas.',
    date: 'Sábado',
    time: '07:30',
    location: 'Parque do Mindu',
    address: 'Parque 10, Manaus',
    host: { id: 'ora', name: 'ORA Curator', avatar: 'https://picsum.photos/seed/ora/200', interests: [] },
    participants: [],
    minParticipants: 3,
    maxParticipants: 8,
    imageUrl: 'https://www.shutterstock.com/image-photo/happy-woman-friends-running-forest-260nw-2364787129.jpg',
    isAnchor: true,
    messages: []
  },
  {
    id: 'a4',
    title: 'Brunch?',
    category: Category.DINING,
    description: 'Onde o café encontra a arte. Um ritual de sábado de manhã para quem ama mesa posta e conversa boa.',
    date: 'Sábado',
    time: '10:30',
    location: 'Mokaya Café',
    address: 'Vieiralves, Manaus',
    host: { id: 'ora', name: 'ORA Curator', avatar: 'https://picsum.photos/seed/ora/200', interests: [] },
    participants: [],
    minParticipants: 3,
    maxParticipants: 8,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    isAnchor: true,
    messages: []
  }
];
