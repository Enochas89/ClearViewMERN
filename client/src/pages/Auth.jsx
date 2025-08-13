import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('demo@clearview.local')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email)
      navigate('/', { replace: true })   // go to dashboard
    } catch (err) {
      setError('Login failed. Check API URL and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow w-80">
        <div className="text-lg font-semibold mb-3">Sign in (placeholder)</div>
        <input
          className="border rounded w-full p-2 text-sm mb-3"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          className="w-full rounded bg-slate-800 text-white py-2 text-sm disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Continue'}
        </button>
        {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
        <div className="text-[11px] text-slate-500 mt-2">No password required in placeholder mode.</div>
      </form>
    </div>
  )
}
