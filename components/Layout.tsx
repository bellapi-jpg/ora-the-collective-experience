
import React from 'react';
import { Compass, Search, Calendar, User, Users, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreateClick: () => void;
  onNotificationClick: () => void;
  hasUnreadNotifications: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onCreateClick, onNotificationClick, hasUnreadNotifications }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#FAF9F6] shadow-2xl relative overflow-x-hidden border-x-4 border-espresso">
      {/* Header Fixo */}
      <header className="px-6 pt-10 pb-8 sticky top-0 bg-[#FAF9F6]/95 backdrop-blur-xl z-30 flex justify-between items-center border-b-2 border-espresso/5">
        <h1 className="unbounded text-4xl font-black text-[#1A0F0E] tracking-tighter italic">ora.</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={onNotificationClick}
            className="relative p-2 text-espresso hover:bg-espresso/5 rounded-full transition-colors"
          >
            <Bell size={24} />
            {hasUnreadNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blush border-2 border-cream rounded-full"></span>
            )}
          </button>
          <button 
            onClick={onCreateClick}
            className="btn-hard bg-[#1A0F0E] text-[#FFF7AD] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
          >
            Sugerir
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-40">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-40">
        <nav className="bg-[#1A0F0E] py-5 px-6 rounded-[2.5rem] shadow-[8px_8px_0px_var(--espresso)] border-2 border-espresso flex justify-between items-center">
          <NavButton 
            icon={<Compass size={22} />} 
            active={activeTab === 'home'} 
            onClick={() => onTabChange('home')} 
          />
          <NavButton 
            icon={<Search size={22} />} 
            active={activeTab === 'explore'} 
            onClick={() => onTabChange('explore')} 
          />
          <NavButton 
            icon={<Users size={22} />} 
            active={activeTab === 'friends'} 
            onClick={() => onTabChange('friends')} 
          />
          <NavButton 
            icon={<Calendar size={22} />} 
            active={activeTab === 'events'} 
            onClick={() => onTabChange('events')} 
          />
          <NavButton 
            icon={<User size={22} />} 
            active={activeTab === 'profile'} 
            onClick={() => onTabChange('profile')} 
          />
        </nav>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ icon: React.ReactNode; active: boolean; onClick: () => void }> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`transition-all duration-300 relative ${active ? 'text-[#FFF7AD] scale-125' : 'text-[#FFF7AD]/20 hover:text-[#FFF7AD]/50'}`}
  >
    {icon}
    {active && (
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FF9494] rounded-full border border-espresso"></span>
    )}
  </button>
);

export default Layout;
