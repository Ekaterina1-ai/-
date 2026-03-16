import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  ChevronRight, 
  Wallet, 
  Plus, 
  Minus, 
  Gift, 
  PlusCircle, 
  Trash2,
  LogOut,
  Settings
} from 'lucide-react';
import { User, Offer } from '../types';

interface AdminPanelProps {
  users: User[];
  offers: Offer[];
  setUsers: (users: User[]) => void;
  setOffers: (offers: Offer[]) => void;
  onLogout: () => void;
}

export const AdminPanel = ({ users, offers, setUsers, setOffers, onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'users' | 'offers' | 'dashboard'>('dashboard');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newOffer, setNewOffer] = useState({ title: '', desc: '', code: '' });

  const handleBalanceChange = (userId: string, amount: number) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, balance: Math.max(0, u.balance + amount) } : u);
    setUsers(updatedUsers);
    if (selectedUser?.id === userId) {
      setSelectedUser(prev => prev ? { ...prev, balance: Math.max(0, prev.balance + amount) } : null);
    }
  };

  const addOffer = () => {
    if (newOffer.title && newOffer.code) {
      setOffers([...offers, { ...newOffer, id: Date.now().toString() }]);
      setNewOffer({ title: '', desc: '', code: '' });
    }
  };

  const deleteOffer = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.phone.includes(searchQuery)
  );

  const totalBalance = users.reduce((sum, u) => sum + u.balance, 0);
  const totalReferrals = users.reduce((sum, u) => sum + u.referrals, 0);

  return (
    <div className="w-full mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-brand-black/40 p-6 md:p-8 rounded-[32px] border border-brand-gold/20 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <Settings className="text-brand-black w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-gold-light leading-tight">Панель администратора</h2>
            <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">Система управления лояльностью</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex bg-brand-black/60 p-1 rounded-full border border-brand-gold/10 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-brand-gold text-brand-black shadow-md' : 'text-brand-gold/60 hover:text-brand-gold'}`}
            >
              Обзор
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-brand-gold text-brand-black shadow-md' : 'text-brand-gold/60 hover:text-brand-gold'}`}
            >
              Клиенты
            </button>
            <button 
              onClick={() => setActiveTab('offers')}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'offers' ? 'bg-brand-gold text-brand-black shadow-md' : 'text-brand-gold/60 hover:text-brand-gold'}`}
            >
              Акции
            </button>
          </div>
          <button onClick={onLogout} className="ml-auto lg:ml-4 p-3 text-white/30 hover:text-rose-500 transition-colors bg-brand-black/40 rounded-full border border-white/5">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-brand-charcoal p-6 md:p-8 rounded-[32px] border border-brand-gold/10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <Users className="text-brand-gold w-5 h-5" />
                </div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Всего клиентов</span>
              </div>
              <div className="text-4xl md:text-5xl font-serif text-white">{users.length}</div>
            </div>
            <div className="bg-brand-charcoal p-6 md:p-8 rounded-[32px] border border-brand-gold/10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <Wallet className="text-brand-gold w-5 h-5" />
                </div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Общий баланс</span>
              </div>
              <div className="text-4xl md:text-5xl font-serif text-white">{totalBalance} ₽</div>
            </div>
            <div className="bg-brand-charcoal p-6 md:p-8 rounded-[32px] border border-brand-gold/10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <Gift className="text-brand-gold w-5 h-5" />
                </div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Рефералов</span>
              </div>
              <div className="text-4xl md:text-5xl font-serif text-white">{totalReferrals}</div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Users List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="text"
                  placeholder="Поиск по имени или тел..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-charcoal border border-brand-gold/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-brand-gold/40 transition-all"
                />
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-5 rounded-3xl border transition-all flex items-center justify-between group ${selectedUser?.id === user.id ? 'bg-brand-gold/10 border-brand-gold/50 shadow-lg' : 'bg-brand-charcoal border-brand-gold/5 hover:border-brand-gold/20'}`}
                  >
                    <div className="text-left">
                      <h4 className="text-white font-bold text-sm mb-1">{user.name}</h4>
                      <p className="text-white/40 text-xs">{user.phone}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-brand-gold transition-transform ${selectedUser?.id === user.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* User Detail */}
            <div className="lg:col-span-2 min-h-[400px]">
              <AnimatePresence mode="wait">
                {selectedUser ? (
                  <motion.div
                    key={selectedUser.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-brand-charcoal p-6 md:p-10 rounded-[40px] border border-brand-gold/20 h-full shadow-2xl"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                      <div>
                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">{selectedUser.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-brand-gold font-mono text-sm tracking-widest bg-brand-gold/10 px-3 py-1 rounded-lg border border-brand-gold/20">
                            Код: {selectedUser.refCode}
                          </span>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold mb-1">Рефералов</p>
                        <span className="text-2xl md:text-3xl text-white font-serif">{selectedUser.referrals}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                      <div className="bg-brand-black/40 p-6 md:p-8 rounded-[32px] border border-brand-gold/10">
                        <div className="flex items-center gap-3 mb-4">
                          <Wallet className="text-brand-gold w-5 h-5" />
                          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Текущий баланс</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-serif text-white mb-6">{selectedUser.balance} ₽</div>
                        
                        <div className="space-y-3">
                          <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">Управление балансом</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => handleBalanceChange(selectedUser.id, 100)}
                              className="bg-emerald-500/10 text-emerald-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" /> 100
                            </button>
                            <button 
                              onClick={() => handleBalanceChange(selectedUser.id, -100)}
                              className="bg-rose-500/10 text-rose-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-all border border-rose-500/20 text-xs font-bold"
                            >
                              <Minus className="w-3 h-3" /> 100
                            </button>
                            <button 
                              onClick={() => handleBalanceChange(selectedUser.id, 500)}
                              className="bg-emerald-500/10 text-emerald-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" /> 500
                            </button>
                            <button 
                              onClick={() => handleBalanceChange(selectedUser.id, -500)}
                              className="bg-rose-500/10 text-rose-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-500/20 transition-all border border-rose-500/20 text-xs font-bold"
                            >
                              <Minus className="w-3 h-3" /> 500
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-brand-gold/5 border border-brand-gold/10">
                          <h4 className="text-brand-gold text-[9px] font-bold uppercase tracking-widest mb-2">Контактные данные</h4>
                          <p className="text-white text-base md:text-lg">{selectedUser.phone}</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-brand-black/20 border border-white/5">
                          <h4 className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">Дата регистрации</h4>
                          <p className="text-white/60 text-base md:text-lg">{selectedUser.registrationDate}</p>
                        </div>
                        <button className="w-full py-4 rounded-xl border border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold/10 transition-all shadow-lg">
                          История операций
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-brand-charcoal/50 rounded-[48px] border border-dashed border-brand-gold/20 text-white/20 p-12 text-center">
                    <div className="w-24 h-24 bg-brand-gold/5 rounded-full flex items-center justify-center mb-6">
                      <Users className="w-10 h-10 opacity-20" />
                    </div>
                    <h3 className="font-serif text-2xl mb-2">Клиент не выбран</h3>
                    <p className="text-sm max-w-xs">Выберите клиента из списка слева, чтобы управлять его балансом и просматривать данные</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Offers List */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl md:text-3xl text-white flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                  <Gift className="text-brand-gold w-5 h-5" />
                </div>
                Текущие акции
              </h3>
              <div className="grid gap-4">
                {offers.map(offer => (
                  <motion.div 
                    layout
                    key={offer.id} 
                    className="bg-brand-charcoal p-6 rounded-[32px] border border-brand-gold/10 flex justify-between items-center group hover:border-brand-gold/30 transition-all shadow-lg"
                  >
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-lg mb-1">{offer.title}</h4>
                      <p className="text-white/40 text-xs mb-3 line-clamp-2">{offer.desc}</p>
                      <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-mono rounded-lg border border-brand-gold/20 font-bold tracking-widest">
                        {offer.code}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteOffer(offer.id)}
                      className="text-white/10 hover:text-rose-500 transition-colors p-3 bg-white/5 rounded-2xl hover:bg-rose-500/10 shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
                {offers.length === 0 && (
                  <div className="text-center py-20 bg-brand-charcoal/50 rounded-[40px] border border-dashed border-brand-gold/20">
                    <Gift className="w-12 h-12 text-white/10 mx-auto mb-4" />
                    <p className="text-white/20 italic">Нет активных предложений</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add Offer Form */}
            <div className="bg-brand-charcoal p-6 md:p-8 rounded-[40px] border border-brand-gold/20 h-fit lg:sticky lg:top-8 shadow-2xl">
              <h3 className="font-serif text-2xl md:text-3xl text-brand-gold-light mb-8 flex items-center gap-4">
                <PlusCircle className="w-6 h-6 md:w-8 h-8 text-brand-gold" /> Новая акция
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4 font-bold">Заголовок</label>
                  <input 
                    type="text"
                    value={newOffer.title}
                    onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                    placeholder="Напр: Скидка 20% на LPG"
                    className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4 font-bold">Описание</label>
                  <textarea 
                    value={newOffer.desc}
                    onChange={(e) => setNewOffer({...newOffer, desc: e.target.value})}
                    placeholder="Краткое описание условий..."
                    className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-brand-gold/50 h-24 resize-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4 font-bold">Промокод</label>
                  <input 
                    type="text"
                    value={newOffer.code}
                    onChange={(e) => setNewOffer({...newOffer, code: e.target.value.toUpperCase()})}
                    placeholder="SUMMER2026"
                    className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-xl py-4 px-6 text-white text-sm font-mono focus:outline-none focus:border-brand-gold/50 uppercase tracking-widest transition-all"
                  />
                </div>
                <button 
                  onClick={addOffer}
                  className="w-full bg-gold-gradient text-brand-black py-5 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg"
                >
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
