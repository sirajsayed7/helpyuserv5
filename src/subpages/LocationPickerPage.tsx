import { useState } from 'react'
import { ArrowLeft, MapPin, Search, CheckCircle2, Navigation } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SAVED = [
  {icon:'🏠', label:'Home',    addr:'Viva Bahriya 10, The Pearl-Qatar',    primary:true},
  {icon:'🏢', label:'Work',    addr:'West Bay Tower, Floor 12, Doha',       primary:false},
  {icon:'🏡', label:'Parents', addr:'Al Sadd Street, Villa 5, Doha',       primary:false},
]
const NEARBY = [
  'Al Waab Street, Doha',
  'Lusail Marina, Lusail City',
  'Hamad International Airport',
  'Al Corniche Street, West Bay',
  'Msheireb Downtown Doha',
  'Al Wakrah, Doha',
  'Qatar University Area, Doha',
]

export default function LocationPickerPage() {
  const { goBack } = useNav()
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState('Viva Bahriya 10, The Pearl-Qatar')
  const [confirmed, setConfirmed] = useState(false)

  const suggestions = NEARBY.filter(n => n.toLowerCase().includes(q.toLowerCase()))

  if (confirmed) return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] items-center justify-center px-8 gap-5">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 size={40} className="text-green-500"/></div>
      <p className="text-[20px] font-bold text-gray-900 text-center">Location Set!</p>
      <p className="text-[14px] text-gray-500 text-center leading-relaxed">{selected}</p>
      <button onClick={goBack} className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[14px] font-bold">Back to Home</button>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-1 pb-3 shrink-0">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div><p className="text-[18px] font-bold text-gray-900">Set Location</p><p className="text-[11px] text-gray-400">Choose your service address</p></div>
      </div>

      {/* Map placeholder */}
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-sm" style={{height:200}}>
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center gap-2 relative">
          <div className="absolute inset-0 opacity-15" style={{backgroundImage:'repeating-linear-gradient(0deg,#2563EB 0,#2563EB 1px,transparent 1px,transparent 30px),repeating-linear-gradient(90deg,#2563EB 0,#2563EB 1px,transparent 1px,transparent 30px)'}}/>
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center shadow-lg z-10"><MapPin size={16} className="text-white"/></div>
          <p className="text-[12px] font-semibold text-brand-500 bg-white/80 px-3 py-1 rounded-full z-10 max-w-[200px] text-center truncate">{selected}</p>
          <button className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center z-10"><Navigation size={16} className="text-brand-500"/></button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4 shrink-0">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
          <Search size={16} className="text-gray-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for an area or street..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Saved addresses */}
        {!q && (
          <div>
            <p className="text-[14px] font-bold text-gray-900 mb-2">Saved Addresses</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
              {SAVED.map((s,i)=>(
                <button key={i} onClick={()=>setSelected(s.addr)}
                  className={`w-full flex items-center gap-3 p-4 active:bg-blue-50 transition-colors ${selected===s.addr?'bg-blue-50':''}`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">{s.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2"><p className="text-[13px] font-bold text-gray-900">{s.label}</p>{s.primary&&<span className="text-[10px] font-bold text-brand-500 bg-blue-50 px-2 py-0.5 rounded-full">Primary</span>}</div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{s.addr}</p>
                  </div>
                  {selected===s.addr&&<CheckCircle2 size={18} className="text-brand-500 shrink-0"/>}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Nearby / search results */}
        <div>
          <p className="text-[14px] font-bold text-gray-900 mb-2">{q ? 'Search Results' : 'Nearby Locations'}</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {(q ? suggestions : NEARBY).map((n,i)=>(
              <button key={i} onClick={()=>setSelected(n)}
                className={`w-full flex items-center gap-3 p-4 active:bg-blue-50 transition-colors ${selected===n?'bg-blue-50':''}`}>
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0"><MapPin size={15} className="text-gray-400"/></div>
                <p className="flex-1 text-[13px] font-semibold text-gray-800 text-left">{n}</p>
                {selected===n&&<CheckCircle2 size={16} className="text-brand-500 shrink-0"/>}
              </button>
            ))}
          </div>
        </div>

        <button onClick={()=>setConfirmed(true)} className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[14px] font-bold shadow-lg shadow-blue-200">
          Confirm Location
        </button>
      </div>
    </div>
  )
}
