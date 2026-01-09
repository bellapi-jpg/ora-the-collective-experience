import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Clock, Calendar, ChevronRight, UserPlus, Star, Send, Sparkles, MessageCircle, ShieldCheck, Flag, Map, Check, Share2 } from 'lucide-react';
import { Activity, User } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ActivityDetailProps {
  activity: Activity;
  currentUser: User;
  friends: User[];
  onClose: () => void;
  onJoin: (id: string) => void;
  onAddFriend: (user: User) => void;
  onSendMessage: (activityId: string, text: string, isSystem?: boolean) => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ activity, currentUser, friends, onClose, onJoin, onAddFriend, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'chat'>('info');
  const [msgInput, setMsgInput] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isShared, setIsShared] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isParticipant = activity.participants.some(p => p.id === currentUser.id);
  const isFull = activity.participants.length >= activity.maxParticipants;

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, activity.messages]);

  const handleSend = () => {
    if (!msgInput.trim()) return;
    onSendMessage(activity.id, msgInput);
    setMsgInput('');
  };

  const handleShare = async () => {
    const shareData = {
      title: `ORA: ${activity.title}`,
      text: `Vem comigo no ritual "${activity.title}" em Manaus? O vinho já está servido, só falta você chegar.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar link:', err);
      }
    }
  };

  const handleCheckIn = () => {
    onSendMessage(activity.id, "✨ Cheguei bem no local! Ansiosa para ver vocês.", true);
  };

  const generateIcebreaker = async () => {
    const apiKey = process?.env?.API_KEY;
    if (!apiKey) {
      setAiSuggestion("Oi meninas! Animadas pro nosso ritual?");
      return;
    }
    
    const ai = new GoogleGenAI({ apiKey });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie uma primeira mensagem curta e cool para um chat de grupo de mulheres que vão ao evento: "${activity.title}". Use um tom chill, amigável e puxe um assunto (ex: quem leva tal coisa, ou qual a expectativa). Em português. Máximo 100 caracteres.`,
      });
      setAiSuggestion(response.text || "Oi meninas! Animadas pro nosso ritual?");
    } catch (e) {
      setAiSuggestion("Oi meninas! Animadas pro nosso ritual?");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF9F6] overflow-hidden animate-in slide-in-from-bottom duration-500 border-x-4 border-espresso max-w-md mx-auto">
      {/* Header Fixo */}
      <div className="relative h-[25vh] border-b-4 border-espresso flex-shrink-0">
        <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
           <button 
            onClick={onClose}
            className="p-3 bg-espresso text-butter rounded-full border-2 border-espresso shadow-[2px_2px_0px_var(--espresso)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <X size={20} />
          </button>
          <div className="flex gap-2">
             <button 
                onClick={handleShare}
                className={`p-3 rounded-full border-2 border-espresso shadow-[2px_2px_0px_var(--espresso)] active:translate-x-0.5 active:translate-y-0.5 transition-colors ${isShared ? 'bg-emerald-400 text-espresso' : 'bg-butter text-espresso'}`}
             >
                {isShared ? <Check size={20} /> : <Share2 size={20} />}
             </button>
             <div className="sticker bg-sage text-espresso h-[48px] flex items-center">
                {activity.participants.length}/{activity.maxParticipants} Gals
             </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-espresso/40 backdrop-blur-md p-3 flex justify-around">
           <button 
            onClick={() => setActiveTab('info')}
            className={`unbounded text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-full transition-all ${activeTab === 'info' ? 'bg-butter text-espresso' : 'text-white/60'}`}
           >
             Info
           </button>
           <button 
            disabled={!isParticipant}
            onClick={() => setActiveTab('chat')}
            className={`unbounded text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-full transition-all ${!isParticipant ? 'opacity-30 cursor-not-allowed' : activeTab === 'chat' ? 'bg-blush text-espresso' : 'text-white/60'}`}
           >
             Chat {isParticipant && activity.messages.length > 0 && `(${activity.messages.length})`}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-48">
        {activeTab === 'info' ? (
          <div className="px-8 py-10 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.2em]">Encontro Verificado</span>
            </div>
            <h2 className="unbounded text-4xl font-black text-espresso mb-8 italic leading-[0.9] uppercase">{activity.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white p-6 border-4 border-espresso rounded-[2rem] shadow-[4px_4px_0px_var(--espresso)]">
                  <Calendar size={18} className="text-blush mb-3" />
                  <p className="text-[10px] font-black uppercase text-espresso">{activity.date}</p>
              </div>
              <div className="bg-white p-6 border-4 border-espresso rounded-[2rem] shadow-[4px_4px_0px_var(--espresso)]">
                  <Clock size={18} className="text-blush mb-3" />
                  <p className="text-[10px] font-black uppercase text-espresso">{activity.time}</p>
              </div>
            </div>

            <div className="bg-sage border-4 border-espresso p-8 rounded-[2.5rem] shadow-[6px_6px_0px_var(--espresso)] mb-10">
                <div className="flex justify-between items-start">
                  <MapPin size={20} className="text-espresso mb-4" />
                  <Map size={16} className="text-espresso/40" />
                </div>
                <h4 className="unbounded text-xs font-black uppercase text-espresso mb-1">{activity.location}</h4>
                <p className="text-[10px] text-espresso font-bold opacity-60 uppercase">{activity.address}</p>
            </div>

            <div className="mb-12">
              <h3 className="unbounded text-[10px] font-black text-espresso uppercase mb-6 tracking-widest">GUEST LIST</h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-[1.8rem] border-2 border-espresso">
                   <div className="w-12 h-12 rounded-full border-2 border-espresso p-0.5 relative">
                     <img src={activity.host.avatar} className="w-full h-full rounded-full object-cover" />
                     <div className="absolute -top-1 -right-1 bg-butter border border-espresso p-1 rounded-full">
                        <Star size={8} fill="#1A0F0E" className="text-espresso" />
                     </div>
                   </div>
                   <div className="flex-1">
                      <p className="unbounded text-[8px] font-black uppercase text-espresso leading-none mb-1">{activity.host.name}</p>
                      <p className="text-[7px] font-black uppercase text-blush tracking-wider">Host Curadora</p>
                   </div>
                   {isParticipant && activity.host.id !== currentUser.id && (
                     <button 
                      onClick={() => onAddFriend(activity.host)}
                      className={`p-3 rounded-full border-2 border-espresso transition-all ${friends.some(f => f.id === activity.host.id) ? 'bg-emerald-400' : 'bg-butter shadow-[2px_2px_0px_var(--espresso)]'}`}
                     >
                        {friends.some(f => f.id === activity.host.id) ? <Check size={14} /> : <UserPlus size={14} />}
                     </button>
                   )}
                </div>

                {activity.participants.filter(p => p.id !== activity.host.id).map((p) => (
                  <div key={p.id} className="flex items-center gap-4 bg-white/50 p-4 rounded-[1.8rem] border-2 border-espresso/10">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover border-2 border-espresso" />
                    <div className="flex-1">
                      <p className="unbounded text-[8px] font-black uppercase text-espresso leading-none mb-1">{p.name}</p>
                      <p className="text-[7px] font-bold uppercase text-espresso/40">Membro</p>
                    </div>
                    {isParticipant && p.id !== currentUser.id && (
                      <button 
                        onClick={() => onAddFriend(p)}
                        className={`p-3 rounded-full border-2 border-espresso transition-all ${friends.some(f => f.id === p.id) ? 'bg-emerald-400' : 'bg-white shadow-[2px_2px_0px_var(--espresso)]'}`}
                      >
                         {friends.some(f => f.id === p.id) ? <Check size={14} /> : <UserPlus size={14} />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-butter border-4 border-espresso rounded-[2.5rem] shadow-[4px_4px_0px_var(--espresso)]">
              <p className="unbounded text-[10px] font-black uppercase leading-relaxed text-espresso italic">
                "{activity.description}"
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col min-h-full bg-[#FAF9F6] animate-in fade-in duration-300">
            <div className="px-6 py-4 bg-espresso text-butter border-b-2 border-espresso flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <ShieldCheck size={18} />
                 <p className="text-[8px] font-black uppercase tracking-[0.2em]">Círculo de Segurança ORA</p>
               </div>
               <span className="text-[8px] font-bold opacity-40 uppercase">Apenas vocês</span>
            </div>

            <div className="flex-1 p-6 space-y-8">
              {activity.messages.length === 0 && (
                <div className="text-center py-20 opacity-20">
                  <MessageCircle size={48} className="mx-auto mb-6" />
                  <p className="unbounded text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    A vibe começa aqui.<br/>Diga oi para as outras!
                  </p>
                  {!aiSuggestion && (
                    <button 
                      onClick={generateIcebreaker}
                      className="mt-10 flex items-center gap-3 mx-auto bg-butter border-2 border-espresso px-6 py-3 rounded-full text-[9px] font-black shadow-[3px_3px_0px_var(--espresso)]"
                    >
                      <Sparkles size={14} />
                      GERAR ICEBREAKER
                    </button>
                  )}
                </div>
              )}

              {aiSuggestion && activity.messages.length === 0 && (
                <div className="bg-white border-4 border-espresso p-6 rounded-[2rem] shadow-[6px_6px_0px_var(--espresso)] animate-in bounce-in duration-500">
                  <div className="flex items-center gap-2 mb-3">
                     <div className="p-1.5 bg-butter border-2 border-espresso rounded-full"><Sparkles size={12} /></div>
                     <p className="text-[9px] font-black uppercase tracking-widest">DICA ORA</p>
                  </div>
                  <p className="text-xs font-bold leading-tight mb-4 italic">"{aiSuggestion}"</p>
                  <button 
                    onClick={() => { onSendMessage(activity.id, aiSuggestion); setAiSuggestion(null); }}
                    className="w-full py-3 bg-espresso text-butter text-[8px] font-black uppercase rounded-xl"
                  >
                    Usar sugestão agora
                  </button>
                </div>
              )}

              {activity.messages.map((msg) => {
                const isMe = msg.userId === currentUser.id;
                const isSystem = msg.userId === 'system';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="chat-bubble-system p-4 text-center mx-4">
                       <p className="serif text-[11px] font-bold italic leading-tight text-espresso/60">
                         {msg.text}
                       </p>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`flex gap-3 items-end ${isMe ? 'flex-row-reverse' : ''}`}>
                    <img 
                      src={msg.userAvatar} 
                      className="w-9 h-9 rounded-2xl border-2 border-espresso object-cover shadow-[2px_2px_0px_var(--espresso)] flex-shrink-0" 
                    />
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      {!isMe && (
                        <p className="unbounded text-[7px] font-black uppercase text-espresso/40 ml-1 mb-1 tracking-widest">
                          {msg.userName}
                        </p>
                      )}
                      <div className={`p-4 ${isMe ? 'chat-bubble-me' : 'chat-bubble-them'}`}>
                        <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
                      </div>
                      <p className={`text-[6px] font-black uppercase mt-1 opacity-20 ${isMe ? 'text-right mr-1' : 'text-left ml-1'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-[#FAF9F6]/90 backdrop-blur-xl z-50 max-w-md mx-auto border-t-4 border-espresso">
        {activeTab === 'info' ? (
          isParticipant ? (
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('chat')}
                className="flex-1 bg-emerald-400 text-espresso py-6 rounded-full border-4 border-espresso font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[6px_6px_0px_var(--espresso)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                ENTRAR NO CHAT
              </button>
              <button 
                onClick={handleCheckIn}
                className="bg-butter text-espresso p-6 rounded-full border-4 border-espresso shadow-[4px_4px_0px_var(--espresso)] active:translate-x-0.5 active:translate-y-0.5"
                title="Cheguei Bem"
              >
                <ShieldCheck size={24} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onJoin(activity.id)}
              disabled={isFull}
              className="w-full bg-espresso text-butter py-6 rounded-full border-4 border-espresso font-black text-xs uppercase tracking-[0.2em] hover:bg-blush hover:text-espresso transition-all shadow-[8px_8px_0px_var(--espresso)] disabled:opacity-20 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              {isFull ? 'LISTA CHEIA' : 'CONFIRMAR VIBE'}
            </button>
          )
        ) : (
          <div className="flex gap-4 items-center bg-white border-4 border-espresso rounded-[2.5rem] p-2 pl-6 shadow-[6px_6px_0px_var(--espresso)]">
            <input 
              type="text" 
              placeholder="Envie uma mensagem..."
              className="flex-1 bg-transparent py-4 font-bold text-xs outline-none placeholder:text-espresso/20"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-espresso text-butter p-4 rounded-full border-2 border-espresso transition-transform hover:scale-110 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;
