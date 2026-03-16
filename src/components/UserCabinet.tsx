import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Gift, 
  Users, 
  Wallet, 
  Copy, 
  LogOut, 
  Sparkles, 
  ChevronRight,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

import { User, Offer } from '../types';

interface UserCabinetProps {
  user: User;
  offers: Offer[];
  onLogout: () => void;
}

export const UserCabinet = ({ user, offers, onLogout }: UserCabinetProps) => {
  const [copied, setCopied] = useState(false);

  const copyRefCode = () => {
    navigator.clipboard.writeText(user.refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-brand-black/40 p-6 rounded-[32px] border border-brand-gold/20 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <span className="text-brand-black font-serif text-3xl font-bold">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-brand-gold-light leading-tight">Привет, {user.name.split(' ')[0]}!</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Ваш персональный кабинет привилегий</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-rose-500 hover:border-rose-500/50 transition-all text-[10px] uppercase tracking-widest font-bold bg-brand-black/40 shadow-lg"
        >
          Выйти из системы <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-charcoal p-6 rounded-[32px] border border-brand-gold/10 shadow-lg group hover:border-brand-gold/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wallet className="text-brand-gold w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Бонусный баланс</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-serif text-white">{user.balance}</span>
            <span className="text-brand-gold font-serif text-2xl">₽</span>
          </div>
          <p className="text-[9px] text-brand-gold/50 mt-4 uppercase tracking-widest font-bold">Доступно для оплаты услуг</p>
        </div>

        <div className="bg-brand-charcoal p-6 rounded-[32px] border border-brand-gold/10 shadow-lg group hover:border-brand-gold/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="text-brand-gold w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Ваша сеть</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-serif text-white">{user.referrals}</span>
            <span className="text-brand-gold font-serif text-xl">чел.</span>
          </div>
          <p className="text-[9px] text-brand-gold/50 mt-4 uppercase tracking-widest font-bold">5% кэшбэк с их процедур</p>
        </div>

        <div className="bg-brand-charcoal p-6 rounded-[32px] border border-brand-gold/10 shadow-lg group hover:border-brand-gold/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="text-brand-gold w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Реф. код</span>
          </div>
          <div className="flex items-center justify-between bg-brand-black/40 p-4 rounded-2xl border border-brand-gold/20">
            <span className="font-mono text-2xl text-brand-gold tracking-[0.2em] font-bold">{user.refCode}</span>
            <button 
              onClick={copyRefCode}
              className="p-2 text-white/30 hover:text-brand-gold transition-colors bg-white/5 rounded-lg"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[9px] text-brand-gold/50 mt-4 uppercase tracking-widest font-bold text-center">Нажмите, чтобы скопировать</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Main Actions */}
        <div className="space-y-8">
          {/* Booking Card */}
          <div className="bg-gold-gradient p-10 rounded-[48px] text-brand-black relative overflow-hidden group cursor-pointer shadow-2xl hover:scale-[1.01] transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-black/10 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-4xl mb-3 leading-tight">Онлайн запись на процедуру</h3>
              <p className="text-brand-black/60 text-base mb-8 max-w-xs">Выберите удобное время и мастера в несколько кликов</p>
              <div className="inline-flex items-center gap-3 bg-brand-black text-brand-gold px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all">
                Забронировать визит <ExternalLink className="w-4 h-4" />
              </div>
            </div>
            <Calendar className="absolute -right-12 -bottom-12 w-64 h-64 text-brand-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
          </div>

          {/* Offers Section */}
          <div className="bg-brand-charcoal p-8 rounded-[48px] border border-brand-gold/20 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-3xl text-brand-gold-light flex items-center gap-4">
                <Gift className="w-8 h-8" /> Ваши персональные предложения
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {offers.length} активно
              </span>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {offers.map((offer) => (
                <div key={offer.id} className="p-6 rounded-[32px] bg-brand-black/40 border border-brand-gold/10 hover:border-brand-gold/40 transition-all flex flex-col gap-6 group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-brand-gold transition-colors">{offer.title}</h4>
                      <p className="text-white/40 text-xs leading-relaxed">{offer.desc}</p>
                    </div>
                    <div className="w-10 h-10 bg-brand-gold/5 rounded-full flex items-center justify-center shrink-0 border border-brand-gold/10">
                      <ChevronRight className="w-5 h-5 text-brand-gold" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-brand-gold/5 p-4 rounded-2xl border border-brand-gold/20">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-widest text-brand-gold/50 font-bold mb-1">Ваш промокод</span>
                      <span className="font-mono text-brand-gold font-bold tracking-[0.2em] text-lg">{offer.code}</span>
                    </div>
                    <button 
                      onClick={() => navigator.clipboard.writeText(offer.code)}
                      className="bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-black p-3 rounded-xl transition-all border border-brand-gold/20"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {offers.length === 0 && (
                <div className="text-center py-16 bg-brand-black/20 rounded-[32px] border border-dashed border-brand-gold/10">
                  <Gift className="w-12 h-12 text-white/5 mx-auto mb-4" />
                  <p className="text-white/20 italic text-sm">Персональные предложения появятся здесь в ближайшее время</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Referral Program Info */}
        <div className="bg-brand-charcoal p-10 rounded-[48px] border border-brand-gold/20 shadow-xl flex flex-col">
          <div className="mb-10">
            <h3 className="font-serif text-3xl text-brand-gold-light mb-4">Реферальная программа</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Зарабатывайте вместе с нами</p>
          </div>
          
          <div className="flex-1 space-y-8">
            <div className="p-8 rounded-[32px] bg-brand-black/40 border border-brand-gold/5 relative overflow-hidden">
              <p className="text-white/60 text-base leading-relaxed relative z-10">
                Делитесь своим кодом с друзьями! Они получают <span className="text-brand-gold font-bold">скидку на первый визит</span>, а вы — <span className="text-brand-gold font-bold">5% от стоимости</span> каждой их процедуры на ваш бонусный баланс навсегда.
              </p>
              <Users className="absolute -right-10 -bottom-10 w-48 h-48 text-brand-gold/5 -rotate-12" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Всего заработано</span>
                <span className="text-brand-gold font-serif text-2xl group-hover:scale-110 transition-transform">{user.balance} ₽</span>
              </div>
              <div className="w-full h-px bg-brand-gold/10" />
              <div className="flex justify-between items-center p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Активных друзей</span>
                <span className="text-brand-gold font-serif text-2xl group-hover:scale-110 transition-transform">{user.referrals}</span>
              </div>
              <div className="w-full h-px bg-brand-gold/10" />
              <div className="flex justify-between items-center p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Ваша ставка</span>
                <span className="text-brand-gold font-serif text-2xl group-hover:scale-110 transition-transform">5%</span>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button className="w-full bg-brand-black/40 border border-brand-gold/30 text-brand-gold py-6 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/10 transition-all shadow-lg hover:shadow-brand-gold/5">
                Просмотреть историю начислений
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
