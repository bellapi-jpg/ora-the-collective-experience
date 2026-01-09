import React from 'react';
import { X, MessageCircle, UserPlus, Sparkles, Clock } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onClose: () => void;
  onRead: (id: string) => void;
  onAction: (notification: AppNotification) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onClose, onRead, onAction }) => {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-espresso/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-[320px] bg-cream h-full border-l-4 border-espresso shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <header className="p-8 border-b-2 border-espresso/10 flex justify-between items-center">
          <div>
            <h3 className="unbounded text-lg font-black uppercase italic text-espresso">Inbox</h3>
            <p className="text-[9px] font-black uppercase text-blush tracking-widest">Suas atualizações</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-espresso/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div 
                key={n.id}
                onClick={() => {
                  onRead(n.id);
                  onAction(n);
                }}
                className={`p-5 rounded-[1.5rem] border-2 transition-all cursor-pointer relative group ${n.read ? 'bg-white border-espresso/5' : 'bg-white border-espresso shadow-[4px_4px_0px_var(--espresso)]'}`}
              >
                {!n.read && (
                  <span className="absolute top-4 right-4 w-2 h-2 bg-blush rounded-full" />
                )}
                
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-espresso ${
                    n.type === 'invite' ? 'bg-butter' : n.type === 'message' ? 'bg-blush' : 'bg-sage'
                  }`}>
                    {n.type === 'invite' && <UserPlus size={16} />}
                    {n.type === 'message' && <MessageCircle size={16} />}
                    {n.type === 'new_activity' && <Sparkles size={16} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="unbounded text-[9px] font-black uppercase leading-tight mb-1 text-espresso truncate">
                      {n.title}
                    </h4>
                    <p className="text-[10px] font-bold text-espresso/60 leading-tight mb-3">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-30">
                      <Clock size={10} />
                      <span className="text-[8px] font-black uppercase">Agora mesmo</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 px-8">
              <Sparkles size={48} className="mb-6" />
              <p className="unbounded text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Tudo em paz por aqui.<br/>Explore o mapa!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
