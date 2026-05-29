import { useState } from 'react'
import { Search, ChevronRight, CalendarDays, MapPin, MessageCircle, Star, ArrowLeft } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const DEFAULT_ORDERS = [
  {id:'o1',provider:'Scrubs Cleaning',    service:'General Cleaning', date:'May 30, 2024',time:'12:00 PM',price:'160.00',status:'Confirmed',   providerBg:'bg-red-500',   providerEmoji:'🧹',location:'The Pearl-Qatar'},
  {id:'o2',provider:'QuickFix Maintenance',service:'AC Service',      date:'Jun 5, 2024', time:'10:00 AM',price:'120.00',status:'Confirmed',   providerBg:'bg-green-500', providerEmoji:'🔧',location:'West Bay, Doha'},
  {id:'o3',provider:'Happy Home Services',service:'Deep Cleaning',     date:'May 20, 2024',time:'09:00 AM',price:'220.00',status:'Completed',  providerBg:'bg-amber-400', providerEmoji:'👩',location:'Lusail City'},
  {id:'o4',provider:'Sparkle Auto Wash',  service:'Premium Car Wash',  date:'May 15, 2024',time:'11:00 AM',price:'75.00', status:'Completed',  providerBg:'bg-blue-500',  providerEmoji:'🚗',location:'Al Sadd, Doha'},
]
const SC:Record<string,string> = {
  'Confirmed':'bg-green-100 text-green-600',
  'In Progress':'bg-amber-100 text-amber-600',
  'Completed':'bg-blue-100 text-blue-600'
}

export default function OrdersPage() {
  const { navigate, bookedServices } = useNav()
  const [tab, setTab] = useState<'active'|'completed'>('active')

  const all = [
    ...bookedServices.map(b=>({id:b.id,provider:b.provider,service:b.service,date:b.date,time:b.time,price:b.price,status:b.status,providerBg:b.providerBg,providerEmoji:b.providerEmoji,location:'Doha, Qatar'})),
    ...DEFAULT_ORDERS
  ]
  const filtered = all.filter(o => tab==='active' ? o.status!=='Completed' : o.status==='Completed')

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <div><h1 className="text-[24px] font-bold text-gray-900">My Orders</h1><p className="text-[12px] text-gray-400 mt-0.5">Track your service bookings</p></div>
        <button className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><Search size={17} className="text-gray-500"/></button>
      </div>
      <div className="px-4 mb-4">
        <div className="bg-gray-100 rounded-2xl p-1 flex gap-1">
          {(['active','completed'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${tab===t?'bg-white text-brand-500 shadow-sm':'text-gray-500'}`}>
              {t==='active'?'Active':'Completed'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {filtered.length===0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <span className="text-5xl">📋</span>
            <p className="text-[14px] font-semibold text-gray-400">No orders yet</p>
            <button onClick={()=>navigate('home')} className="text-brand-500 text-[13px] font-semibold">Browse Services →</button>
          </div>
        )}
        {filtered.map(o=>(
          <button key={o.id} onClick={()=>navigate('order-detail',o)} className="w-full bg-white rounded-2xl shadow-sm p-4 text-left active:scale-[0.99] transition-transform">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full ${o.providerBg} flex items-center justify-center text-white text-xl shadow-sm shrink-0`}>{o.providerEmoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[14px] font-bold text-gray-900">{o.provider}</p>
                  <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${SC[o.status]||'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                </div>
                <p className="text-[12px] text-brand-500 font-semibold mt-0.5">{o.service}</p>
                <div className="flex items-center gap-1.5 mt-1.5"><CalendarDays size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">{o.date} • {o.time}</span></div>
                <div className="flex items-center gap-1.5 mt-0.5"><MapPin size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">{o.location}</span></div>
              </div>
              <ChevronRight size={15} className="text-gray-300 shrink-0 mt-1"/>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <p className="text-[15px] font-bold text-gray-900">{o.price} QR</p>
              <div className="flex gap-2">
                <button onClick={e=>{e.stopPropagation();navigate('chat-thread',{id:o.id,name:o.provider,providerBg:o.providerBg,providerEmoji:o.providerEmoji})}}
                  className="flex items-center gap-1 text-[12px] font-semibold text-brand-500 bg-blue-50 px-3 py-1.5 rounded-xl">
                  <MessageCircle size={13}/>Chat
                </button>
                {o.status==='Completed' && (
                  <button className="flex items-center gap-1 text-[12px] font-semibold text-amber-500 bg-amber-50 px-3 py-1.5 rounded-xl">
                    <Star size={13}/>Review
                  </button>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
