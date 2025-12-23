import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
import { useAuth } from '../utils/auth-context'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    try {
      const data = await login(form)
      setUser(data.user)
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('next') || '/dashboard'
      navigate(redirect)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="auth-page">
      <div className="container auth-container">
        <form className="glass-form auth-card" onSubmit={onSubmit}>
          <h2>Login</h2>
          <p className="section-sub">Access your AS DANCE premium bundle</p>
          {error && <p className="error-text">{error}</p>}
          <label>
            <span>Email</span>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
          </label>
          <button className="btn btn-cta" data-magnetic type="submit">Login</button>
          <p className="auth-meta">New here? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </main>
  )
}

