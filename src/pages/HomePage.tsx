import { useState } from 'react'
import { Search, Bell, ChevronRight, MapPin, Star, Bookmark, SlidersHorizontal, Crown, ChevronDown } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const BANNERS = [
  {
    id:1, tag:'Sparkle Auto Wash', title:'Premium Car Wash', sub:'10% OFF', desc:'Foam wash, wax & interior clean',
    btn:'Book Now', bg:'from-blue-600 to-blue-800', emoji:'🚗',
    service:{name:'Premium Car Wash',provider:'Sparkle Auto Wash',price:'45.00',providerBg:'bg-blue-500',providerEmoji:'🚗'}
  },
  {
    id:2, tag:'Glow Salon & Spa', title:'Luxury Spa Day', sub:'15% OFF', desc:'Full body massage, facial & hair treatment',
    btn:'Book Now', bg:'from-pink-500 to-purple-600', emoji:'💆',
    service:{name:'Luxury Spa Package',provider:'Glow Salon & Spa',price:'120.00',providerBg:'bg-pink-500',providerEmoji:'💅'}
  },
  {
    id:3, tag:'CleanPro Services', title:'Deep Home Cleaning', sub:'20% OFF', desc:'Full home scrub, disinfect & organise',
    btn:'Book Now', bg:'from-green-500 to-teal-600', emoji:'🏠',
    service:{name:'Deep Home Cleaning',provider:'CleanPro Services',price:'160.00',providerBg:'bg-green-500',providerEmoji:'🧹'}
  },
]

const HOME_CATS = [
  {id:'digital',     emoji:'💻', label:'Digital'},
  {id:'education',   emoji:'🎓', label:'Education'},
  {id:'car',         emoji:'🚗', label:'Car Services'},
  {id:'home',        emoji:'🔧', label:'Home Services'},
  {id:'delivery',    emoji:'🚚', label:'Deliveries'},
  {id:'salon',       emoji:'✂️', label:'Salon & Spa'},
  {id:'marketplace', emoji:'🛒', label:'Marketplace'},
  {id:'more',        emoji:'•••', label:'More'},
]

const FEATURED = [
  {
    id:'scrubs', provider:'Scrubs', name:'Scrubs Cleaning', tag:'Home Services',
    from:'160.00 QR', rating:'4.8', reviews:'120', dist:'11.84 KM',
    bg:'from-red-400 to-red-600', emoji:'🧹',
    service:{name:'General Cleaning',provider:'Scrubs Cleaning',price:'160.00',providerBg:'bg-red-500',providerEmoji:'🧹'}
  },
  {
    id:'sparkle', provider:'Sparkle Auto', name:'Sparkle Car Wash', tag:'Car Services',
    from:'45.00 QR', rating:'4.7', reviews:'98', dist:'3.2 KM',
    bg:'from-blue-400 to-blue-600', emoji:'🚗',
    service:{name:'Premium Car Wash',provider:'Sparkle Auto Wash',price:'45.00',providerBg:'bg-blue-500',providerEmoji:'🚗'}
  },
  {
    id:'glow', provider:'Glow Spa', name:'Glow Salon & Spa', tag:'Salon & Spa',
    from:'80.00 QR', rating:'4.9', reviews:'215', dist:'5.1 KM',
    bg:'from-pink-400 to-purple-500', emoji:'💆',
    service:{name:'Luxury Spa Package',provider:'Glow Salon & Spa',price:'120.00',providerBg:'bg-pink-500',providerEmoji:'💅'}
  },
]

const FEAT_TABS = ['All','Digital','Education','Car Services','Home Services']

export default function HomePage() {
  const { navigate } = useNav()
  const [bannerIdx, setBannerIdx] = useState(0)
  const [featTab, setFeatTab] = useState('All')

  return (
    <div className="flex flex-col flex-1 bg-[#F0F4FF] overflow-hidden">
      <StatusBar/>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-1 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center shadow-sm">
            <span className="text-xl">👤</span>
          </div>
          <div>
            <p className="text-[12px] text-gray-400 font-medium">Hi, la santi 👋</p>
            <p className="text-[16px] font-bold text-gray-900">Welcome to Helpy</p>
          </div>
        </div>
        <button onClick={()=>navigate('notifications')} className="relative w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <Bell size={19} className="text-gray-600"/>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500"/>
        </button>
      </div>

      {/* Location + Join */}
      <div className="flex items-center gap-2 px-4 mb-3">
        <button onClick={()=>navigate('location')} className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
          <MapPin size={15} className="text-brand-500 shrink-0"/>
          <span className="flex-1 text-[13px] font-semibold text-gray-800 truncate">Viva Bahriya 10, The Pearl-Qatar</span>
          <ChevronDown size={14} className="text-gray-400 shrink-0"/>
        </button>
        <button className="flex items-center gap-1.5 bg-white border border-brand-500 rounded-2xl px-3 py-2.5 shadow-sm">
          <Crown size={14} className="text-brand-500"/>
          <span className="text-[12px] font-bold text-brand-500 whitespace-nowrap">Join for Free</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-3 shadow-sm">
          <Search size={16} className="text-gray-400"/>
          <input placeholder="Search for services, categories..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
        </div>
        <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <SlidersHorizontal size={17} className="text-gray-600"/>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4 space-y-5">
        {/* ── Carousel banners ── */}
        <div className="px-4">
          <div className="relative rounded-3xl overflow-hidden" style={{height:200}}>
            {BANNERS.map((b, i) => (
              <div key={b.id}
                className={`absolute inset-0 bg-gradient-to-br ${b.bg} p-5 flex flex-col justify-between transition-opacity duration-500 ${i===bannerIdx?'opacity-100':'opacity-0 pointer-events-none'}`}>
                <div>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{b.tag}</span>
                  <p className="text-white text-[28px] font-black leading-tight mt-0.5">{b.sub}</p>
                  <p className="text-[16px] font-bold text-white">{b.title}</p>
                  <p className="text-[12px] text-white/80 mt-1">{b.desc}</p>
                </div>
                <button onClick={()=>navigate('service-detail',{...b.service,isBanner:true})}
                  className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 w-fit">
                  <span className="text-brand-500 text-[13px] font-bold">{b.btn} →</span>
                </button>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-6xl opacity-80">{b.emoji}</div>
              </div>
            ))}
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {BANNERS.map((_,i)=>(
                <button key={i} onClick={()=>setBannerIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i===bannerIdx?'w-5 bg-white':'w-1.5 bg-white/50'}`}/>
              ))}
            </div>
            {/* Swipe arrows */}
            <button onClick={()=>setBannerIdx(i=>(i+1)%BANNERS.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
              <ChevronRight size={14} className="text-white"/>
            </button>
          </div>
        </div>

        {/* ── Categories ── */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[17px] font-bold text-gray-900">Categories</p>
            <button onClick={()=>navigate('categories')} className="flex items-center gap-1 text-brand-500 text-[13px] font-semibold">View all <ChevronRight size={14}/></button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {HOME_CATS.map(c=>(
              <button key={c.id} onClick={()=>c.id==='more'?navigate('categories'):navigate('category-services',{id:c.id,label:c.label})}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl py-3 px-2 shadow-sm active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <span className={c.emoji==='•••'?'text-brand-500 font-black text-[11px]':'text-2xl'}>{c.emoji}</span>
                </div>
                <p className="text-[10px] font-semibold text-gray-700 text-center leading-tight">{c.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Featured Services ── */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[17px] font-bold text-gray-900">Featured Services</p>
            <button onClick={()=>navigate('categories')} className="flex items-center gap-1 text-brand-500 text-[13px] font-semibold">View all <ChevronRight size={14}/></button>
          </div>
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto mb-3 pb-1">
            {FEAT_TABS.map(t=>(
              <button key={t} onClick={()=>setFeatTab(t)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${featTab===t?'bg-brand-500 text-white':'bg-white text-gray-600 shadow-sm'}`}>
                {t==='All'&&<span className="text-lg leading-none">⊞</span>}
                {t}
              </button>
            ))}
          </div>
          {/* Cards */}
          <div className="space-y-3">
            {FEATURED.filter(f=>featTab==='All'||f.tag===featTab).map(f=>(
              <button key={f.id} onClick={()=>navigate('service-detail',f.service)}
                className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex text-left active:scale-[0.99] transition-transform">
                <div className={`w-32 bg-gradient-to-br ${f.bg} flex items-center justify-center shrink-0`} style={{minHeight:110}}>
                  <span className="text-4xl">{f.emoji}</span>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] text-brand-500 font-semibold">{f.provider}</p>
                      <p className="text-[14px] font-bold text-gray-900 mt-0.5">{f.name}</p>
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                      <Bookmark size={14} className="text-gray-400"/>
                    </button>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-brand-500 bg-blue-50 px-2.5 py-0.5 rounded-full mt-1">{f.tag}</span>
                  <div className="flex items-center justify-between mt-2">
                    <div><p className="text-[10px] text-gray-400">from</p><p className="text-[15px] font-bold text-brand-500">{f.from}</p></div>
                    <div className="text-right">
                      <div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/><span className="text-[12px] font-semibold text-gray-700">{f.rating} ({f.reviews})</span></div>
                      <div className="flex items-center gap-1 mt-0.5"><MapPin size={11} className="text-gray-400"/><span className="text-[11px] text-gray-400">{f.dist} away</span></div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
