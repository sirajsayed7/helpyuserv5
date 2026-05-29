import { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar, HelpyLogo } from '../components/shared'

const CORRECT = '123456'

export default function VerifyPage() {
  const { goBack, login } = useNav()
  const [digits, setDigits] = useState(['','','','','',''])
  const [error, setError] = useState(false)
  const [timer, setTimer] = useState(20)
  const refs = useRef<(HTMLInputElement|null)[]>([])

  useEffect(() => {
    const t = setInterval(() => setTimer(v => v > 0 ? v-1 : 0), 1000)
    return () => clearInterval(t)
  }, [])

  const handleDigit = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const d = [...digits]
    d[i] = val.slice(-1)
    setDigits(d)
    setError(false)
    if (val && i < 5) refs.current[i+1]?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i-1]?.focus()
  }

  const verify = () => {
    if (digits.join('') === CORRECT) login()
    else setError(true)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative" style={{background:'#EEF4FF'}}>
      <StatusBar/>
      {/* Doha skyline decorative bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{zIndex:0}}>
        <svg viewBox="0 0 430 280" className="w-full opacity-10">
          <rect x="50" y="160" width="18" height="120" fill="#2563EB"/>
          <rect x="75" y="130" width="22" height="150" fill="#2563EB"/>
          <rect x="105" y="100" width="28" height="180" fill="#1D4ED8"/>
          <rect x="140" y="140" width="20" height="140" fill="#2563EB"/>
          <rect x="170" y="80" width="35" height="200" fill="#1E40AF"/>
          <rect x="212" y="60" width="25" height="220" fill="#1D4ED8"/>
          <rect x="245" y="90" width="30" height="190" fill="#2563EB"/>
          <rect x="283" y="120" width="22" height="160" fill="#1D4ED8"/>
          <rect x="313" y="100" width="40" height="180" fill="#1E40AF"/>
          <rect x="361" y="150" width="20" height="130" fill="#2563EB"/>
        </svg>
        {/* Watermark logo */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-5">
          <svg width="200" height="140" viewBox="0 0 72 50" fill="none">
            <path d="M10 35 C15 15, 35 5, 36 25 C37 5, 57 15, 62 35 C55 45, 45 50, 36 48 C27 50, 17 45, 10 35Z" fill="#2563EB"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8 relative" style={{zIndex:1}}>
        <div className="flex items-center justify-between pt-2 pb-6">
          <button onClick={goBack} className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-600"/>
          </button>
          <HelpyLogo size="sm"/>
        </div>

        <h1 className="text-[28px] font-bold text-gray-900 mb-3">Verify Code</h1>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
          We've sent a verification code to{' '}
          <span className="text-brand-500 font-semibold">your@email.com</span>{' '}
          please enter the code to proceed.
        </p>

        {/* OTP boxes */}
        <div className="flex gap-3 justify-center mb-8">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              type="text" inputMode="numeric"
              maxLength={1} value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              className={`w-12 h-14 rounded-2xl text-center text-[22px] font-bold outline-none transition-all
                ${d ? 'bg-white text-brand-500 shadow-md border-2 border-brand-500'
                    : error ? 'bg-red-50 border-2 border-red-400'
                    : 'bg-white shadow-sm border-2 border-transparent text-gray-800'}`}
            />
          ))}
        </div>

        {error && <p className="text-center text-red-500 text-[13px] font-semibold mb-4">Incorrect code. Try: 123456</p>}

        <button onClick={verify}
          className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[15px] font-bold shadow-lg shadow-blue-200 mb-6">
          Continue
        </button>

        <div className="text-center">
          <p className="text-[13px] text-gray-500">Didn't get a code?</p>
          {timer > 0
            ? <p className="text-[13px] font-semibold mt-1"><span className="text-brand-500">Resend OTP</span> <span className="text-gray-500">00:{timer.toString().padStart(2,'0')}</span></p>
            : <button onClick={()=>setTimer(30)} className="text-[13px] font-bold text-brand-500 mt-1">Resend OTP</button>
          }
        </div>
      </div>
    </div>
  )
}
