import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beer, 
  Wine, 
  GlassWater, 
  Zap, 
  Utensils,
  Search,
  ChevronRight,
  Flame,
  Clock,
  Instagram,
  Phone,
  MapPin,
  Trophy,
  Dribbble,
  LayoutGrid,
  Languages,
  Star
} from 'lucide-react';
import { Category, menuItems } from './data';

type Language = 'en' | 'pt';

const uiTranslations = {
  pt: {
    since: "SINCE 2014",
    subtext: "Cocktails & Beer",
    live: "Ambiente de Estádio",
    playbook: "A Seleção",
    topHits: "Os Melhores",
    padelTitle: "Pausa do Padel",
    padelText: "Mostra a tua reserva de campo e ganha 10% de desconto em bebidas de recuperação!",
    squad: "O Plantel",
    available: "Disponíveis",
    search: "Procurar...",
    hot: "EM ALTA",
    topPick: "Favorito",
    units: "Unidades",
    connect: "Contactos",
    reservations: "Reservas",
    location: "Localização",
    about: "O coração do desporto e da vida social em Viseu. Seja para celebrar o padel ou para o grande jogo de futebol, há sempre uma Heineken gelada à tua espera.",
    premiumExp: "Cheers O Bar • Experiência Premium",
  },
  en: {
    since: "SINCE 2014",
    subtext: "Cocktails & Beer",
    live: "Stadium Vibe",
    playbook: "The Playbook",
    topHits: "Top Hits",
    padelTitle: "Padel Break",
    padelText: "Show your Padel court booking and get a 10% discount on recovery drinks!",
    squad: "The Squad",
    available: "Available",
    search: "Search item...",
    hot: "HOT",
    topPick: "Top Pick",
    units: "Units",
    connect: "Connect",
    reservations: "Reservas",
    location: "Location",
    about: "The heart of sports and social life in Viseu. Whether it's post-padel celebrations or the big soccer match, there's a cold Heineken waiting for you.",
    premiumExp: "Cheers O Bar • Premium Experience",
  }
};

const categoryTranslations = {
  pt: {
    [Category.Packs]: "Packs Partilhar",
    [Category.Cocktails]: "Cocktails",
    [Category.Mocktails]: "Cocktails S/ Álcool",
    [Category.Gins]: "Gins",
    [Category.Whiskeys]: "Whiskeys",
    [Category.Vodkas]: "Vodkas",
    [Category.Beers]: "Cervejas",
    [Category.Sangrias]: "Sangrias",
    [Category.Wine]: "Vinho",
    [Category.Shots]: "Shots",
    [Category.Food]: "Comidas",
  },
  en: {
    [Category.Packs]: "Sharing Packs",
    [Category.Cocktails]: "Cocktails",
    [Category.Mocktails]: "Mocktails",
    [Category.Gins]: "Gins",
    [Category.Whiskeys]: "Whiskeys",
    [Category.Vodkas]: "Vodkas",
    [Category.Beers]: "Beers",
    [Category.Sangrias]: "Sangrias",
    [Category.Wine]: "Wine",
    [Category.Shots]: "Shots",
    [Category.Food]: "Food",
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const t = uiTranslations[lang];

  const filteredItems = useMemo(() => {
    const items = menuItems
      .filter(item => item.sales >= 5)
      .filter(item => {
        const nameMatch = item.name[lang].toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = item.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesCategory && (nameMatch || descMatch);
      });
    
    // Sort by category order then by sales
    const categoryOrder: Record<Category, number> = {
      [Category.Packs]: 1,
      [Category.Cocktails]: 2,
      [Category.Gins]: 3,
      [Category.Whiskeys]: 4,
      [Category.Vodkas]: 5,
      [Category.Beers]: 6,
      [Category.Sangrias]: 7,
      [Category.Mocktails]: 8,
      [Category.Wine]: 9,
      [Category.Shots]: 10,
      [Category.Food]: 11,
    };

    return items.sort((a, b) => {
      const orderA = categoryOrder[a.category];
      const orderB = categoryOrder[b.category];
      if (orderA !== orderB) return orderA - orderB;
      return b.sales - a.sales;
    });
  }, [selectedCategory, searchQuery, lang]);

  const categories = [
    { name: Category.Packs, icon: Zap },
    { name: Category.Cocktails, icon: Wine },
    { name: Category.Mocktails, icon: GlassWater },
    { name: Category.Gins, icon: Wine },
    { name: Category.Whiskeys, icon: Zap },
    { name: Category.Vodkas, icon: Zap },
    { name: Category.Beers, icon: Beer },
    { name: Category.Sangrias, icon: GlassWater },
    { name: Category.Wine, icon: Wine },
    { name: Category.Shots, icon: Zap },
    { name: Category.Food, icon: Utensils },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-jd-black text-white font-sans overflow-x-hidden">
      {/* Premium Sports Header */}
      <header className="relative flex flex-col items-center justify-center pt-12 pb-16 px-4 md:pt-16 md:pb-20 md:px-6 border-b border-white/5 bg-gradient-to-b from-heineken/15 to-transparent flex-shrink-0 overflow-hidden">
        {/* Background Subtle Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
           <Star className="w-96 h-96 text-white" />
        </div>

        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <button 
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 md:py-2 rounded-full transition-all active:scale-95 shadow-lg backdrop-blur-md"
          >
            <span className="text-lg md:text-xl leading-none">{lang === 'pt' ? '🇵🇹' : '🇺🇸'}</span>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{lang === 'pt' ? 'PT' : 'EN'}</span>
          </button>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center mt-12 md:mt-0 relative z-10"
        >
          {/* Logo Section */}
          <div className="mb-6 md:mb-8 relative">
            <div className="w-24 h-24 md:w-36 md:h-36 bg-white/[0.03] rounded-3xl md:rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group backdrop-blur-xl">
               <div className="absolute inset-0 bg-gradient-to-br from-heineken/20 to-transparent opacity-50" />
               <Star className="w-12 h-12 md:w-20 md:h-20 text-white fill-white animate-pulse relative z-10" />
               {/* Note: User logo used here if uploaded. Placeholder for now. */}
            </div>
          </div>

          <h1 className="font-sport text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-1 text-white">
            <span className="block italic">CHEERS</span>
            <span className="text-heineken -mt-1 md:-mt-4 block">O BAR</span>
          </h1>
          
          <div className="flex items-center gap-3 mt-4 md:mt-6">
            <span className="h-[1px] w-6 md:w-8 bg-jd-gold/30" />
            <span className="text-jd-gold font-bold tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] uppercase">{t.since}</span>
            <span className="h-[1px] w-6 md:w-8 bg-jd-gold/30" />
          </div>

          <p className="text-white/40 text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mt-4 px-5 py-2 border border-white/5 rounded-full inline-block bg-white/[0.02] backdrop-blur-md">
            {t.subtext}
          </p>
        </motion.div>

        {/* Live Sport Indicator */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-3 py-1.5 bg-heineken rounded-full animate-pulse shadow-[0_0_20px_rgba(0,130,0,0.6)] z-20">
           <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight">{t.live}</span>
        </div>
      </header>


      <div className="flex flex-col md:flex-row flex-1 relative min-h-0 overflow-visible md:overflow-hidden">
        {/* Sidebar Navigation - Fixed top on mobile, sidebar on desktop */}
        <nav className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 bg-black/80 md:bg-black/50 p-4 md:p-8 flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto no-scrollbar flex-shrink-0 z-30 sticky top-0 md:static backdrop-blur-xl">
          <div className="hidden md:flex items-center gap-3 mb-8 text-white/40 px-2">
             <Trophy className="w-5 h-5 text-heineken-light" />
             <span className="text-[11px] uppercase font-black tracking-[0.4em] whitespace-nowrap">{t.playbook}</span>
          </div>
          
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all flex-shrink-0 md:min-w-0 ${
              selectedCategory === 'All' ? 'bg-heineken text-white shadow-xl shadow-heineken/20' : 'hover:bg-white/5 text-white/50 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-3"><LayoutGrid className="w-5 h-5" /> {t.topHits}</span>
            <span className="hidden md:block text-[10px] bg-black/20 px-2.5 py-1 rounded-full font-black">{menuItems.filter(i => i.sales >= 5).length}</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name as Category)}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all flex-shrink-0 md:min-w-0 ${
                selectedCategory === cat.name ? 'bg-heineken text-white shadow-xl shadow-heineken/20' : 'hover:bg-white/5 text-white/50 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-3"><cat.icon className="w-5 h-5" /> {categoryTranslations[lang][cat.name as Category]}</span>
            </button>
          ))}
          
          {/* Padel Promo - Sidebar version */}
          <div className="hidden md:block mt-auto p-6 bg-gradient-to-br from-jd-gold/10 to-jd-gold/5 border border-jd-gold/20 rounded-[2rem] flex-shrink-0">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-2xl bg-jd-gold flex items-center justify-center shadow-lg">
                 <Dribbble className="w-5 h-5 text-jd-black" />
               </div>
               <span className="text-xs text-jd-gold font-black uppercase italic tracking-widest">{t.padelTitle}</span>
            </div>
            <p className="text-[12px] text-white/70 leading-relaxed font-medium italic">
              "{t.padelText}"
            </p>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-12 bg-gradient-to-br from-jd-black to-black min-h-0 overflow-visible md:overflow-y-auto no-scrollbar scroll-smooth">
          <div className="max-w-5xl mx-auto">
            {/* Mobile Padel Promo */}
            <div className="md:hidden mb-8 p-6 bg-gradient-to-br from-jd-gold/15 to-jd-gold/5 border border-jd-gold/30 rounded-3xl flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-jd-gold flex items-center justify-center shadow-xl flex-shrink-0">
                 <Dribbble className="w-8 h-8 text-jd-black" />
               </div>
               <div>
                 <span className="text-xs text-jd-gold font-black uppercase italic tracking-widest block mb-1">{t.padelTitle}</span>
                 <p className="text-[11px] text-white leading-tight font-bold italic">
                   {t.padelText}
                 </p>
               </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
              <motion.div
                key={selectedCategory + lang}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-2">
                   <div className="h-[2px] w-8 bg-heineken" />
                   <span className="text-heineken-light text-[10px] font-black uppercase tracking-[0.3em]">Cheers Selection</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-4 font-sport text-white">
                  {selectedCategory === 'All' ? t.squad : categoryTranslations[lang][selectedCategory as Category]}
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 bg-white/[0.03] px-3 py-1.5 rounded-full w-fit">
                  <span>{filteredItems.length} {t.available}</span>
                </div>
              </motion.div>
              
              <div className="relative w-full md:w-96">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  placeholder={t.search} 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 md:py-5 pl-14 pr-6 text-sm outline-none focus:border-heineken/40 focus:bg-white/[0.06] transition-all font-semibold backdrop-blur-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 pb-32">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.03, ease: "easeOut" }}
                    className="glass-card rounded-[2rem] md:rounded-[2.5rem] group flex flex-col overflow-hidden active:scale-[0.98] md:active:scale-[0.97] touch-none"
                  >
                    <div className="flex p-4 md:p-6 gap-4 md:gap-6">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl md:rounded-[2rem] overflow-hidden flex-shrink-0 bg-black/40 border border-white/5 shadow-2xl">
                        <img 
                          src={item.image || `https://picsum.photos/seed/${item.id}/500/500`} 
                          alt={item.name[lang]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center p-3">
                            <span className="text-3xl md:text-5xl filter drop-shadow-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 transform-gpu rotate-[-5deg] group-hover:rotate-[0deg]">
                                {item.category === Category.Beers ? '🍺' : item.category === Category.Cocktails ? '🍸' : item.category === Category.Food ? '🍔' : '🥃'}
                            </span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="min-w-0">
                          <div className="flex justify-between items-start mb-1 md:mb-2 gap-2">
                             <h3 className="font-black text-lg md:text-xl xl:text-2xl tracking-tighter leading-tight group-hover:text-heineken-light transition-colors uppercase italic font-sport truncate md:whitespace-normal">{item.name[lang]}</h3>
                             <span className="text-jd-gold font-black text-xl md:text-2xl font-sport tracking-tighter italic shrink-0 relative mt-[18px] md:mt-5 -ml-[12px] md:-ml-6">€{item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-[11px] md:text-[13px] text-white/50 leading-tight font-medium line-clamp-2 md:line-clamp-3">
                             {item.description[lang]}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                           <div className="flex items-center gap-2 md:gap-3">
                             {item.sales > 1000 ? (
                               <div className="stats-badge flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 shadow-[0_0_15px_rgba(0,130,0,0.2)]">
                                 <Flame className="w-3 h-3" /> <span className="hidden xs:inline">{t.hot}</span>
                               </div>
                             ) : (
                               <div className="stats-badge flex items-center gap-1.5 md:gap-2 opacity-60 border-white/10 text-white/50 px-2 md:px-3 py-1 md:py-1.5">
                                 <Clock className="w-3 h-3" /> <span className="hidden xs:inline">{t.topPick}</span>
                               </div>
                             )}
                           </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>


      {/* Footer / Contact Details */}
      <footer className="mt-auto border-t border-white/5 bg-jd-black pt-16 pb-32 md:pb-16 px-6 relative overflow-hidden">
        {/* Background Decorative Star */}
        <Star className="absolute -bottom-10 -right-10 w-64 h-64 text-heineken/5 rotate-12 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 p-2 overflow-hidden shadow-2xl">
                 <Star className="w-10 h-10 text-white fill-white opacity-50" />
                 {/* <img src="/logo.png" alt="Cheers Logo" className="w-full h-full object-contain" /> */}
              </div>
              <div>
                <h4 className="text-heineken font-black italic uppercase text-3xl md:text-4xl font-sport tracking-tighter leading-none">CHEERS O BAR</h4>
                <p className="text-jd-gold font-bold text-[10px] uppercase tracking-[0.4em] mt-1">{t.since}</p>
              </div>
            </div>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md font-medium">
              {t.about}
            </p>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] md:text-xs font-black uppercase text-white/30 tracking-[0.3em] italic">{t.connect}</h5>
            <div className="space-y-4 md:space-y-6">
               <a href="tel:+351927653087" className="flex items-center gap-4 text-white/60 hover:text-heineken-light transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-heineken/20 transition-all shadow-xl">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-heineken-light" />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase font-black text-white/20 leading-none mb-1 tracking-widest">{t.reservations}</p>
                    <p className="text-base md:text-lg font-black italic tracking-tight">+351 927 653 087</p>
                  </div>
               </a>
               <a href="https://www.instagram.com/cheers_o_bar/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/60 hover:text-heineken-light transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-heineken/20 transition-all shadow-xl">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5 text-heineken-light" />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase font-black text-white/20 leading-none mb-1 tracking-widest">Instagram</p>
                    <p className="text-lg font-black italic tracking-tight">@cheers_o_bar</p>
                  </div>
               </a>
            </div>
          </div>

          <div className="space-y-6">
             <h5 className="text-[10px] md:text-xs font-black uppercase text-white/30 tracking-[0.3em] italic">{t.location}</h5>
             <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 shadow-xl">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-jd-gold" />
                </div>
                <p className="text-sm md:text-base text-white/60 font-black italic leading-tight group-hover:text-white transition-colors pt-1">
                  R. Eng. Beirão do Carmo 84,<br/>3500-029 Viseu
                </p>
             </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-20 md:mt-24 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-xs text-white/20 uppercase tracking-[0.5em] font-black italic font-sport">{t.premiumExp}</p>
           <div className="flex items-center gap-6">
              <span className="w-12 h-[1px] bg-white/10 hidden md:block" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Heineken_logo.svg" alt="Heineken" className="h-4 opacity-20 grayscale brightness-200" />
              <span className="w-12 h-[1px] bg-white/10 hidden md:block" />
           </div>
        </div>
      </footer>

    </div>
  );
}

