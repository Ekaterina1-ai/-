import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Leaf,
  ChevronRight,
  Instagram,
  Send,
  X,
  User as UserIcon,
  Lock,
  Shield,
  Users,
  Gift,
  Calendar,
  Wallet,
  Copy,
  LogOut,
  UserPlus
} from 'lucide-react';
import { UserCabinet } from './components/UserCabinet';
import { AdminPanel } from './components/AdminPanel';
import { User, Offer } from './types';

const BonusRegistration = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'register' | 'login' | 'adminLogin' | 'success' | 'cabinet' | 'admin'>('register');
  
  // Shared State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('body_norm_users');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Александра Иванова', phone: '+7 (999) 123-45-67', balance: 1250, referrals: 3, refCode: 'XT42', registrationDate: '12.03.2026' },
      { id: '2', name: 'Дмитрий Петров', phone: '+7 (900) 555-11-22', balance: 450, referrals: 1, refCode: 'DP01', registrationDate: '10.03.2026' },
      { id: '3', name: 'Мария Сидорова', phone: '+7 (911) 222-33-44', balance: 3200, referrals: 8, refCode: 'MS88', registrationDate: '05.03.2026' },
    ];
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('body_norm_offers');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Скидка 15% на массаж лица', desc: 'Только до конца недели', code: 'FACE15' },
      { id: '2', title: 'Вторая процедура в подарок', desc: 'При записи на лазерную эпиляцию', code: 'GIFT2' },
    ];
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [adminCredentials, setAdminCredentials] = useState({ login: '', password: '' });

  useEffect(() => {
    localStorage.setItem('body_norm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('body_norm_offers', JSON.stringify(offers));
  }, [offers]);

  const currentUser = users.find(u => u.id === currentUserId);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      balance: 0,
      referrals: 0,
      refCode: Math.random().toString(36).substr(2, 4).toUpperCase(),
      registrationDate: new Date().toLocaleDateString('ru-RU')
    };
    
    setUsers([...users, newUser]);
    setCurrentUserId(newUser.id);
    setStep('success');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nameOrPhone = formData.get('name') as string;
    
    const user = users.find(u => 
      u.name.toLowerCase() === nameOrPhone.toLowerCase() || 
      u.phone.replace(/\D/g, '') === nameOrPhone.replace(/\D/g, '')
    );
    if (user) {
      setCurrentUserId(user.id);
      setStep('cabinet');
    } else {
      alert('Пользователь не найден. Проверьте ФИО или номер телефона.');
    }
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.login === 'admin' && adminCredentials.password === 'admin') {
      setStep('admin');
    } else {
      alert('Неверный логин или пароль администратора');
    }
  };

  const handleLogout = () => {
    setStep('register');
    setCurrentUserId(null);
    onClose();
  };

  const updateUsers = (newUsers: User[]) => setUsers(newUsers);
  const updateOffers = (newOffers: Offer[]) => setOffers(newOffers);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-black flex items-start justify-center p-4 md:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`w-full ${step === 'cabinet' ? 'max-w-4xl' : step === 'admin' ? 'max-w-6xl' : 'max-w-lg'} bg-brand-charcoal rounded-[40px] ${step === 'cabinet' || step === 'admin' ? 'p-4 md:p-4 lg:p-6' : 'p-4 md:p-8 lg:p-12'} relative border border-brand-gold/20 shadow-2xl my-8 mx-auto`}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-brand-gold transition-all z-50 bg-white/5 p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {step === 'register' && (
              <>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Sparkles className="text-brand-black w-8 h-8" />
                  </div>
                  <h2 className="font-serif text-4xl bg-gold-gradient bg-clip-text text-transparent mb-4">Бонусная программа</h2>
                  <p className="text-white/50 text-sm">Присоединяйтесь к привилегированному клубу «Норма Тела»</p>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">ФИО</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                        placeholder="Александров Александр"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">Телефон</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">Реф. код (если есть)</label>
                      <div className="relative">
                        <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                        <input 
                          type="text" 
                          name="refCode"
                          maxLength={4}
                          className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-all uppercase"
                          placeholder="ABCD"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">Пароль</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                      <input 
                        type="password" 
                        required
                        className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1">
                      <input type="checkbox" required className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-brand-gold/30 rounded-md bg-brand-black/40 peer-checked:bg-brand-gold peer-checked:border-brand-gold transition-all"></div>
                      <Shield className="absolute inset-0 m-auto w-3 h-3 text-brand-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors leading-tight">
                      Я согласен (-на) на обработку персональных данных
                    </span>
                  </label>

                  <button className="w-full bg-gold-gradient text-brand-black py-5 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all mt-4 shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_50px_rgba(197,160,89,0.5)]">
                    Зарегистрироваться
                  </button>

                  <div className="text-center">
                    <button 
                      type="button"
                      onClick={() => setStep('login')}
                      className="text-brand-gold/60 hover:text-brand-gold text-xs uppercase tracking-widest font-bold transition-colors"
                    >
                      Уже зарегистрированы? Войти
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 'login' && (
              <>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <UserIcon className="text-brand-black w-8 h-8" />
                  </div>
                  <h2 className="font-serif text-4xl bg-gold-gradient bg-clip-text text-transparent mb-4">Вход в кабинет</h2>
                  <p className="text-white/50 text-sm">Введите свои данные для доступа к бонусам</p>
                </div>

                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">ФИО или Телефон</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                        placeholder="Александр или +7999..."
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">Пароль</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
                      <input 
                        type="password" 
                        required
                        className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-gold-gradient text-brand-black py-5 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all mt-4 shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_50px_rgba(197,160,89,0.5)]">
                    Войти
                  </button>

                  <div className="text-center space-y-4">
                    <button 
                      type="button"
                      onClick={() => setStep('register')}
                      className="text-brand-gold/60 hover:text-brand-gold text-xs uppercase tracking-widest font-bold transition-colors block w-full"
                    >
                      Нет аккаунта? Зарегистрироваться
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep('adminLogin')}
                      className="text-white/10 hover:text-white/30 text-[10px] uppercase tracking-widest transition-colors"
                    >
                      Вход для персонала
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 'adminLogin' && (
              <>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-gold/20">
                    <Lock className="text-brand-gold w-8 h-8" />
                  </div>
                  <h2 className="font-serif text-4xl text-white mb-4">Вход для персонала</h2>
                  <p className="text-white/50 text-sm">Панель управления салоном</p>
                </div>

                <form className="space-y-6" onSubmit={handleAdminLoginSubmit}>
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">Логин</label>
                    <input 
                      type="text" 
                      required
                      value={adminCredentials.login}
                      onChange={(e) => setAdminCredentials({...adminCredentials, login: e.target.value})}
                      className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                      placeholder="admin"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-brand-gold/50 mb-2 ml-4">Пароль</label>
                    <input 
                      type="password" 
                      required
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                      className="w-full bg-brand-black/40 border border-brand-gold/20 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-gold/50 transition-all"
                      placeholder="••••••••"
                    />
                  </div>

                  <button className="w-full bg-white text-brand-black py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-gold transition-all mt-4">
                    Войти в панель
                  </button>

                  <button 
                    type="button"
                    onClick={() => setStep('login')}
                    className="w-full text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors"
                  >
                    Вернуться к входу для клиентов
                  </button>
                </form>
              </>
            )}

            {step === 'success' && (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="text-emerald-500 w-10 h-10" />
                </div>
                <h2 className="font-serif text-4xl text-white mb-4">Успешная регистрация!</h2>
                <p className="text-white/50 mb-10">Теперь вы можете войти в свой личный кабинет и пользоваться всеми привилегиями.</p>
                <button 
                  onClick={() => setStep('cabinet')}
                  className="w-full bg-gold-gradient text-brand-black py-5 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                >
                  Войти в кабинет
                </button>
              </div>
            )}

            {step === 'cabinet' && currentUser && (
              <UserCabinet 
                user={currentUser} 
                offers={offers}
                onLogout={handleLogout} 
              />
            )}

            {step === 'admin' && (
              <AdminPanel 
                users={users} 
                offers={offers} 
                setUsers={updateUsers} 
                setOffers={updateOffers} 
                onLogout={handleLogout} 
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenBonus }: { onOpenBonus: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/90 backdrop-blur-md border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.4)]">
            <Sparkles className="text-brand-black w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight bg-gold-gradient bg-clip-text text-transparent">Норма Тела</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-brand-gold/70">
          <a href="#services" className="hover:text-brand-gold transition-colors">Услуги</a>
          <a href="#gallery" className="hover:text-brand-gold transition-colors">Результаты</a>
          <a href="#about" className="hover:text-brand-gold transition-colors">О нас</a>
          <a href="#contacts" className="hover:text-brand-gold transition-colors">Контакты</a>
          <button 
            onClick={onOpenBonus}
            className="text-brand-gold hover:text-brand-gold-light transition-colors flex items-center gap-2"
          >
            Бонусы
          </button>
        </div>

        <a 
          href="https://t.me/normatela_vlg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gold-gradient text-brand-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]"
        >
          Записаться
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const reviews = [
    {
      text: "Лучший массаж в моей жизни. Полное расслабление и перезагрузка. Обязательно вернусь снова!",
      author: "Анна С."
    },
    {
      text: "Профессиональный подход и невероятная атмосфера. После курса процедур чувствую себя другим человеком.",
      author: "Елена М."
    },
    {
      text: "Студия, где действительно заботятся о результате. Вежливый персонал и уютный интерьер.",
      author: "Ксения Р."
    },
    {
      text: "Лазерная эпиляция здесь — это совсем не больно. Результат превзошел все ожидания!",
      author: "Ольга К."
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=2070" 
          alt="Spa background" 
          className="w-full h-full object-cover opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10 grid lg:grid-cols-2 gap-12 items-start pt-20 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start lg:pt-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 border border-brand-gold/30">
            <Leaf className="w-3 h-3" />
            Студия эстетики тела
          </div>
          <h1 className="font-serif text-6xl md:text-7xl leading-[0.9] bg-gold-gradient bg-clip-text text-transparent mb-8">
            Ваше тело <br />
            <span className="italic text-brand-gold-light">достойно</span> <br />
            идеала
          </h1>
          <p className="text-lg text-white/60 max-w-md mb-10 leading-relaxed">
            Теплая атмосфера, современные методики и команда профессионалов. Мы соединяем клиническую точность и чувственный комфорт.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a 
              href="https://t.me/normatela_vlg" 
              className="bg-gold-gradient text-brand-black px-8 py-4 rounded-full text-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(197,160,89,0.4)] hover:shadow-[0_0_45px_rgba(197,160,89,0.6)]"
            >
              Записаться <Send className="w-5 h-5" />
            </a>
            <a 
              href="#services" 
              className="border border-brand-gold/30 text-brand-gold px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-gold/10 transition-all"
            >
              Наши услуги
            </a>
          </div>

          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/norma_tela?igsh=MXUzYzBjd24xcXFlNg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
              title="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://t.me/normatela_vlg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
              title="Telegram"
            >
              <Send className="w-6 h-6" />
            </a>
            <a 
              href="https://vk.ru/normatela_vlg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all"
              title="VK"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Main Hero Image */}
            <div className="w-full max-w-[420px] aspect-[4/5] rounded-[80px] overflow-hidden border-2 border-brand-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.1)]">
              <img 
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=2070" 
                alt="Massage therapy" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Review Card - Now Auto-sliding and Smaller */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 z-20">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentReview}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-brand-charcoal/95 backdrop-blur-xl border border-brand-gold/30 p-5 rounded-[30px] shadow-2xl max-w-[240px]"
                >
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-3 h-3 text-brand-gold fill-brand-gold" />)}
                  </div>
                  <p className="text-xs font-medium text-brand-gold-light leading-relaxed italic mb-3">
                    "{reviews[currentReview].text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 bg-brand-gold rounded-full"></div>
                    <p className="text-[10px] text-brand-gold/50 uppercase tracking-widest font-bold">
                      {reviews[currentReview].author}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Удаление волос для женщин",
      price: "от 550 р",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Удаление мужских волос",
      price: "от 750 р",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Аппаратная косметология",
      price: "от 2000 р",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Массаж ручной",
      price: "от 2500 р",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Аппаратный массаж",
      price: "от 2500 р",
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl bg-gold-gradient bg-clip-text text-transparent mb-4">Наши услуги</h2>
          <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full shadow-[0_0_15px_rgba(197,160,89,0.6)]"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/20 cursor-pointer"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="font-serif text-lg text-brand-gold leading-tight mb-1">{service.title}</h3>
                <p className="text-brand-gold-light font-bold text-sm">{service.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-5xl bg-gold-gradient bg-clip-text text-transparent mb-8">О нашем салоне</h2>
          <p className="text-lg text-white/70 mb-12 leading-relaxed">
            Мы верим, что истинная красота начинается с внутреннего спокойствия. В «Норма Тела» мы создали пространство, где время замедляется, а каждый визит становится ритуалом заботы о себе.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: <CheckCircle2 className="w-6 h-6 text-brand-gold" />, title: "Профессионализм", text: "Все наши мастера имеют медицинское образование." },
              { icon: <Heart className="w-6 h-6 text-brand-gold" />, title: "Подход", text: "Индивидуальные программы ухода для каждого гостя." },
              { icon: <Sparkles className="w-6 h-6 text-brand-gold" />, title: "Атмосфера", text: "Мягкий свет и ароматерапия для вашего комфорта." }
            ].map((item, i) => (
              <div key={i} className="bg-brand-black/20 p-6 rounded-3xl border border-brand-gold/10">
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-bold text-brand-gold-light mb-2 uppercase tracking-wider text-xs">{item.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const items = [
    {
      title: "Лазерная эпиляция",
      description: "Результат после 3-х процедур. Заметное уменьшение роста волос.",
      before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Коррекция фигуры",
      description: "Уменьшение объемов и улучшение тонуса кожи.",
      before: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Эстетика лица",
      description: "Сияющая кожа и четкий овал лица после ухода.",
      before: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Массаж спины",
      description: "Снятие зажимов и улучшение осанки за 5 сеансов.",
      before: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800",
      after: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800"
    }
  ];

  // Duplicate items for seamless loop
  const marqueeItems = [...items, ...items];

  return (
    <section id="gallery" className="py-24 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <h2 className="font-serif text-5xl bg-gold-gradient bg-clip-text text-transparent mb-4">Галерея наших услуг</h2>
          <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full shadow-[0_0_15px_rgba(197,160,89,0.6)]"></div>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
          className="flex gap-8 whitespace-nowrap px-4"
        >
          {marqueeItems.map((item, i) => (
            <div 
              key={i}
              className="flex-shrink-0 w-[350px] bg-brand-charcoal rounded-[40px] overflow-hidden border border-brand-gold/10 group hover:border-brand-gold/30 transition-all"
            >
              <div className="relative aspect-[4/3] flex overflow-hidden">
                <div className="relative w-1/2 h-full border-r border-brand-black">
                  <img src={item.before} alt="Before" className="w-full h-full object-cover grayscale group-hover:opacity-40 transition-all duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-brand-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/70">До</div>
                </div>
                <div className="relative w-1/2 h-full overflow-hidden">
                  <img src={item.after} alt="After" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-brand-gold/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-black">После</div>
                </div>
              </div>
              <div className="p-6 whitespace-normal">
                <h3 className="font-serif text-xl text-brand-gold-light mb-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Массаж'
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    if (name === 'name') {
      if (value.length < 2) return 'Имя слишком короткое';
      if (value.length > 50) return 'Имя слишком длинное';
      return '';
    }
    if (name === 'phone') {
      const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
      if (!value) return 'Введите номер телефона';
      if (!phoneRegex.test(value)) return 'Формат: +7 (999) 999-99-99';
      return '';
    }
    return '';
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    
    let formatted = '+7';
    if (numbers.length > 1) {
      formatted += ' (' + numbers.substring(1, 4);
    }
    if (numbers.length >= 5) {
      formatted += ') ' + numbers.substring(4, 7);
    }
    if (numbers.length >= 8) {
      formatted += '-' + numbers.substring(7, 9);
    }
    if (numbers.length >= 10) {
      formatted += '-' + numbers.substring(9, 11);
    }
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'phone') {
      finalValue = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, finalValue) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateField('name', formData.name);
    const phoneError = validateField('phone', formData.phone);

    if (!nameError && !phoneError) {
      try {
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 5000);
          setFormData({ name: '', phone: '', service: 'Массаж' });
        } else {
          const data = await response.json();
          alert(data.error || 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        }
      } catch (error) {
        console.error('Submit error:', error);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, проверьте подключение к интернету.');
      }
    } else {
      setErrors({ name: nameError, phone: phoneError });
    }
  };

  const isFormValid = !errors.name && !errors.phone && formData.name && formData.phone;

  return (
    <section id="contacts" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-charcoal rounded-[60px] p-12 lg:p-20 text-white overflow-hidden relative border border-brand-gold/20">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
             <Sparkles className="w-full h-full text-brand-gold" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="font-serif text-5xl bg-gold-gradient bg-clip-text text-transparent mb-8">Ждем вас в гости</h2>
              <p className="text-white/60 mb-12 text-lg">
                Запишитесь на консультацию или процедуру прямо сейчас через Telegram или по телефону.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                    <MapPin className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-gold/50 mb-1">Адрес</p>
                    <p className="font-medium">г. Волгоград, Бульвар 30-летия победы , 19В. ЖК «Онегин»</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                    <Clock className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-gold/50 mb-1">Режим работы</p>
                    <p className="font-medium">Ежедневно: 10:00 — 21:00</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                    <Phone className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-gold/50 mb-1">Телефон</p>
                    <p className="font-medium">+7 (917) 840 -90-90</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-black/40 backdrop-blur-md rounded-3xl p-8 border border-brand-gold/20">
              <h3 className="font-serif text-3xl text-brand-gold mb-6">Быстрая запись</h3>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h4 className="text-2xl font-serif text-white mb-2">Заявка отправлена!</h4>
                  <p className="text-white/60">Мы свяжемся с вами в ближайшее время.</p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-gold/50 mb-2">Ваше имя</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-brand-gold/20'} rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold/50 transition-colors text-white`} 
                      placeholder="Иван Иванов" 
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-gold/50 mb-2">Телефон</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-brand-gold/20'} rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold/50 transition-colors text-white`} 
                      placeholder="+7 (___) ___-__-__" 
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-gold/50 mb-2">Услуга</label>
                    <div className="relative">
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-brand-gold/20 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none text-white cursor-pointer"
                      >
                        <option className="bg-brand-charcoal" value="Массаж">Массаж</option>
                        <option className="bg-brand-charcoal" value="Уход за лицом">Уход за лицом</option>
                        <option className="bg-brand-charcoal" value="Уход за телом">Уход за телом</option>
                        <option className="bg-brand-charcoal" value="Лазерная эпиляция">Лазерная эпиляция</option>
                        <option className="bg-brand-charcoal" value="Консультация">Консультация</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold/50">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full ${isFormValid ? 'bg-gold-gradient text-brand-black shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] hover:scale-[1.02]' : 'bg-white/5 text-white/20 cursor-not-allowed'} py-4 rounded-xl font-bold uppercase tracking-widest transition-all mt-4`}
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-black py-12 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
            <Sparkles className="text-brand-black w-4 h-4" />
          </div>
          <span className="font-serif text-xl font-semibold text-brand-gold">Норма Тела</span>
        </div>
        
        <div className="flex gap-6">
          <a href="https://www.instagram.com/norma_tela?igsh=MXUzYzBjd24xcXFlNg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://t.me/normatela_vlg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all">
            <Send className="w-5 h-5" />
          </a>
          <a href="https://vk.ru/normatela_vlg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        <p className="text-brand-gold/30 text-xs uppercase tracking-widest">
          © 2026 Норма Тела. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  const [isBonusOpen, setIsBonusOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar onOpenBonus={() => setIsBonusOpen(true)} />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Contacts />
      </main>
      <Footer />
      <BonusRegistration isOpen={isBonusOpen} onClose={() => setIsBonusOpen(false)} />
    </div>
  );
}
