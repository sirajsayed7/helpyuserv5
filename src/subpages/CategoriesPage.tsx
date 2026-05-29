import { useState } from 'react'
import { ArrowLeft, Search, ChevronRight } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const ALL_CATS = [
  {id:'cleaning',   emoji:'🧹', label:'Cleaning Services',         color:'bg-blue-50'},
  {id:'craft',      emoji:'🔨', label:'Craftsmanship',             color:'bg-amber-50'},
  {id:'design',     emoji:'🎨', label:'Design and Branding',       color:'bg-purple-50'},
  {id:'gift',       emoji:'🎁', label:'Gift',                      color:'bg-pink-50'},
  {id:'gov',        emoji:'🏛', label:'Governmental Paper Handler', color:'bg-indigo-50'},
  {id:'hardware',   emoji:'💻', label:'Hardware',                  color:'bg-gray-50'},
  {id:'language',   emoji:'🗣', label:'Language',                  color:'bg-teal-50'},
  {id:'maintenance',emoji:'⚙️', label:'Maintenance',               color:'bg-orange-50'},
  {id:'health',     emoji:'❤️', label:'Personal Health Services',  color:'bg-red-50'},
  {id:'treatment',  emoji:'💊', label:'Treatment',                 color:'bg-rose-50'},
  {id:'tutoring',   emoji:'🎓', label:'Tutoring',                  color:'bg-green-50'},
  {id:'visuals',    emoji:'🎬', label:'Visuals',                   color:'bg-violet-50'},
  {id:'digital',    emoji:'💻', label:'Digital',                   color:'bg-blue-50'},
  {id:'education',  emoji:'📚', label:'Education',                 color:'bg-yellow-50'},
  {id:'car',        emoji:'🚗', label:'Car Services',              color:'bg-sky-50'},
  {id:'home',       emoji:'🔧', label:'Home Services',             color:'bg-emerald-50'},
  {id:'delivery',   emoji:'🚚', label:'Deliveries',                color:'bg-slate-50'},
  {id:'salon',      emoji:'✂️', label:'Salon & Spa',              color:'bg-fuchsia-50'},
  {id:'marketplace',emoji:'🛒', label:'Marketplace',               color:'bg-lime-50'},
]

const FILTER_TABS = ['All','Digital','Education','Health Care']

export default function CategoriesPage() {
  const { navigate, goBack } = useNav()
  const [ft, setFt] = useState('All')
  const [q, setQ] = useState('')
  const filtered = ALL_CATS.filter(c =>
    c.label.toLowerCase().includes(q.toLowerCase()) &&
    (ft === 'All' || (ft === 'Digital' && ['digital','hardware','visuals'].includes(c.id)) ||
     (ft === 'Education' && ['education','tutoring','language'].includes(c.id)) ||
     (ft === 'Health Care' && ['health','treatment'].includes(c.id)))
  )

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-1 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-bold text-gray-900">Categories</h1>
          <span className="text-[20px]">✦</span><span className="text-purple-400 text-[16px]">✦</span>
        </div>
      </div>
      {/* Search */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
          <Search size={16} className="text-gray-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search categories..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
        </div>
      </div>
      {/* Filter pills */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto">
        {FILTER_TABS.map(t=>(
          <button key={t} onClick={()=>setFt(t)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${ft===t?'bg-brand-500 text-white shadow-sm':'bg-white text-gray-600 shadow-sm'}`}>
            {t}
          </button>
        ))}
      </div>
      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {filtered.map(c=>(
            <button key={c.id} onClick={()=>navigate('category-services',{id:c.id,label:c.label,emoji:c.emoji})}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-start gap-3 active:scale-95 transition-transform text-left">
              <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center`}>
                <span className="text-3xl">{c.emoji}</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[12px] font-semibold text-gray-800 leading-tight flex-1">{c.label}</p>
                <ChevronRight size={12} className="text-gray-400 shrink-0"/>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
