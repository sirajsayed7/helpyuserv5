import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar, HelpyLogo } from '../components/shared'

export default function LoginPage() {
  const { navigate } = useNav()
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative" style={{background:'#F0F6FF'}}>
      <StatusBar/>
      {/* Wavy blue blobs top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" style={{height:220,zIndex:0}}>
        <svg viewBox="0 0 430 220" className="w-full absolute top-0">
          <defs>
            <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <ellipse cx="80" cy="60" rx="140" ry="110" fill="url(#lg1)"/>
          <ellipse cx="380" cy="80" rx="110" ry="130" fill="#DBEAFE" fillOpacity="0.5"/>
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8 relative" style={{zIndex:1}}>
        {/* Logo */}
        <div className="flex justify-center pt-8 pb-6">
          <HelpyLogo size="lg"/>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-bold text-gray-900">Welcome back 👋</h1>
          <p className="text-[14px] text-gray-400 mt-1">Sign in to continue and explore<br/>amazing services near you</p>
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-4">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
            <Mail size={18} className="text-gray-400 shrink-0"/>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email or phone number" className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400"/>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
            <Lock size={18} className="text-gray-400 shrink-0"/>
            <input type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400"/>
            <button onClick={()=>setShowPw(v=>!v)}>{showPw?<EyeOff size={18} className="text-gray-400"/>:<Eye size={18} className="text-gray-400"/>}</button>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button className="text-[13px] text-brand-500 font-semibold">Forgot password?</button>
        </div>

        {/* Sign in */}
        <button onClick={()=>navigate('verify')} className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[15px] font-bold shadow-lg shadow-blue-200 active:opacity-90 transition-opacity">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200"/>
          <span className="text-[12px] text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          {[
            {label:'Continue with Google', icon:'G', colors:'text-[#EA4335] bg-[#EA4335]'},
            {label:'Continue with Apple',  icon:'🍎',colors:'text-black bg-black'},
            {label:'Continue with Facebook',icon:'f', colors:'text-[#1877F2] bg-[#1877F2]'},
          ].map(s=>(
            <button key={s.label} onClick={()=>navigate('verify')} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-[14px] font-semibold text-gray-800 active:bg-gray-50">
              <span className={`w-6 h-6 rounded-full ${s.colors.split(' ')[1]} flex items-center justify-center text-white text-[12px] font-black`}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-8">
          <span className="text-[14px] text-gray-500">Don't have an account?</span>
          <button onClick={()=>navigate('verify')} className="text-[14px] font-bold text-brand-500">Sign Up</button>
        </div>
      </div>
    </div>
  )
}
