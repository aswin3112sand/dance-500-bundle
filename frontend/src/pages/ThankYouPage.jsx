import { NavLink } from 'react-router-dom'

export default function ThankYouPage() {
  return (
    <main className="thankyou">
      <div className="container">
        <div className="glass-card thankyou-card">
          <h2>Payment success</h2>
          <p className="section-sub">Your bundle is unlocked. Start practicing now.</p>
          <NavLink className="btn btn-cta" data-magnetic to="/dashboard">Go to dashboard</NavLink>
        </div>
      </div>
    </main>
  )
}
