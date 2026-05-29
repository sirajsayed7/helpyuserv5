import { useState } from 'react'
import { Search, PenSquare, SlidersHorizontal, ChevronRight, BadgeCheck } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const BASE_CONVOS = [
  {id:'scrubs',  name:'Scrubs Cleaning',    verified:true,  tag:'General Cleaning',  meta:'May 30, 12:00 PM',preview:'Hi la santi! 👋 Your booking for May 30 at 12:00 PM is confirmed.',time:'10:30 AM',unread:2,online:true, bg:'bg-red-50',   emoji:'🧹', providerBg:'bg-red-500'},
  {id:'happy',   name:'Happy Home Services',verified:false, tag:'Deep Cleaning',      meta:'Jun 1, 10:00 AM', preview:"Thanks for your feedback! We're glad you're happy with our service.", time:'Yesterday',unread:1,online:true, bg:'bg-amber-50', emoji:'👩', providerBg:'bg-amber-400'},
  {id:'support', name:'Helpy Support',      verified:false, tag:'Support',            meta:null,              preview:'How can we help you today?',                                          time:'Yesterday',unread:0,online:false,bg:'bg-blue-50',  emoji:'🎧', providerBg:'bg-brand-500'},
  {id:'sparkle', name:'Sparkle Cleaners',   verified:false, tag:'Home Services',      meta:null,              preview:'Reminder: Your booking is scheduled for tomorrow at 10:00 AM.',      time:'May 28',   unread:0,online:false,bg:'bg-sky-50',   emoji:'✨', providerBg:'bg-sky-400'},
  {id:'quickfix',name:'QuickFix Maintenance',verified:false,tag:'Maintenance',        meta:null,              preview:"We've received your request and our team will contact you soon.",    time:'May 27',   unread:0,online:true, bg:'bg-green-50', emoji:'🔧', providerBg:'bg-green-500'},
  {id:'offers',  name:'Helpy Offers',       verified:false, tag:'Offer',              meta:null,              preview:'Special offer just for you! Get 20% OFF on your next booking.',      time:'May 25',   unread:0,online:false,bg:'bg-pink-50',  emoji:'%',  providerBg:'bg-pink-400'},
]
const FTABS = [{id:'all',label:'All',count:8},{id:'bookings',label:'Bookings',count:4},{id:'offers',label:'Offers',count:2},{id:'support',label:'Support',count:2}]

export default function ChatPage() {
  const { navigate, bookedServices } = useNav()
  const [ft, setFt] = useState('all')
  const [q, setQ] = useState('')

  // merge booked services into convos
  const bookedConvos = bookedServices.map(b => ({
    id: b.id, name: b.provider, verified: true, tag: b.service,
    meta: `${b.date}, ${b.time}`, preview: `Your ${b.service} booking is confirmed for ${b.date} at ${b.time}!`,
    time: 'Just now', unread: 1, online: true,
    bg: 'bg-brand-50', emoji: b.providerEmoji, providerBg: b.providerBg
  }))
  const allConvos = [...bookedConvos, ...BASE_CONVOS]
  const filtered = allConvos.filter(c => {
    const mq = c.name.toLowerCase().includes(q.toLowerCase()) || c.preview.toLowerCase().includes(q.toLowerCase())
    const mf = ft === 'all' || (ft === 'bookings' && !['Offer','Support'].includes(c.tag)) || (ft === 'offers' && c.tag === 'Offer') || (ft === 'support' && c.tag === 'Support')
    return mq && mf
  })

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900">Messages</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">Stay connected with your service providers</p>
        </div>
        <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <PenSquare size={18} className="text-brand-500"/>
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 mt-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-3 shadow-sm">
          <Search size={16} className="text-gray-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search messages..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
        </div>
        <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <SlidersHorizontal size={17} className="text-gray-500"/>
        </button>
      </div>
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1">
        {FTABS.map(f=>(
          <button key={f.id} onClick={()=>setFt(f.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${ft===f.id?'bg-brand-500 text-white':'bg-white text-gray-600 shadow-sm'}`}>
            {f.label} <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ft===f.id?'bg-white/20':'bg-gray-100'}`}>{f.count}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4 mt-3 pb-2">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {filtered.map(c=>(
            <button key={c.id} onClick={()=>navigate('chat-thread',c)}
              className="w-full flex items-start gap-3 p-4 active:bg-gray-50 text-left">
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full ${c.providerBg} flex items-center justify-center text-white text-lg font-bold shadow-sm`}>
                  {c.emoji}
                </div>
                {c.online&&<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-bold text-gray-900 truncate">{c.name}</p>
                    {c.verified && (
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="shrink-0">
                        <path d="M9 1L11.06 3.26L14.07 2.75L14.93 5.63L17.66 6.9L16.75 9.87L17.66 12.84L14.93 14.1L14.07 16.98L11.06 16.47L9 18.73L6.94 16.47L3.93 16.98L3.07 14.1L0.34 12.84L1.25 9.87L0.34 6.9L3.07 5.63L3.93 2.75L6.94 3.26L9 1Z" fill="#2563EB"/>
                        <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 shrink-0">{c.time}</span>
                </div>
                {c.meta&&<div className="flex items-center gap-1 mt-0.5"><span className="text-[10px] font-semibold text-brand-500 bg-blue-50 px-2 py-0.5 rounded-full">{c.tag}</span><span className="text-[10px] text-gray-400">• {c.meta}</span></div>}
                <p className="text-[12px] text-gray-500 mt-1 line-clamp-2 leading-snug">{c.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                {c.unread?<span className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</span>:<ChevronRight size={15} className="text-gray-300"/>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
