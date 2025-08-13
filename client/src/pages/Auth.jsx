import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('demo@clearview.local')

  const submit = async (e) => {
    e.preventDefault()
    await signIn(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow w-80">
        <div className="text-lg font-semibold mb-3">Sign in (placeholder)</div>
        <input className="border rounded w-full p-2 text-sm mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="w-full rounded bg-slate-800 text-white py-2 text-sm">Continue</button>
        <div className="text-[11px] text-slate-500 mt-2">No password required in placeholder mode.</div>
      </form>
    </div>
  )
}
