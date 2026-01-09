import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ActivityCard from './components/ActivityCard';
import ActivityDetail from './components/ActivityDetail';
import CreateModal from './components/CreateModal';
import Onboarding from './components/Onboarding';
import NotificationCenter from './components/NotificationCenter';
import { ANCHOR_ACTIVITIES, CURRENT_USER } from './constants';
import { Activity, Category, ChatMessage, User, AppNotification } from './types';
import { Sparkles, Star, Calendar, ArrowRight, Heart, ShieldCheck, UserPlus } from 'lucide-react';

const Manifesto = ({ onExplore }: { onExplore: () => void }) => (
  <div className="flex flex-col min-h-screen justify-center px-8 bg-butter animate-in fade-in duration-700 relative overflow-hidden">
    <div className="absolute top-20 left-10 opacity-20 rotate-12">
      <Star size={120} fill="#1A0F0E" />
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck size={16} className="text-espresso" />
        <span className="unbounded text-[10px] font-black uppercase tracking-widest text-espresso">Comunidade Curada</span>
      </div>
      <h2 className="unbounded text-6xl font-black leading-[0.9] text-espresso uppercase mb-10">
        Vontade <br/> de <br/> 
        <span className="text-blush">sair?</span>
      </h2>
      <div className="space-y-6 text-espresso leading-tight text-lg max-w-[300px] mb-12">
        <p className="font-bold">
          Rituais urbanos para mulheres que buscam conexão, não apenas presença.
        </p>
        <p className="text-sm opacity-60 italic">
          O vinho está gelado. A mesa está pronta. <br/> Só falta você chegar.
        </p>
      </div>
      <button 
        onClick={onExplore}
        className="btn-hard bg-espresso text-butter px-10 py-5 rounded-full flex items-center gap-4 group"
      >
        <span className="unbounded text-xs font-bold uppercase">DESCUBRIR ORA</span>
        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [appState, setAppState] = useState<'manifesto' | 'onboarding' | 'main'>('manifesto');
  const [activeTab, setActiveTab] = useState('home');
  const [activities, setActivities] = useState<Activity[]>(ANCHOR_ACTIVITIES);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [friends, setFriends] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const filteredActivities = activities.filter(a => filter === 'All' || a.category === filter);

  useEffect(() => {
    if (appState === 'main' && notifications.length === 0) {
      setTimeout(() => {
        const welcomeNotif: AppNotification = {
          id: 'welcome',
          type: 'new_activity',
          title: 'Bem-vinda ao ORA!',
          message: 'Explore os rituais da semana em Manaus.',
          timestamp: new Date(),
          read: false
        };
        setNotifications([welcomeNotif]);
      }, 2000);
    }
  }, [appState]);

  const handleJoin = (id: string) => {
    setActivities(prev => prev.map(a => {
      if (a.id === id) {
        if (a.participants.some(p => p.id === CURRENT_USER.id)) return a;
        return { ...a, participants: [...a.participants, CURRENT_USER] };
      }
      return a;
    }));
  };

  const handleAddFriend = (user: User) => {
    if (friends.some(f => f.id === user.id)) return;
    setFriends(prev => [...prev, user]);
  };

  const handleSendMessage = (activityId: string, text: string, isSystem = false) => {
    setActivities(prev => prev.map(a => {
      if (a.id === activityId) {
        const newMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          userId: isSystem ? 'system' : CURRENT_USER.id,
          userName: isSystem ? 'Sistema' : CURRENT_USER.name,
          userAvatar: isSystem ? '' : CURRENT_USER.avatar,
          text,
          timestamp: new Date()
        };
        return { ...a, messages: [...a.messages, newMessage] };
      }
      return a;
    }));
  };

  const handleCreate = (newActivity: any) => {
    const activity: Activity = {
      ...newActivity,
      host: CURRENT_USER,
      participants: [CURRENT_USER],
      messages: [],
    };
    setActivities([activity, ...activities]);
    setIsCreateModalOpen(false);
    setActiveTab('home');
  };

  if (appState === 'manifesto') return <Manifesto onExplore={() => setAppState('onboarding')} />;
  if (appState === 'onboarding') return <Onboarding onComplete={() => setAppState('main')} />;

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      onCreateClick={() => setIsCreateModalOpen(true)}
      onNotificationClick={() => setIsNotificationOpen(true)}
      hasUnreadNotifications={notifications.some(n => !n.read)}
    >
      {activeTab === 'home' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="mb-8 pt-4 flex justify-between items-start">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blush mb-2">Seu Momento</p>
              <h2 className="unbounded text-2xl font-black italic tracking-tight leading-tight text-espresso">
                Onde vamos <br/> hoje, {CURRENT_USER.name.split(' ')[0]}?
              </h2>
            </div>
            <div className="w-10 h-10 bg-blush border-2 border-espresso flex items-center justify-center text-espresso rotate-12 shadow-[2px_2px_0px_var(--espresso)] flex-shrink-0 mt-2">
              <Heart size={20} fill="currentColor" />
            </div>
          </header>

          <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
            {['All', ...Object.values(Category)].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border-2 flex-shrink-0 ${filter === cat ? 'bg-espresso text-butter border-espresso' : 'bg-white text-espresso border-espresso shadow-[2px_2px_0px_var(--espresso)]'}`}
              >
                {cat === 'All' ? 'Tudo' : cat}
              </button>
            ))}
          </div>

          <section className="space-y-12 pb-20">
            {filteredActivities.map(activity => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                onClick={() => setSelectedActivity(activity)} 
              />
            ))}
          </section>
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="pt-4 text-center py-20 opacity-40">
           <UserPlus size={48} className="mx-auto mb-6" />
           <p className="unbounded text-[10px] font-black uppercase">Sua rede está crescendo.</p>
        </div>
      )}

      {selectedActivity && (
        <ActivityDetail 
          activity={selectedActivity} 
          currentUser={CURRENT_USER}
          friends={friends}
          onClose={() => setSelectedActivity(null)}
          onJoin={handleJoin}
          onAddFriend={handleAddFriend}
          onSendMessage={handleSendMessage}
        />
      )}

      {isCreateModalOpen && (
        <CreateModal 
          friends={friends}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {isNotificationOpen && (
        <NotificationCenter 
          notifications={notifications}
          onClose={() => setIsNotificationOpen(false)}
          onRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
          onAction={() => setIsNotificationOpen(false)}
        />
      )}
    </Layout>
  );
};

export default App;
