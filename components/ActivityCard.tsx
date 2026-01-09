import React from 'react';
import { MapPin, Clock, ArrowRight, Users } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onClick: (id: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const current = activity.participants.length;
  const isFull = current >= activity.maxParticipants;
  const hasQuorum = current >= activity.minParticipants;

  return (
    <div 
      onClick={() => onClick(activity.id)}
      className="group cursor-pointer transition-all duration-500"
    >
      <div className="bg-white border-4 border-espresso rounded-[3rem] p-4 shadow-[12px_12px_0px_var(--espresso)] group-hover:shadow-[6px_6px_0px_var(--espresso)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
        <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-6 border-2 border-espresso">
          <img 
            src={activity.imageUrl} 
            alt={activity.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="sticker bg-blush">{activity.category}</span>
            <span className={`sticker ${isFull ? 'bg-red-400' : hasQuorum ? 'bg-emerald-400' : 'bg-butter'}`}>
              {isFull ? 'FULL' : `${current}/${activity.maxParticipants}`}
            </span>
          </div>
        </div>
        
        <div className="px-2 pb-2">
          <div className="flex justify-between items-start mb-4">
            <h3 className="unbounded text-2xl font-black uppercase leading-[1.1] text-espresso italic group-hover:text-blush transition-colors">{activity.title}</h3>
            <div className="bg-espresso text-butter p-3 rounded-full">
               <ArrowRight size={20} />
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-espresso text-[9px] font-black uppercase tracking-widest overflow-hidden">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Clock size={12} className="text-blush" />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <MapPin size={12} className="text-blush" />
              <span className="truncate max-w-[100px]">{activity.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
