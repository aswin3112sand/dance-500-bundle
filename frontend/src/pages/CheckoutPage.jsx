import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth-context'

export default function CheckoutPage({ onPay }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const startedRef = useRef(false)

  useEffect(() => {
    if (loading) return
    if (!user) {
      navigate('/login?next=/payment')
      return
    }
    if (startedRef.current) return
    startedRef.current = true
    onPay?.()
  }, [loading, user, navigate, onPay])

  return (
    <main className="checkout">
      <div className="container">
        <div className="glass-card checkout-card">
          <h2>Checkout</h2>
          <p className="section-sub">Secure UPI / Razorpay payment for lifetime access.</p>
          <button className="btn btn-cta" data-magnetic type="button" onClick={onPay}>Pay ₹499 now</button>
        </div>
      </div>
    </main>
  )
}

