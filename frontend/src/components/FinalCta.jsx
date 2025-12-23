export default function FinalCta({ onBuyClick }) {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-cta-card">
          <h2 className="final-cta-title">Unlock all steps today - &#8377;499</h2>
          <p className="final-cta-sub">Lifetime access, instant unlock, and a premium studio-grade learning flow.</p>
          <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Get now</button>
        </div>
      </div>
    </section>
  )
}
