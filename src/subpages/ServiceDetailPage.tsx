import { useState } from 'react'
import { ArrowLeft, Star, Heart, MapPin, Shield, Users, Clock, ChevronUp, ChevronDown, Check } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES_MAP: Record<string, {label:string;desc:string;prices:Record<string,number>}> = {
  'Scrubs Cleaning': {
    label:'Scrubs Cleaning', desc:'Professional scrubs-grade cleaning you can trust!',
    prices:{'General Cleaning':160,'Deep Cleaning':240,'Move-in / Move-out':280}
  },
  'Sparkle Auto Wash': {
    label:'Sparkle Auto Wash', desc:'Premium car wash & detailing service in Doha.',
    prices:{'Basic Wash':45,'Premium Wash':75,'Full Detail':120}
  },
  'Glow Salon & Spa': {
    label:'Glow Salon & Spa', desc:'Luxury beauty & wellness treatments by experts.',
    prices:{'Hair Treatment':80,'Full Massage':120,'Facial':95}
  },
  'CleanPro Services': {
    label:'CleanPro Services', desc:'Deep home cleaning - scrub, disinfect & organize.',
    prices:{'Standard Clean':120,'Deep Clean':160,'Move-out Clean':200}
  },
  'Happy Home Services': {
    label:'Happy Home Services', desc:'Your trusted home cleaning partner.',
    prices:{'Regular Clean':140,'Deep Clean':220,'Office Clean':180}
  },
}

const DATES = [
  {label:'Today',  day:'May 29'},
  {label:'Fri',    day:'May 30'},
  {label:'Sat',    day:'May 31'},
  {label:'Sun',    day:'Jun 1'},
  {label:'Mon',    day:'Jun 2'},
]
const TIMES = ['08:00 AM','10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM','08:00 PM','10:00 PM']
const EXTRAS = [
  {label:'Inside Fridge',    price:30},
  {label:'Inside Oven',      price:30},
  {label:'Laundry Wash & Fold',price:25},
]

export default function ServiceDetailPage() {
  const { goBack, navigate, params, addBooking, setActiveTab } = useNav()
  const provider = params?.provider || 'Scrubs Cleaning'
  const svcMap = SERVICES_MAP[provider] || SERVICES_MAP['Scrubs Cleaning']
  const serviceKeys = Object.keys(svcMap.prices)

  const [selSvc, setSelSvc] = useState(serviceKeys[0])
  const [selDate, setSelDate] = useState(1)
  const [selTime, setSelTime] = useState('12:00 PM')
  const [extras, setExtras] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const [showTotal, setShowTotal] = useState(false)

  const basePrice = svcMap.prices[selSvc] || 160
  const extrasTotal = extras.reduce((s,e)=>s+(EXTRAS.find(x=>x.label===e)?.price||0),0)
  const total = basePrice + extrasTotal

  const toggleExtra = (e: string) => setExtras(prev => prev.includes(e) ? prev.filter(x=>x!==e) : [...prev,e])

  const book = () => {
    const booking = {
      id: Date.now().toString(),
      provider,
      service: selSvc,
      date: DATES[selDate].day + ', 2024',
      time: selTime,
      price: total.toFixed(2),
      status: 'Confirmed' as const,
      providerBg: params?.providerBg || 'bg-red-500',
      providerEmoji: params?.providerEmoji || '🧹',
    }
    addBooking(booking)
    navigate('booking-success', booking)
  }

  return (
    <div className="flex flex-col flex-1 bg-white overflow-hidden">
      {/* Hero */}
      <div className="relative shrink-0" style={{height:220}}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-red-700 flex items-center justify-center">
          <span className="text-8xl opacity-30">{params?.providerEmoji||'🧹'}</span>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-1">Professional</p>
            <p className="text-white text-[20px] font-black leading-tight">{svcMap.label.toUpperCase()}</p>
            <p className="text-white/80 text-[11px] mt-1">{svcMap.desc}</p>
          </div>
        </div>
        <StatusBar light/>
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-md flex items-center justify-center"><ArrowLeft size={18} className="text-gray-700"/></button>
          <button onClick={()=>setLiked(v=>!v)} className="w-9 h-9 bg-white rounded-xl shadow-md flex items-center justify-center">
            <Heart size={18} className={liked?'text-red-500 fill-red-500':'text-gray-400'}/>
          </button>
        </div>
      </div>

      {/* Provider info */}
      <div className="px-4 pt-4 pb-3 bg-white shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl shrink-0 shadow-sm">
            {params?.providerEmoji||'🧹'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[16px] font-bold text-gray-900">{svcMap.label}</p>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 1L11.06 3.26L14.07 2.75L14.93 5.63L17.66 6.9L16.75 9.87L17.66 12.84L14.93 14.1L14.07 16.98L11.06 16.47L9 18.73L6.94 16.47L3.93 16.98L3.07 14.1L0.34 12.84L1.25 9.87L0.34 6.9L3.07 5.63L3.93 2.75L6.94 3.26L9 1Z" fill="#2563EB"/><path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-[11px] font-semibold text-brand-500 bg-blue-50 px-2.5 py-0.5 rounded-full">Home Services</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1"><Star size={13} className="text-amber-400 fill-amber-400"/><span className="text-[12px] font-semibold text-gray-700">4.8 (230)</span></div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1"><MapPin size={12} className="text-gray-400"/><span className="text-[12px] text-gray-500">2.27 KM away</span></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
          <div><p className="text-[11px] text-gray-400">Starting from</p><p className="text-[20px] font-bold text-brand-500">{basePrice}.00 QR</p></div>
          <div className="flex gap-3 ml-auto">
            {[{Icon:Shield,label:'Verified\nProvider'},{Icon:Users,label:'Trusted\nProfessionals'},{Icon:Clock,label:'On-time\nService'}].map(({Icon,label})=>(
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center"><Icon size={15} className="text-brand-500"/></div>
                <p className="text-[9px] text-gray-500 text-center leading-tight whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-24">
        {/* 1. Select Service */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-3">1. Select Service</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {serviceKeys.map(s=>(
              <button key={s} onClick={()=>setSelSvc(s)}
                className={`shrink-0 w-36 rounded-2xl p-3 border-2 text-left transition-all ${selSvc===s?'border-brand-500 bg-blue-50':'border-gray-100 bg-white'}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{params?.providerEmoji||'🏠'}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selSvc===s?'border-brand-500 bg-brand-500':'border-gray-300'}`}>
                    {selSvc===s&&<Check size={11} className="text-white"/>}
                  </div>
                </div>
                <p className="text-[12px] font-bold text-gray-900">{s}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">Professional service</p>
                <p className="text-[13px] font-bold text-brand-500 mt-2">{svcMap.prices[s]}.00 QR</p>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Date */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-3">2. Select Date & Time</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DATES.map((d,i)=>(
              <button key={i} onClick={()=>setSelDate(i)}
                className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-2xl border-2 min-w-[60px] transition-all ${selDate===i?'border-brand-500 bg-brand-500 text-white':'border-gray-100 bg-white text-gray-700'}`}>
                <p className="text-[10px] font-semibold">{d.label}</p>
                <p className="text-[13px] font-bold mt-0.5">{d.day.split(' ')[1]}</p>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {TIMES.map(t=>(
              <button key={t} onClick={()=>setSelTime(t)}
                className={`py-2.5 rounded-xl text-[12px] font-semibold transition-all ${selTime===t?'bg-brand-500 text-white shadow-sm':'bg-white text-gray-700 border border-gray-100 '+(t==='10:00 PM'?'opacity-40 pointer-events-none':'')}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 bg-blue-50 rounded-xl px-3 py-2.5">
            <Clock size={14} className="text-brand-500"/>
            <p className="text-[12px] text-brand-500 font-semibold">Service duration: ~3 to 4 hours</p>
          </div>
        </div>

        {/* 3. Extras */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-3">3. Add Extras (Optional)</p>
          <div className="grid grid-cols-3 gap-3">
            {EXTRAS.map(e=>(
              <button key={e.label} onClick={()=>toggleExtra(e.label)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${extras.includes(e.label)?'border-brand-500 bg-blue-50':'border-gray-100 bg-white'}`}>
                <div className="flex items-start justify-between w-full">
                  <span className="text-xl">{e.label.includes('Fridge')?'🧊':e.label.includes('Oven')?'🍳':'👕'}</span>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${extras.includes(e.label)?'border-brand-500 bg-brand-500':'border-gray-300'}`}>
                    {extras.includes(e.label)&&<Check size={9} className="text-white"/>}
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-gray-800 text-center leading-tight">{e.label}</p>
                <p className="text-[11px] font-bold text-brand-500">+ {e.price}.00 QR</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom total + CTA */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <button onClick={()=>setShowTotal(v=>!v)} className="flex items-center justify-between w-full mb-3">
          <div><p className="text-[11px] text-gray-400">Total Price</p><p className="text-[20px] font-bold text-brand-500">{total}.00 QR</p></div>
          {showTotal?<ChevronDown size={18} className="text-gray-400"/>:<ChevronUp size={18} className="text-gray-400"/>}
        </button>
        {showTotal&&(
          <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1.5">
            <div className="flex justify-between text-[12px]"><span className="text-gray-500">{selSvc}</span><span className="font-semibold">{basePrice}.00 QR</span></div>
            {extras.map(e=><div key={e} className="flex justify-between text-[12px]"><span className="text-gray-500">{e}</span><span className="font-semibold">+{EXTRAS.find(x=>x.label===e)?.price}.00 QR</span></div>)}
            <div className="border-t border-gray-200 pt-1.5 flex justify-between text-[13px] font-bold"><span>Total</span><span className="text-brand-500">{total}.00 QR</span></div>
          </div>
        )}
        <button onClick={book} className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[15px] font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
          Continue to Details →
        </button>
      </div>
    </div>
  )
}
