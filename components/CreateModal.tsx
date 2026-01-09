import React, { useState } from 'react';
import { X, Wand2, Plus, Check } from 'lucide-react';
import { Category, User } from '../types';
import { generateAIVibeDescription } from '../services/geminiService';

interface CreateModalProps {
  friends: User[];
  onClose: () => void;
  onSubmit: (activity: any) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ friends, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: Category.SOCIAL,
    description: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: 8,
    minParticipants: 3
  });

  const handleMagicDescription = async () => {
    if (!formData.title) return;
    setLoading(true);
    const desc = await generateAIVibeDescription(formData.title, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      isAnchor: false,
      participants: [],
      imageUrl: `https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800`
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#FAF9F6] overflow-y-auto animate-in slide-in-from-bottom duration-500 border-x-4 border-espresso max-w-md mx-auto">
      <div className="px-8 py-10 flex items-center justify-between">
        <h2 className="unbounded text-3xl font-black text-espresso uppercase italic tracking-tighter">Sugerir rolê.</h2>
        <button onClick={onClose} className="p-4 bg-espresso text-butter rounded-full border-2 border-espresso shadow-[2px_2px_0px_var(--espresso)]">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="px-8 space-y-10 pb-32">
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30 px-1">O que vamos fazer?</label>
          <input 
            required
            type="text" 
            placeholder="Ex: Tarde de Cerâmica"
            className="w-full bg-white border-2 border-espresso rounded-[1.8rem] px-6 py-5 focus:ring-4 focus:ring-blush/20 outline-none transition-all shadow-[4px_4px_0px_var(--espresso)] placeholder:text-espresso/10 font-bold"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30 px-1">Vibe</label>
            <select 
              className="w-full bg-white border-2 border-espresso rounded-[1.8rem] px-6 py-5 outline-none appearance-none shadow-[4px_4px_0px_var(--espresso)] text-[10px] font-black uppercase"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
            >
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30 px-1">Máx (8)</label>
            <input 
              type="number" 
              min="3"
              max="8"
              className="w-full bg-white border-2 border-espresso rounded-[1.8rem] px-6 py-5 outline-none shadow-[4px_4px_0px_var(--espresso)] text-[10px] font-black"
              value={formData.maxParticipants}
              onChange={e => setFormData({ ...formData, maxParticipants: Math.min(8, Math.max(3, parseInt(e.target.value))) })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30">Descrição</label>
            <button 
              type="button"
              onClick={handleMagicDescription}
              disabled={loading || !formData.title}
              className="text-blush flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-espresso transition-colors disabled:opacity-30"
            >
              <Wand2 size={12} />
              {loading ? 'Pensando...' : 'AI Vibe'}
            </button>
          </div>
          <textarea 
            required
            rows={4}
            placeholder="Diga por que esse encontro vai ser incrível..."
            className="w-full bg-white border-2 border-espresso rounded-[2rem] px-6 py-6 outline-none transition-all shadow-[4px_4px_0px_var(--espresso)] resize-none text-sm font-bold leading-relaxed"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Invite Friends Section */}
        {friends.length > 0 && (
          <div className="space-y-6">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30 px-1">Convidar Amigas</label>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {friends.map(friend => (
                <div 
                  key={friend.id}
                  onClick={() => toggleFriend(friend.id)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
                >
                  <div className={`relative w-16 h-16 rounded-full border-2 transition-all p-0.5 ${selectedFriends.includes(friend.id) ? 'border-emerald-400 scale-110' : 'border-espresso opacity-40'}`}>
                    <img src={friend.avatar} className="w-full h-full rounded-full object-cover" />
                    {selectedFriends.includes(friend.id) && (
                      <div className="absolute -top-1 -right-1 bg-emerald-400 border border-espresso p-1 rounded-full">
                        <Check size={8} className="text-espresso" />
                      </div>
                    )}
                  </div>
                  <span className="text-[8px] font-black uppercase text-espresso">{friend.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30 px-1">Data</label>
            <input 
              required
              type="date" 
              className="w-full bg-white border-2 border-espresso rounded-[1.5rem] px-6 py-4 outline-none text-[10px] font-black shadow-[4px_4px_0px_var(--espresso)]"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-espresso/30 px-1">Hora</label>
            <input 
              required
              type="time" 
              className="w-full bg-white border-2 border-espresso rounded-[1.5rem] px-6 py-4 outline-none text-[10px] font-black shadow-[4px_4px_0px_var(--espresso)]"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full bg-espresso text-butter py-6 rounded-full border-4 border-espresso font-black text-xs uppercase tracking-[0.2em] shadow-[8px_8px_0px_var(--espresso)] active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_var(--espresso)] transition-all"
          >
            LANÇAR NO FEED
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
