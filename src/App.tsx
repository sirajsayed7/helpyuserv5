import { useMemo, useState } from 'react'
import {
  ArrowLeft, Bell, CalendarDays, Car, Check, ChevronDown, ChevronRight, Clock, Crown,
  Eye, Filter, Heart, Home, Info, Lock, Mail, MapPin, MessageCircle, MoreHorizontal,
  PenLine, Search, Send, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles,
  Star, User, Users, Wallet, Languages, Bookmark, Headphones, FileText, LogOut,
  Wrench, Gift, GraduationCap, Laptop, HeartPulse, Clapperboard, Hammer, SprayCan,
  BriefcaseBusiness, ShoppingCart, Scissors, Truck, Palette, Building2, MonitorSmartphone,
  Sofa, WashingMachine, Refrigerator, CircleCheck, Calendar
} from 'lucide-react'
import './index.css'

type Screen = 'login' | 'verify' | 'home' | 'orders' | 'chat' | 'profile' | 'categories' | 'location' | 'service' | 'success' | 'thread'
type Tab = 'home' | 'orders' | 'chat' | 'profile'

type Service = {
  id: string
  provider: string
  title: string
  category: string
  price: number
  discount?: string
  rating: string
  distance: string
  kind: 'scrubs' | 'car' | 'salon' | 'cleaning' | 'heritage'
}

type Booking = {
  id: string
  provider: string
  title: string
  date: string
  time: string
  price: number
  kind: Service['kind']
}

const logo = '/assets/helpy-logo.jpeg'

const services: Service[] = [
  { id: 'scrubs', provider: 'Scrubs', title: 'Scrubs Cleaning', category: 'Home Services', price: 160, rating: '4.8 (230)', distance: '2.27 KM', kind: 'scrubs' },
  { id: 'carwash', provider: 'BlueWave', title: 'Premium Car Wash', category: 'Car Services', price: 75, discount: '10% OFF', rating: '4.7 (96)', distance: '3.4 KM', kind: 'car' },
  { id: 'salon', provider: 'Glow Studio', title: 'Salon & Spa Package', category: 'Salon & Spa', price: 120, discount: '15% OFF', rating: '4.9 (148)', distance: '5.1 KM', kind: 'salon' },
  { id: 'homeclean', provider: 'Happy Home', title: 'Home Cleaning Service', category: 'Home Services', price: 135, discount: '20% OFF', rating: '4.8 (210)', distance: '4.2 KM', kind: 'cleaning' },
  { id: 'heritage', provider: 'The Heritage', title: 'Flights & Hotels Deal', category: 'Travel', price: 220, discount: '30% OFF', rating: '4.6 (82)', distance: 'Online', kind: 'heritage' }
]

const categoryHome = [
  ['Digital', Laptop], ['Education', GraduationCap], ['Car Services', Car], ['Home Services', ShoppingBag],
  ['Deliveries', Truck], ['Salon & Spa', Scissors], ['Marketplace', ShoppingCart], ['More', MoreHorizontal]
] as const

const allCategories = [
  ['Cleaning Services', SprayCan, 'from-blue-50 to-white'], ['Craftsmanship', Hammer, 'from-orange-50 to-white'], ['Design and Branding', Palette, 'from-purple-50 to-white'],
  ['Gift', Gift, 'from-pink-50 to-white'], ['Governmental Paper Handler', Building2, 'from-violet-50 to-white'], ['Hardware', Laptop, 'from-sky-50 to-white'],
  ['Language', Languages, 'from-blue-50 to-white'], ['Maintenance', Wrench, 'from-slate-50 to-white'], ['Personal Health Services', HeartPulse, 'from-rose-50 to-white'],
  ['Treatment', BriefcaseBusiness, 'from-red-50 to-white'], ['Tutoring', GraduationCap, 'from-indigo-50 to-white'], ['Visuals', Clapperboard, 'from-cyan-50 to-white'],
  ['Digital', MonitorSmartphone, 'from-blue-50 to-white'], ['Education', GraduationCap, 'from-purple-50 to-white'], ['Car Services', Car, 'from-cyan-50 to-white'],
  ['Home Services', Home, 'from-blue-50 to-white'], ['Deliveries', Truck, 'from-slate-50 to-white'], ['Marketplace', ShoppingCart, 'from-orange-50 to-white']
] as const

function StatusBar({ dark = true }: { dark?: boolean }) {
  return <div className={`flex justify-between items-center px-7 pt-5 text-[16px] font-extrabold ${dark ? 'text-black' : 'text-white'}`}>
    <span>9:41</span><span className="tracking-widest">▮▮▮  wifi  ▰</span>
  </div>
}

function LogoMark({ size = 118 }: { size?: number }) {
  return <div className="flex flex-col items-center justify-center">
    <img src={logo} className="object-contain" style={{ width: size, height: size * 0.74 }} />
    <div className="-mt-1 text-[40px] font-black tracking-tight text-[#121033]">HELPY</div>
  </div>
}

function Button({ children, onClick, className = '' }: any) {
  return <button onClick={onClick} className={`active:scale-[.98] transition rounded-[22px] bg-gradient-to-r from-[#0b7dff] to-[#0056d9] text-white font-bold shadow-blue ${className}`}>{children}</button>
}

function FloatingNav({ tab, setTab }: { tab: Tab, setTab: (t: Tab) => void }) {
  const items: [Tab, any, string, number?][] = [['home', Home, 'Home'], ['orders', CalendarDays, 'Order'], ['chat', MessageCircle, 'Chat', 3], ['profile', User, 'Profile']]
  return <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-28px)] max-w-[402px] -translate-x-1/2 rounded-[26px] border border-white/90 bg-white/95 px-5 py-3 shadow-2xl backdrop-blur-xl">
    <div className="flex items-center justify-between">
      {items.map(([key, Icon, label, badge]) => <button key={key} onClick={() => setTab(key)} className={`relative flex min-w-[64px] flex-col items-center gap-1 rounded-[18px] py-1.5 transition ${tab === key ? 'bg-[#f1f7ff] text-[#0a73f6]' : 'text-[#596070]'}`}>
        {badge && key === 'chat' && <span className="absolute left-[39px] top-0 grid h-5 w-5 place-items-center rounded-full bg-[#0b63d9] text-[11px] font-bold text-white">{badge}</span>}
        <Icon size={27} strokeWidth={tab === key ? 2.9 : 2.2} fill={tab === key && key === 'home' ? 'currentColor' : 'none'} />
        <span className="text-[12px] font-semibold">{label}</span>
      </button>)}
    </div>
  </div>
}

function AppShell() {
  const [screen, setScreen] = useState<Screen>('login')
  const [tab, setTabState] = useState<Tab>('home')
  const [selectedService, setSelectedService] = useState<Service>(services[0])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [chatProvider, setChatProvider] = useState('Scrubs Cleaning')
  const [location, setLocation] = useState('Viva Bahriya 10, The Pearl-Qatar')
  const [history, setHistory] = useState<Screen[]>([])

  const navigate = (s: Screen) => { setHistory(h => [...h, screen]); setScreen(s) }
  const goBack = () => setScreen(history.length ? history[history.length - 1] : 'home') || setHistory(h => h.slice(0, -1))
  const setTab = (t: Tab) => { setTabState(t); setScreen(t); setHistory([]) }
  const openService = (svc: Service) => { setSelectedService(svc); navigate('service') }
  const book = (date: string, time: string, price: number) => {
    const b = { id: `${Date.now()}`, provider: selectedService.provider, title: selectedService.title, date, time, price, kind: selectedService.kind }
    setBookings(prev => [b, ...prev]); setChatProvider(selectedService.title); navigate('success')
  }
  const showNav = !['login', 'verify'].includes(screen)
  const content = (() => {
    switch (screen) {
      case 'login': return <LoginPage onLogin={() => navigate('verify')} />
      case 'verify': return <VerifyPage onVerify={() => { setTabState('home'); setScreen('home'); setHistory([]) }} goBack={goBack} />
      case 'home': return <HomePage location={location} openService={openService} openCategories={() => navigate('categories')} openLocation={() => navigate('location')} />
      case 'categories': return <CategoriesPage goBack={goBack} openService={openService} />
      case 'location': return <LocationPage goBack={goBack} location={location} setLocation={(l) => { setLocation(l); setScreen('home') }} />
      case 'service': return <ServicePage service={selectedService} goBack={goBack} book={book} />
      case 'success': return <SuccessPage service={selectedService} goHome={() => setTab('home')} goChat={() => { setTabState('chat'); setScreen('thread') }} />
      case 'orders': return <OrdersPage bookings={bookings} openService={openService} />
      case 'chat': return <ChatPage bookings={bookings} openThread={(p) => { setChatProvider(p); navigate('thread') }} />
      case 'thread': return <ThreadPage provider={chatProvider} goBack={goBack} />
      case 'profile': return <ProfilePage />
      default: return <HomePage location={location} openService={openService} openCategories={() => navigate('categories')} openLocation={() => navigate('location')} />
    }
  })()
  return <div className="min-h-screen bg-[#cfe2ff] flex justify-center">
    <div className="relative min-h-screen w-full max-w-[430px] overflow-hidden bg-[#f8fbff] shadow-2xl">
      {content}
      {showNav && <FloatingNav tab={tab} setTab={setTab} />}
    </div>
  </div>
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  return <main className="auth-bg min-h-screen overflow-y-auto pb-8">
    <StatusBar />
    <div className="px-11 pt-20 text-center">
      <LogoMark size={142} />
      <h1 className="mt-8 text-[27px] font-black text-[#171732]">Welcome back 👋</h1>
      <p className="mx-auto mt-3 max-w-[270px] text-[16px] leading-7 text-[#7a8293]">Sign in to continue and explore amazing services near you</p>
      <div className="mt-10 space-y-3.5 text-left">
        <div className="input-shell"><Mail size={22} /><span>Email or phone number</span></div>
        <div className="input-shell"><Lock size={22} /><span>Password</span><Eye className="ml-auto" size={23} /></div>
      </div>
      <button className="mt-3 block w-full text-right text-sm font-bold text-[#005ddc]">Forgot password?</button>
      <Button onClick={onLogin} className="mt-7 h-[58px] w-full text-[18px]">Sign In</Button>
      <div className="my-8 flex items-center gap-5 text-[#798293]"><span className="h-px flex-1 bg-[#e3e7ef]" />or<span className="h-px flex-1 bg-[#e3e7ef]" /></div>
      <div className="space-y-3.5">
        <Social icon="G" text="Continue with Google" />
        <Social icon="" text="Continue with Apple" />
        <Social icon="f" text="Continue with Facebook" />
      </div>
      <div className="mt-9 rounded-[24px] bg-white/70 px-4 py-5 text-[16px] font-semibold text-[#161632] shadow-soft">Don’t have an account? <span className="text-[#0065e8]">Sign Up</span></div>
    </div>
  </main>
}
function Social({ icon, text }: { icon: string, text: string }) { return <button className="flex h-[52px] w-full items-center justify-center gap-4 rounded-[18px] border border-[#e6ebf3] bg-white/80 text-[15px] font-semibold text-[#17172d] shadow-sm"><span className={`text-2xl font-black ${icon === 'G' ? 'text-[#1683ff]' : icon === 'f' ? 'text-[#1877f2]' : 'text-black'}`}>{icon}</span>{text}</button> }

function VerifyPage({ onVerify, goBack }: { onVerify: () => void, goBack: () => void }) {
  return <main className="verify-bg min-h-screen overflow-hidden">
    <StatusBar />
    <div className="relative z-10 px-10 pt-10">
      <button onClick={goBack}><ArrowLeft size={26} /></button>
      <div className="absolute right-9 top-8"><LogoMark size={86} /></div>
      <h1 className="mt-12 text-[36px] font-black text-[#0d1737]">Verify Code</h1>
      <p className="mt-4 max-w-[310px] text-[18px] leading-8 text-[#0d1737]">We’ve sent a verification code to <b className="text-[#005ba7]">abdullahisa@chappie.app</b> please enter the code to proceed.</p>
      <div className="mt-10 flex justify-between gap-3">{'123456'.split('').map((n) => <div key={n} className="grid h-[62px] w-[50px] place-items-center rounded-xl bg-white text-[32px] font-black text-[#005ba7] shadow-soft">{n}</div>)}</div>
      <Button onClick={onVerify} className="mt-8 h-[58px] w-full text-[20px]">Continue</Button>
      <div className="mt-8 text-center text-[18px] text-[#151a31]">Didn’t get a code?<br/><b className="text-[#005ba7]">Resend OTP</b> 00:20</div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[42vh] bg-gradient-to-t from-[#dff0ff] via-white/40 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 h-[85%] city-skyline opacity-95" />
      <div className="absolute left-8 bottom-8 rounded-lg bg-[#025494] p-4 text-white shadow-2xl"><LogoMark size={58}/><p className="mt-2 text-sm font-bold">Doha</p><p className="mt-3 text-xs leading-4">Services<br/>made simple.<br/><br/>People<br/>made stronger.</p></div>
    </div>
  </main>
}

function HomePage({ location, openService, openCategories, openLocation }: { location: string, openService: (s: Service) => void, openCategories: () => void, openLocation: () => void }) {
  return <main className="page-bg h-screen overflow-y-auto pb-32">
    <StatusBar />
    <div className="px-4 pt-5">
      <div className="flex items-start gap-4"><Avatar /><div className="flex-1"><p className="text-[16px] font-bold text-[#74759d]">Hi, la santi 👋</p><h1 className="text-[24px] font-black text-black">Welcome to Helpy</h1></div><button className="icon-btn relative"><Bell/><span className="absolute right-3 top-2 h-2.5 w-2.5 rounded-full bg-[#0b7dff]" /></button></div>
      <div className="mt-6 flex gap-3"><button onClick={openLocation} className="flex h-[54px] flex-1 items-center gap-3 rounded-[26px] bg-white px-5 text-left text-[15px] font-semibold shadow-soft"><MapPin className="text-[#0065ff]" fill="currentColor"/><span className="truncate">{location}</span><ChevronDown className="ml-auto"/></button><button className="flex h-[54px] min-w-[126px] items-center justify-center gap-2 rounded-[26px] border border-[#76a8ff] bg-white text-[15px] font-bold text-[#0065ea]"><Crown fill="currentColor"/>Join for Free</button></div>
      <div className="mt-5 flex gap-3"><div className="flex h-[58px] flex-1 items-center gap-4 rounded-[26px] bg-white px-5 shadow-soft"><Search size={28}/><span className="text-[15px] text-[#686a91]">Search for services, categories...</span></div><button className="icon-btn"><SlidersHorizontal className="text-[#0065ff]"/></button></div>
      <AdCarousel openService={openService}/>
      <SectionTitle title="Categories" onClick={openCategories}/>
      <div className="grid grid-cols-4 gap-3">{categoryHome.map(([name, Icon]) => <button key={name} onClick={name==='More'?openCategories:undefined} className="category-home-card"><Icon className="mx-auto mb-2 text-[#0065e8]" size={42} strokeWidth={1.9}/><span>{name}</span></button>)}</div>
      <SectionTitle title="Featured Services" onClick={openCategories}/>
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4"><Chip active icon={<MoreHorizontal size={15}/>} label="All"/><Chip icon={<Laptop size={15}/>} label="Digital"/><Chip icon={<GraduationCap size={15}/>} label="Education"/><Chip icon={<Car size={15}/>} label="Car Services"/><Chip icon={<Wrench size={15}/>} label="Home Services"/></div>
      <ServiceCard service={services[0]} onClick={() => openService(services[0])}/>
    </div>
  </main>
}
function Avatar(){return <div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-[#ffd94a] to-[#ffae20]"><User size={39} className="text-[#075ee8]" fill="currentColor"/></div>}
function IconBubble({children}:{children:any}){return <div className="grid h-14 w-14 place-items-center rounded-full bg-white/95 shadow-soft">{children}</div>}
function SectionTitle({title,onClick}:{title:string,onClick?:()=>void}){return <div className="mt-6 mb-3 flex items-center justify-between"><h2 className="text-[20px] font-black">{title}</h2>{onClick&&<button onClick={onClick} className="flex items-center gap-1 text-[16px] font-bold text-[#0065e8]">View all <ChevronRight size={20}/></button>}</div>}
function Chip({label,icon,active=false}:any){return <button className={`flex h-9 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold shadow-sm ${active?'bg-[#0068f5] text-white':'bg-white text-[#202337]'}`}>{icon}{label}</button>}

function AdCarousel({ openService }: { openService: (s: Service) => void }) {
  const ads = [services[4], services[1], services[2], services[3]]
  return <div className="no-scrollbar -mx-4 mt-5 flex snap-x gap-4 overflow-x-auto px-4">
    {ads.map((ad, i) => <button key={ad.id} onClick={() => openService(ad)} className={`ad-card snap-center ${ad.kind}`}>
      <div className="relative z-10 text-left"><div className="mb-5 inline-flex rounded-full bg-[#071333] px-4 py-1 text-xs font-black uppercase tracking-wide text-yellow-300">{ad.provider}</div><p className="text-[20px] font-bold text-[#081638]">Up to</p><h3 className="mt-1 text-[48px] leading-none font-black text-[#071333]">{ad.discount || '30% OFF'}</h3><p className="mt-3 text-[22px] font-black text-[#071333]">{ad.kind==='heritage'?'Flights & Hotels':ad.title}</p><span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#006df7] px-5 py-3 text-white font-bold">Book Now <ChevronRight/></span></div>
      <div className="ad-art">{ad.kind==='car'?<Car size={150}/>:ad.kind==='salon'?<Scissors size={145}/>:ad.kind==='cleaning'?<Home size={145}/>:<Sparkles size={145}/>}</div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">{[0,1,2,3].map(d=><span key={d} className={`h-2.5 w-2.5 rounded-full ${d===i?'bg-[#0a74ff]':'bg-white/90'}`}/>)}</div>
    </button>)}
  </div>
}

function ServiceCard({ service, onClick }: { service: Service, onClick: () => void }) {
  return <button onClick={onClick} className="flex w-full gap-4 rounded-[23px] bg-white p-3 text-left shadow-soft">
    <div className="grid h-[112px] w-[134px] shrink-0 place-items-center overflow-hidden rounded-[18px] bg-gradient-to-br from-red-500 to-red-100 text-white"><div className="text-center"><ScrubsLogo/><p className="mt-1 text-[12px] font-black">PROFESSIONAL<br/>SCRUBS-GRADE<br/>CLEANING</p></div></div>
    <div className="min-w-0 flex-1 py-2"><p className="text-sm font-bold text-[#006df7]">{service.provider}</p><h3 className="mt-1 text-[20px] font-black">{service.title}</h3><span className="mt-2 inline-flex rounded-lg bg-[#e8f2ff] px-3 py-1 text-xs font-bold text-[#006df7]">{service.category}</span><div className="mt-3 flex items-end justify-between"><div><p className="text-xs text-[#747a90]">from</p><p className="text-[19px] font-black text-[#006bdc]">{service.price.toFixed(2)} QR</p></div><div className="text-right text-sm text-[#596070]"><p><Star className="inline text-yellow-400" fill="currentColor" size={17}/> 4.8 (120)</p><p><MapPin className="inline" size={15}/> 11.84 KM away</p></div></div></div><Bookmark size={28}/>
  </button>
}
function ScrubsLogo(){return <div className="mx-auto text-center"><div className="text-4xl leading-none text-red-600">✦</div><div className="text-[14px] font-black text-black">Scrubs</div></div>}

function CategoriesPage({ goBack, openService }: { goBack: () => void, openService: (s: Service) => void }) {
  return <main className="h-screen overflow-y-auto bg-[#f9fbff] px-5 pb-10">
    <StatusBar />
    <button onClick={goBack} className="mt-8 grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft"><ArrowLeft className="text-[#0e4ccb]"/></button>
    <h1 className="mt-9 text-[38px] font-black tracking-tight">Categories <span className="text-xl">✨</span></h1>
    <div className="no-scrollbar -mx-1 mt-7 flex gap-3 overflow-x-auto px-1"><Chip active label="All"/><Chip label="Digital" icon={<MonitorSmartphone size={17}/>} /><Chip label="Education" icon={<GraduationCap size={17}/>} /><Chip label="Health Care" icon={<HeartPulse size={17}/>} /></div>
    <div className="mt-7 grid grid-cols-3 gap-4">{allCategories.map(([name, Icon, bg], i) => <button key={name+i} onClick={() => openService(name.includes('Cleaning') || name.includes('Home') ? services[0] : name.includes('Car') ? services[1] : name.includes('Salon') ? services[2] : services[3])} className="category-card"><div className={`mb-5 grid h-24 w-full place-items-center rounded-[22px] bg-gradient-to-br ${bg}`}><Icon size={58} strokeWidth={1.8} className="text-[#0c6ee8] icon-pop"/></div><div className="flex min-h-[44px] items-end justify-between gap-1"><span className="text-left text-[15px] font-bold leading-5">{name}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white shadow-sm"><ChevronRight size={18}/></span></div></button>)}</div>
  </main>
}

function LocationPage({ goBack, location, setLocation }: { goBack: () => void, location: string, setLocation: (l: string) => void }) {
  const locations = ['Viva Bahriya 10, The Pearl-Qatar', 'West Bay, Doha', 'Lusail Marina', 'Msheireb Downtown', 'Al Sadd, Doha']
  return <main className="page-bg h-screen overflow-y-auto px-5 pb-28"><StatusBar/><div className="mt-7 flex items-center gap-4"><button onClick={goBack} className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft"><ArrowLeft/></button><h1 className="text-3xl font-black">Set Location</h1></div><div className="mt-7 rounded-[28px] bg-white p-5 shadow-soft"><div className="flex h-14 items-center gap-3 rounded-2xl bg-[#f5f8ff] px-4"><Search/><span className="text-[#747a90]">Search building or area...</span></div>{locations.map(l=><button key={l} onClick={()=>setLocation(l)} className="mt-4 flex w-full items-center gap-4 rounded-2xl p-3 text-left hover:bg-[#f4f8ff]"><IconBubble><MapPin className="text-[#0065ff]"/></IconBubble><div className="flex-1"><b>{l}</b><p className="text-sm text-[#747a90]">Doha, Qatar</p></div>{l===location&&<CircleCheck className="text-[#0065ff]" fill="currentColor"/>}</button>)}</div></main>
}

function ServicePage({ service, goBack, book }: { service: Service, goBack: () => void, book: (d: string, t: string, p: number) => void }) {
  const [svc, setSvc] = useState(0), [date, setDate] = useState('Fri\nMay 30'), [time, setTime] = useState('12:00 PM')
  const serviceOptions = service.kind === 'scrubs' ? [['General Cleaning','Regular home cleaning and maintenance',160,Home],['Deep Cleaning','Intensive cleaning of your home',240,WashingMachine],['Move-in / Move-out','Complete cleaning for new spaces',280,Sofa]] : [[service.title,'Fast professional service',service.price, service.kind==='car'?Car:service.kind==='salon'?Scissors:Home],['Premium Package','Enhanced service with extras',service.price+60, Sparkles],['VIP Package','Priority booking and full care',service.price+110, Crown]] as any
  const price = serviceOptions[svc][2]
  return <main className="h-screen overflow-y-auto bg-[#f8fbff] pb-32">
    <div className={`service-hero ${service.kind}`}><StatusBar dark={service.kind !== 'scrubs'} /><button onClick={goBack} className="absolute left-5 top-16 z-10 grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft"><ArrowLeft/></button><button className="absolute right-6 bottom-7 z-10 grid h-14 w-14 place-items-center rounded-full bg-white shadow-soft"><Heart size={28}/></button><div className="absolute left-6 bottom-5 z-10 flex items-end gap-4"><div className="grid h-[98px] w-[98px] place-items-center rounded-full bg-white shadow-soft">{service.kind==='scrubs'?<ScrubsLogo/>:<ServiceIcon kind={service.kind}/>}</div><div className="pb-2"><h1 className="text-[24px] font-black text-white drop-shadow">{service.title} <CheckBadge/></h1><span className="rounded-lg bg-white/90 px-3 py-1 text-sm font-bold text-[#0073ff]">{service.category}</span><p className="mt-3 text-white"><Star className="inline text-[#2c8cff]" fill="currentColor"/> {service.rating} &nbsp; | &nbsp; {service.distance}</p></div></div></div>
    <div className="px-5">
      <div className="-mt-5 relative z-20 grid grid-cols-4 rounded-[20px] bg-white p-4 shadow-soft"><div><p className="text-sm text-[#596070]">Starting from</p><p className="text-[24px] font-black text-[#006bdc]">{service.price.toFixed(2)} QR</p></div><MiniStat icon={<ShieldCheck/>} title="Verified" sub="Provider"/><MiniStat icon={<Users/>} title="Trusted" sub="Professionals"/><MiniStat icon={<Clock/>} title="On-time" sub="Service"/></div>
      <h2 className="mt-7 text-xl font-black">1. Select Service</h2><div className="mt-4 grid grid-cols-3 gap-3">{serviceOptions.map(([name, desc, p, Icon]: any, i: number)=><button key={name} onClick={()=>setSvc(i)} className={`service-option ${svc===i?'active':''}`}><span className="absolute right-3 top-3">{svc===i?<Check className="rounded-full bg-[#1683ff] p-1 text-white"/>:<span className="block h-6 w-6 rounded-full border-2 border-[#bbc1cc]"/>}</span><Icon className="mx-auto mb-4 text-[#006bdc]" size={38}/><b>{name}</b><p>{desc}</p><strong>{p.toFixed(2)} QR</strong></button>)}</div>
      <h2 className="mt-6 text-xl font-black">2. Select Date & Time</h2><div className="mt-4 grid grid-cols-6 gap-3">{['Today\nMay 29','Fri\nMay 30','Sat\nMay 31','Sun\nJun 1','Mon\nJun 2'].map(d=><button onClick={()=>setDate(d)} className={`date-pill ${date===d?'active':''}`} key={d}>{d.split('\n').map(x=><span key={x}>{x}</span>)}</button>)}<button className="date-pill"><Calendar/></button></div><div className="mt-4 grid grid-cols-4 gap-3">{['08:00 AM','10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM','08:00 PM','10:00 PM'].map(t=><button onClick={()=>setTime(t)} disabled={t==='10:00 PM'} className={`time-pill ${time===t?'active':''}`} key={t}>{t}</button>)}</div>
      <div className="mt-5 flex items-center gap-4 rounded-[18px] bg-[#ecf6ff] p-4 text-sm"><Clock className="text-[#006bdc]"/><p><b className="text-[#006bdc]">Service duration: ~3 to 4 hours</b><br/>You can add special instructions in the next step.</p><Info className="ml-auto text-[#006bdc]"/></div>
      <h2 className="mt-6 text-xl font-black">3. Add Extras (Optional)</h2><div className="mt-4 grid grid-cols-3 gap-3">{[['Inside Fridge',30,Refrigerator],['Inside Oven',30,MonitorSmartphone],['Laundry Wash & Fold',25,WashingMachine]].map(([n,p,Icon]:any)=><button className="extra-card" key={n}><Icon className="text-[#006bdc]"/><b>{n}</b><strong>+ {p}.00 QR</strong><span className="absolute right-3 top-3 h-5 w-5 rounded border-2 border-[#bbc1cc]"/></button>)}</div>
    </div>
    <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-5 rounded-t-[22px] bg-white p-5 shadow-2xl"><div className="flex-1"><p className="text-sm text-[#747a90]">Total Price</p><p className="text-[24px] font-black text-[#006bdc]">{price.toFixed(2)} QR</p></div><button className="grid h-12 w-12 place-items-center rounded-full bg-[#f0f2f6]">⌃</button><Button onClick={()=>book(date, time, price)} className="h-14 flex-[1.6] text-[17px]">Continue to Details →</Button></div>
  </main>
}
function ServiceIcon({kind}:{kind: Service['kind']}){ const I = kind==='car'?Car:kind==='salon'?Scissors:kind==='cleaning'?Home:Sparkles; return <I size={52} className="text-[#006bdc]"/> }
function CheckBadge(){return <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-[#3185ff] align-middle text-xs text-white">✓</span>}
function MiniStat({icon,title,sub}:any){return <div className="grid place-items-center border-l border-[#e8edf5] text-center text-xs"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eaf4ff] text-[#006bdc]">{icon}</span><b>{title}</b><span>{sub}</span></div>}

function SuccessPage({ service, goHome, goChat }: { service: Service, goHome: () => void, goChat: () => void }) {return <main className="page-bg grid min-h-screen place-items-center px-8 text-center"><div className="rounded-[34px] bg-white p-8 shadow-soft"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#eaf7ff]"><Check size={56} className="text-[#006bdc]"/></div><h1 className="mt-6 text-3xl font-black">Booking Confirmed</h1><p className="mt-3 text-[#666d80]">Your booking with {service.title} has been confirmed. You can now chat with the provider.</p><Button onClick={goChat} className="mt-7 h-14 w-full">Chat with Provider</Button><button onClick={goHome} className="mt-3 h-12 w-full font-bold text-[#006bdc]">Back Home</button></div></main>}

function OrdersPage({ bookings, openService }: { bookings: Booking[], openService: (s: Service) => void }) {return <main className="page-bg h-screen overflow-y-auto px-5 pb-32"><StatusBar/><h1 className="mt-8 text-[34px] font-black">Orders</h1><p className="text-[#687083]">Track your bookings and services</p><div className="mt-6 space-y-4">{bookings.length===0 && <div className="rounded-[28px] bg-white p-8 text-center shadow-soft"><CalendarDays className="mx-auto text-[#006bdc]" size={54}/><h2 className="mt-4 text-xl font-black">No bookings yet</h2><p className="mt-2 text-[#747a90]">Book Scrubs Cleaning, car wash, salon or home services from the homepage.</p><Button onClick={()=>openService(services[0])} className="mt-5 h-12 px-6">Book Scrubs Cleaning</Button></div>}{bookings.map(b=><div className="rounded-[24px] bg-white p-5 shadow-soft" key={b.id}><div className="flex items-center gap-4"><IconBubble><CalendarDays className="text-[#006bdc]"/></IconBubble><div className="flex-1"><h3 className="font-black">{b.title}</h3><p className="text-sm text-[#687083]">{b.date.replace('\n',' ')} • {b.time}</p></div><span className="rounded-full bg-[#e8f8ef] px-3 py-1 text-xs font-bold text-green-600">Confirmed</span></div><div className="mt-4 flex justify-between border-t pt-4"><b>{b.price.toFixed(2)} QR</b><span className="text-[#006bdc] font-bold">View details</span></div></div>)}</div></main>}

function ChatPage({ bookings, openThread }: { bookings: Booking[], openThread: (provider: string) => void }) {
  const chats = useMemo(() => {
    const booked = bookings.map((b, i) => ({ title: b.title, msg: `Your booking for ${b.date.replace('\n',' ')} at ${b.time} is confirmed.`, unread: i+1, icon: b.kind }))
    return [...booked, {title:'Scrubs Cleaning',msg:'Hi la santi! 👋 Your booking for May 30 at 12:00 PM is confirmed.', unread:2, icon:'scrubs' as const},{title:'Happy Home Services',msg:"Thanks for your feedback! We're glad you're happy with our service.", unread:1, icon:'cleaning' as const},{title:'Helpy Support',msg:'How can we help you today?', unread:0, icon:'support' as any},{title:'Sparkle Cleaners',msg:'Reminder: Your booking is scheduled for tomorrow at 10:00 AM.', unread:0, icon:'cleaning' as const},{title:'QuickFix Maintenance',msg:"We've received your request and our team will contact you soon.", unread:0, icon:'car' as const},{title:'Helpy Offers',msg:'Special offer just for you! Get 20% OFF on your next booking.', unread:0, icon:'offer' as any}]
  }, [bookings])
  return <main className="h-screen overflow-y-auto bg-[#fbfcff] px-5 pb-32"><StatusBar/><div className="mt-7 flex items-start justify-between"><div><h1 className="text-[30px] font-black">Messages</h1><p className="mt-2 text-[#667085]">Stay connected with your service providers</p></div><button className="icon-btn"><PenLine className="text-[#0065dc]"/></button></div><div className="mt-7 flex gap-3"><div className="flex h-[54px] flex-1 items-center gap-3 rounded-[28px] border border-[#e1e6ef] px-5"><Search/><span className="text-[#667085]">Search messages...</span></div><button className="icon-btn"><Filter/></button></div><div className="mt-6 flex justify-between"><ChatFilter active label="All" n="8"/><ChatFilter label="Bookings" n="4" icon={<CalendarDays/>}/><ChatFilter label="Offers" n="2" icon={<Gift/>}/><ChatFilter label="Support" n="2" icon={<Headphones/>}/></div><div className="mt-5 space-y-4">{chats.map((c,i)=><button onClick={()=>openThread(c.title)} key={c.title+i} className="message-card"><div className="relative grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-[#f3f7ff]">{c.icon==='scrubs'?<ScrubsLogo/>:c.icon==='support'?<Headphones className="text-white"/>:c.icon==='offer'?<Gift className="text-white"/>:c.icon==='car'?<Car className="text-[#006bdc]"/>:<User className="text-[#006bdc]"/>}<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500"/></div><div className="min-w-0 flex-1 text-left"><h3 className="truncate text-[17px] font-black">{c.title} {i===0&&<CheckBadge/>}</h3><p className="mt-1 line-clamp-2 text-[15px] leading-6 text-[#596070]">{c.msg}</p></div><div className="text-right text-sm text-[#596070]"><p>{i===0?'10:30 AM':i<3?'Yesterday':`May ${29-i}`}</p>{c.unread>0&&<span className="mt-3 ml-auto grid h-8 w-8 place-items-center rounded-full bg-[#095fd1] font-bold text-white">{c.unread}</span>}<ChevronRight className="mt-3 ml-auto"/></div></button>)}</div></main>
}
function ChatFilter({label,n,active=false,icon}:any){return <button className={`flex items-center gap-2 rounded-[22px] px-4 py-3 font-bold ${active?'bg-[#075bd3] text-white':'text-black'}`}>{icon}{label}<span className={`${active?'bg-white/20':'bg-[#e5f2ff] text-[#0875ec]'} rounded-full px-2`}>{n}</span></button>}
function ThreadPage({ provider, goBack }: { provider: string, goBack: () => void }) {const [messages,setMessages]=useState(['Hi! Your booking is confirmed. How can we help you today?']); const [input,setInput]=useState(''); return <main className="page-bg flex h-screen flex-col"><StatusBar/><div className="flex items-center gap-4 border-b bg-white/70 px-5 py-4"><button onClick={goBack}><ArrowLeft/></button><IconBubble>{provider.includes('Scrubs')?<ScrubsLogo/>:<User className="text-[#006bdc]"/>}</IconBubble><div><h1 className="font-black">{provider}</h1><p className="text-sm text-green-600">Online now</p></div></div><div className="flex-1 space-y-4 overflow-y-auto p-5 pb-28">{messages.map((m,i)=><div key={i} className={`max-w-[82%] rounded-[22px] p-4 shadow-sm ${i%2?'ml-auto bg-[#006bdc] text-white':'bg-white text-[#11162d]'}`}>{m}</div>)}</div><div className="fixed bottom-0 left-1/2 flex w-full max-w-[430px] -translate-x-1/2 gap-3 bg-white p-4"><input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 rounded-full bg-[#f2f6fc] px-5 outline-none" placeholder="Type a message..."/><button onClick={()=>{if(input.trim()){setMessages([...messages,input]);setInput('')}}} className="grid h-12 w-12 place-items-center rounded-full bg-[#006bdc] text-white"><Send size={20}/></button></div></main>}

function ProfilePage(){const account=[[Wallet,'My Wallet','View balance, payments & history'],[Languages,'Language','Choose your preferred language'],[Heart,'My Favorites','Saved places, services & stores'],[MapPin,'Manage Addresses','Your saved delivery addresses']], more=[[MessageCircle,'Contact Us','We’re here to help'],[FileText,'Terms of Services','Read our terms and conditions'],[ShieldCheck,'Privacy Policy','How we protect your data']]; return <main className="page-bg h-screen overflow-y-auto px-5 pb-32"><StatusBar/><div className="mt-8 flex items-start justify-between"><div><h1 className="text-[42px] font-black text-[#071333]">Profile <span className="text-[#0a73ff]">•</span></h1><p className="mt-2 text-[#687083]">Manage your account and preferences</p></div><button className="icon-btn relative"><Bell/><span className="absolute right-3 top-2 h-2.5 w-2.5 rounded-full bg-[#0b7dff]"/></button></div><div className="mt-7 flex items-center gap-5 rounded-[24px] border border-white bg-[#eef6ff]/80 p-5 shadow-soft"><div className="relative grid h-[94px] w-[94px] place-items-center rounded-full border-4 border-white bg-gradient-to-br from-[#c9e1ff] to-white"><User className="text-[#0a73ff]" size={60} fill="currentColor"/><span className="absolute bottom-1 right-0 grid h-9 w-9 place-items-center rounded-full bg-[#1683ff] text-white"><PenLine size={18}/></span></div><div className="flex-1"><h2 className="text-2xl font-black">Adriana <CheckBadge/></h2><p className="text-[#40475a]">adrianaklimek00@gmail.com</p><span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-sm font-bold text-[#0073ff]">✦ Helpy Member</span></div><ChevronRight size={32}/></div><ProfileSection title="Account" rows={account}/><ProfileSection title="More" rows={more}/><button className="mt-5 flex w-full items-center gap-5 rounded-[22px] bg-white p-5 text-left shadow-soft"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-500"><LogOut/></span><b className="flex-1 text-xl text-red-600">Sign Out</b><ChevronRight/></button></main>}
function ProfileSection({title, rows}:any){return <section className="mt-7"><h3 className="mb-4 border-l-4 border-[#1683ff] pl-3 text-lg font-black text-[#667085]">{title}</h3><div className="rounded-[22px] bg-white p-4 shadow-soft">{rows.map(([Icon,name,sub]:any,i:number)=><div key={name} className={`flex items-center gap-4 py-3 ${i&&'border-t border-[#edf1f6]'}`}><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#edf6ff] text-[#1683ff]"><Icon/></span><div className="flex-1"><b className="text-lg">{name}</b><p className="text-[#667085]">{sub}</p></div>{name==='Language'?<span className="rounded-2xl border bg-[#f7f9fd] px-4 py-2 font-bold">English⌄</span>:<ChevronRight/>}</div>)}</div></section>}

export default AppShell
