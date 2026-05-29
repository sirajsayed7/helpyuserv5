import { ArrowLeft, Star, MapPin, Heart, Search } from 'lucide-react'
import { useState } from 'react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES_BY_CAT: Record<string, any[]> = {
  cleaning: [
    {name:'Scrubs Cleaning',tag:'General Cleaning',from:'160.00',rating:'4.8',reviews:'230',dist:'2.27',emoji:'🧹',bg:'bg-red-500',service:{name:'General Cleaning',provider:'Scrubs Cleaning',price:'160.00',providerBg:'bg-red-500',providerEmoji:'🧹'}},
    {name:'Happy Home Services',tag:'Deep Cleaning',from:'180.00',rating:'4.7',reviews:'185',dist:'4.1',emoji:'👩',bg:'bg-amber-400',service:{name:'Deep Cleaning',provider:'Happy Home Services',price:'220.00',providerBg:'bg-amber-400',providerEmoji:'👩'}},
    {name:'CleanPro Services',tag:'Move-in/Move-out',from:'200.00',rating:'4.6',reviews:'98',dist:'6.3',emoji:'🧽',bg:'bg-teal-500',service:{name:'Deep Home Cleaning',provider:'CleanPro Services',price:'200.00',providerBg:'bg-teal-500',providerEmoji:'🧹'}},
    {name:'Sparkle Cleaners',tag:'Office Cleaning',from:'140.00',rating:'4.5',reviews:'67',dist:'8.0',emoji:'✨',bg:'bg-sky-500',service:{name:'Office Cleaning',provider:'Sparkle Cleaners',price:'140.00',providerBg:'bg-sky-500',providerEmoji:'✨'}},
  ],
  salon: [
    {name:'Glow Salon & Spa',tag:'Full Spa Package',from:'80.00',rating:'4.9',reviews:'215',dist:'5.1',emoji:'💆',bg:'bg-pink-500',service:{name:'Luxury Spa Package',provider:'Glow Salon & Spa',price:'120.00',providerBg:'bg-pink-500',providerEmoji:'💅'}},
    {name:'Luxe Beauty Lounge',tag:'Hair Treatment',from:'95.00',rating:'4.8',reviews:'143',dist:'3.8',emoji:'💇',bg:'bg-purple-500',service:{name:'Hair Treatment',provider:'Luxe Beauty Lounge',price:'95.00',providerBg:'bg-purple-500',providerEmoji:'💇'}},
  ],
  car: [
    {name:'Sparkle Auto Wash',tag:'Premium Car Wash',from:'45.00',rating:'4.7',reviews:'98',dist:'3.2',emoji:'🚗',bg:'bg-blue-500',service:{name:'Premium Car Wash',provider:'Sparkle Auto Wash',price:'45.00',providerBg:'bg-blue-500',providerEmoji:'🚗'}},
    {name:'QuickFix Mechanics',tag:'Oil Change',from:'80.00',rating:'4.6',reviews:'77',dist:'5.5',emoji:'🔩',bg:'bg-gray-600',service:{name:'Full Detail',provider:'QuickFix Mechanics',price:'80.00',providerBg:'bg-gray-600',providerEmoji:'🔩'}},
  ],
  home: [
    {name:'QuickFix Maintenance',tag:'AC Service',from:'120.00',rating:'4.8',reviews:'156',dist:'4.4',emoji:'🔧',bg:'bg-green-500',service:{name:'AC Service',provider:'QuickFix Maintenance',price:'120.00',providerBg:'bg-green-500',providerEmoji:'🔧'}},
    {name:'Fix It All',tag:'Plumbing',from:'90.00',rating:'4.5',reviews:'89',dist:'6.2',emoji:'🚿',bg:'bg-cyan-500',service:{name:'Plumbing Service',provider:'Fix It All',price:'90.00',providerBg:'bg-cyan-500',providerEmoji:'🚿'}},
  ],
}

const DEFAULT_SERVICES = [
  {name:'Helpy Pro Service',tag:'General Service',from:'100.00',rating:'4.5',reviews:'50',dist:'5.0',emoji:'⭐',bg:'bg-brand-500',service:{name:'General Service',provider:'Helpy Pro Service',price:'100.00',providerBg:'bg-brand-500',providerEmoji:'⭐'}},
]

export default function CategoryServicesPage() {
  const { goBack, navigate, params } = useNav()
  const id = params?.id || 'cleaning'
  const label = params?.label || 'Services'
  const emoji = params?.emoji || '🧹'
  const services = SERVICES_BY_CAT[id] || DEFAULT_SERVICES
  const [liked, setLiked] = useState<string[]>([])

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-1 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <h1 className="text-[20px] font-bold text-gray-900">{label}</h1>
        </div>
      </div>
      {/* Search */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
          <Search size={16} className="text-gray-400"/>
          <input placeholder={`Search ${label}...`} className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        <p className="text-[13px] font-semibold text-gray-400">{services.length} providers found</p>
        {services.map((s,i)=>(
          <button key={i} onClick={()=>navigate('service-detail',s.service)}
            className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex text-left active:scale-[0.99] transition-transform">
            <div className={`w-28 ${s.bg} flex items-center justify-center shrink-0`} style={{minHeight:110}}>
              <span className="text-4xl">{s.emoji}</span>
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-gray-900">{s.name}</p>
                  <span className="inline-block text-[11px] font-semibold text-brand-500 bg-blue-50 px-2.5 py-0.5 rounded-full mt-0.5">{s.tag}</span>
                </div>
                <button onClick={e=>{e.stopPropagation();setLiked(p=>p.includes(s.name)?p.filter(x=>x!==s.name):[...p,s.name])}}
                  className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Heart size={14} className={liked.includes(s.name)?'text-red-500 fill-red-500':'text-gray-400'}/>
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div><p className="text-[10px] text-gray-400">from</p><p className="text-[15px] font-bold text-brand-500">{s.from} QR</p></div>
                <div className="text-right">
                  <div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/><span className="text-[12px] font-semibold text-gray-700">{s.rating} ({s.reviews})</span></div>
                  <div className="flex items-center gap-1 mt-0.5"><MapPin size={11} className="text-gray-400"/><span className="text-[11px] text-gray-400">{s.dist} KM away</span></div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
