import { Home, ShoppingBag, MessageCircle, User } from 'lucide-react'
import { useNav } from '../context/NavContext'

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? 'text-white' : 'text-gray-800'
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-1 shrink-0">
      <span className={`text-[13px] font-semibold ${c}`}>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          {[0,4.5,9,13.5].map((x,i)=><rect key={x} x={x} y={[5,3,1,0][i]} width="3" height={[7,9,11,12][i]} rx="1" fill={light?"white":"#1e293b"}/>)}
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill={light?"white":"#1e293b"}/>
          <path d="M4.5,7 C5.8,5.7 7,5 8,5 C9,5 10.2,5.7 11.5,7" stroke={light?"white":"#1e293b"} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1.5,4 C3.5,2 5.7,1 8,1 C10.3,1 12.5,2 14.5,4" stroke={light?"white":"#1e293b"} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke={light?"white":"#1e293b"} strokeWidth="1"/>
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill={light?"white":"#1e293b"}/>
          <path d="M22.5,4 L22.5,8" stroke={light?"white":"#1e293b"} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

const TABS = [
  { id:'home',   label:'Home',    Icon: Home },
  { id:'orders', label:'Order',   Icon: ShoppingBag },
  { id:'chat',   label:'Chat',    Icon: MessageCircle, badge: true },
  { id:'profile',label:'Profile', Icon: User },
]

export function BottomNav() {
  const { activeTab, setActiveTab, bookedServices } = useNav()
  const unread = 3
  return (
    <div className="mx-3 mb-3 shrink-0">
      <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 pt-3 pb-4">
        {TABS.map(({ id, label, Icon, badge }) => {
          const active = activeTab === id
          return (
            <button key={id} onClick={() => setActiveTab(id)} className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-brand-500' : ''}`}>
                <Icon size={20} className={active ? 'text-white' : 'text-gray-400'} strokeWidth={active ? 2.4 : 1.8}/>
                {badge && unread > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${active ? 'text-brand-500' : 'text-gray-400'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function HelpyLogo({ size = 'md' }: { size?: 'sm'|'md'|'lg' }) {
  const s = size === 'lg' ? 72 : size === 'md' ? 48 : 32
  const fs = size === 'lg' ? 'text-[22px]' : size === 'md' ? 'text-[15px]' : 'text-[10px]'
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={s} height={s*0.7} viewBox="0 0 72 50" fill="none">
        <path d="M10 35 C15 15, 35 5, 36 25 C37 5, 57 15, 62 35 C55 45, 45 50, 36 48 C27 50, 17 45, 10 35Z" fill="#1E40AF"/>
        <path d="M20 30 C24 18, 34 12, 36 26 C38 12, 48 18, 52 30 C47 40, 41 44, 36 43 C31 44, 25 40, 20 30Z" fill="#3B82F6"/>
        <path d="M26 28 C28 20, 34 17, 36 25 C38 17, 44 20, 46 28 C43 35, 39 38, 36 37 C33 38, 29 35, 26 28Z" fill="#60A5FA"/>
      </svg>
      <span className={`${fs} font-black tracking-widest text-[#1E3A8A]`}>HELPY</span>
    </div>
  )
}
