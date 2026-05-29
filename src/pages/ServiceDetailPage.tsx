import { useState } from 'react'
import { ArrowLeft, Heart, Star, MapPin, Shield, Users, Clock, CheckCircle2, Plus, Minus } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES_MAP: Record<string, any[]> = {
  scrubs: [
    { id:'general', icon:'🏠', name:'General Cleaning', desc:'Regular home cleaning and maintenance', price:160 },
    { id:'deep',    icon:'✨', name:'Deep Cleaning',     desc:'Intensive cleaning of your home',       price:240 },
    { id:'movein',  icon:'📦', name:'Move-in / Move-out',desc:'Complete cleaning for new spaces',      price:280 },
  ],
  quickshine: [
    { id:'basic',    icon:'🚿', name:'Basic Wash',      desc:'Exterior wash and rinse',               price:120 },
    { id:'full',     icon:'✨', name:'Full Detail',      desc:'Interior + exterior deep clean',        price:220 },
    { id:'premium',  icon:'💎', name:'Premium Valet',   desc:'Complete premium detailing',             price:350 },
  ],
  glow: [
    { id:'haircut',  icon:'✂️', name:'Haircut & Style',  desc:'Cut, wash and blow dry',               price:200 },
    { id:'facial',   icon:'💆', name:'Facial Treatment', desc:'Deep cleanse and moisturise',           price:280 },
    { id:'spa',      icon:'🛁', name:'Spa Package',      desc:'Full body relaxation package',          price:450 },
  ],
  default: [
    { id:'standard', icon:'🧹', name:'Standard Service', desc:'Professional quality service',         price:180 },
    { id:'premium',  icon:'⭐', name:'Premium Service',  desc:'Top-tier premium option',              price:280 },
  ],
}

const DATES = [
  { day:'Today', date:'May 29' },{ day:'Fri', date:'May 30' },{ day:'Sat', date:'May 31' },
  { day:'Sun', date:'Jun 1' },{ day:'Mon', date:'Jun 2' },
]
const TIMES = ['08:00 AM','10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM','08:00 PM','10:00 PM']

const EXTRAS = [
  { id:'fridge', label:'Inside Fridge', price:30 },
  { id:'oven',   label:'Inside Oven',   price:30 },
  { id:'laundry',label:'Laundry Wash & Fold', price:25 },
]

export default function ServiceDetailPage() {
  const { goBack, navigate, params, addBooking } = useNav()
  const p = params || {}

  const serviceId = p.id || 'scrubs'
  const services = SERVICES_MAP[serviceId] || SERVICES_MAP.default
  const providerName = p.name || p.provider || 'Scrubs Cleaning'
  const category = p.cat || 'Home Services'
  const baseEmoji = p.emoji || '🧹'
  const baseColor = p.color || 'bg-red-100'
  const rating = p.rating || 4.8
  const reviews = p.reviews || 230
  const dist = p.dist || '2.27'

  const [selectedSvc, setSelectedSvc] = useState(0)
  const [selectedDate, setSelectedDate] = useState(1)
  const [selectedTime, setSelectedTime] = useState(2)
  const [extras, setExtras] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  const toggleExtra = (id: string) => setExtras(e => e.includes(id) ? e.filter(x => x !== id) : [...e, id])

  const svc = services[selectedSvc]
  const extrasTotal = extras.reduce((s, id) => s + (EXTRAS.find(e => e.id === id)?.price || 0), 0)
  const total = svc.price + extrasTotal

  const handleContinue = () => {
    const booking = {
      id: Date.now().toString(),
      serviceName: svc.name,
      provider: providerName,
      providerLogo: baseEmoji,
      date: DATES[selectedDate].date,
      time: TIMES[selectedTime],
      price: total,
      status: 'Upcoming',
      service: category,
    }
    addBooking(booking)
    navigate('booking-confirm', { booking, providerName, emoji: baseEmoji, color: baseColor })
  }

  return (
    <div className="flex flex-col flex-1 bg-white overflow-hidden">
      <StatusBar/>
      <div className="flex-1 overflow-y-auto">
        {/* Hero banner */}
        <div className={`relative ${baseColor} pt-2 pb-6`} style={{ minHeight: 200 }}>
          <div className="flex items-center justify-between px-4 mb-3">
            <button onClick={goBack} className="w-9 h-9 bg-white/90 rounded-xl shadow-sm flex items-center justify-center">
              <ArrowLeft size={18} className="text-gray-700"/>
            </button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-6xl mb-2">{baseEmoji}</div>
            <p className="text-gray-600 font-bold text-[13px]">{providerName}</p>
          </div>
          {/* Provider row */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-4 pt-4 pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl ${baseColor} flex items-center justify-center text-3xl shadow-sm`}>{baseEmoji}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[16px] font-bold text-gray-900">{providerName}</p>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1L11.06 3.26L14.07 2.75L14.93 5.63L17.66 6.9L16.75 9.87L17.66 12.84L14.93 14.1L14.07 16.98L11.06 16.47L9 18.73L6.94 16.47L3.93 16.98L3.07 14.1L0.34 12.84L1.25 9.87L0.34 6.9L3.07 5.63L3.93 2.75L6.94 3.26L9 1Z" fill="#2563EB"/>
                      <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[11px] text-blue-600 bg-blue-50 font-semibold px-2 py-0.5 rounded-full">{category}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5"><Star size={12} className="text-amber-400 fill-amber-400"/><span className="text-[12px] font-semibold">{rating} ({reviews})</span></div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-0.5"><MapPin size={12} className="text-gray-400"/><span className="text-[12px] text-gray-500">{dist} KM</span></div>
                  </div>
                </div>
              </div>
              <button onClick={() => setSaved(v => !v)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Heart size={18} className={saved ? 'text-red-500 fill-red-500' : 'text-gray-400'}/>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-5 pb-28">
          {/* Trust badges */}
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
            <div>
              <p className="text-[11px] text-gray-400">Starting from</p>
              <p className="text-[22px] font-bold text-brand-500">{svc.price}.00 QR</p>
            </div>
            <div className="flex-1 flex justify-around">
              {[{Icon:Shield,label:'Verified\nProvider'},{Icon:Users,label:'Trusted\nProfessionals'},{Icon:Clock,label:'On-time\nService'}].map(({Icon,label})=>(
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Icon size={16} className="text-brand-500"/></div>
                  <p className="text-[9px] text-gray-500 text-center font-semibold leading-tight whitespace-pre">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 1. Select Service */}
          <div>
            <p className="text-[15px] font-bold text-gray-900 mb-3">1. Select Service</p>
            <div className="grid grid-cols-3 gap-2">
              {services.map((s, i) => (
                <button key={s.id} onClick={() => setSelectedSvc(i)}
                  className={`relative rounded-2xl p-3 border-2 text-left transition-all ${selectedSvc === i ? 'border-brand-500 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                  {selectedSvc === i && <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center"><CheckCircle2 size={12} className="text-white"/></div>}
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="text-[12px] font-bold text-gray-900 leading-tight">{s.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.desc}</p>
                  <p className="text-[13px] font-bold text-brand-500 mt-2">{s.price} QR</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date & Time */}
          <div>
            <p className="text-[15px] font-bold text-gray-900 mb-3">2. Select Date & Time</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {DATES.map((d, i) => (
                <button key={i} onClick={() => setSelectedDate(i)}
                  className={`shrink-0 flex flex-col items-center px-4 py-2.5 rounded-2xl border-2 transition-all ${selectedDate === i ? 'border-brand-500 bg-brand-500' : 'border-gray-200 bg-white'}`}>
                  <p className={`text-[11px] font-semibold ${selectedDate === i ? 'text-white/80' : 'text-gray-500'}`}>{d.day}</p>
                  <p className={`text-[13px] font-bold ${selectedDate === i ? 'text-white' : 'text-gray-800'}`}>{d.date}</p>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {TIMES.map((t, i) => (
                <button key={i} onClick={() => setSelectedTime(i)}
                  className={`py-2.5 rounded-xl text-[12px] font-semibold transition-all ${selectedTime === i ? 'bg-brand-500 text-white' : i === 7 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 bg-blue-50 rounded-xl p-3">
              <Clock size={14} className="text-brand-500 shrink-0"/>
              <p className="text-[12px] text-brand-500 font-semibold">Service duration: ~3 to 4 hours</p>
            </div>
          </div>

          {/* 3. Extras */}
          <div>
            <p className="text-[15px] font-bold text-gray-900 mb-3">3. Add Extras (Optional)</p>
            <div className="grid grid-cols-3 gap-2">
              {EXTRAS.map(e => (
                <button key={e.id} onClick={() => toggleExtra(e.id)}
                  className={`relative rounded-2xl p-3 border-2 text-center transition-all ${extras.includes(e.id) ? 'border-brand-500 bg-blue-50' : 'border-gray-100 bg-white'}`}>
                  <div className={`absolute top-2 right-2 w-4 h-4 rounded border-2 ${extras.includes(e.id) ? 'bg-brand-500 border-brand-500' : 'border-gray-300'} flex items-center justify-center`}>
                    {extras.includes(e.id) && <span className="text-white text-[8px]">✓</span>}
                  </div>
                  <p className="text-[11px] font-bold text-gray-800 leading-tight">{e.label}</p>
                  <p className="text-[12px] font-bold text-brand-500 mt-1">+ {e.price}.00 QR</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-4 pt-3 pb-6 flex items-center gap-3 shadow-lg">
        <div>
          <p className="text-[11px] text-gray-400">Total Price</p>
          <p className="text-[20px] font-bold text-brand-500">{total}.00 QR</p>
        </div>
        <button onClick={handleContinue}
          className="flex-1 py-3.5 rounded-2xl bg-brand-500 text-white text-[14px] font-bold shadow-sm active:opacity-90">
          Continue to Details →
        </button>
      </div>
    </div>
  )
}
