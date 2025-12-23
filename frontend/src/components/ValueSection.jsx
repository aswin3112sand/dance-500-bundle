const pricingCards = [
  {
    title: '30 Seconds Routine',
    price: 600,
    meta: 'Ideal for reels and shorts',
    desc: 'Short, crisp routines with clear counts and structure.'
  },
  {
    title: '1 Minute Routine',
    price: 1200,
    meta: 'Stage and performance ready',
    desc: 'Full-length choreography with transitions and polish.'
  },
  {
    title: 'Easy Level',
    price: 300,
    meta: 'Beginner friendly',
    desc: 'Simple steps designed to build confidence fast.'
  },
  {
    title: 'Medium and Hard',
    priceMin: 400,
    priceMax: 500,
    meta: 'Advanced coordination',
    desc: 'Higher difficulty, layered moves, and pro-grade timing.'
  }
]

export default function ValueSection({ onBuyClick }) {
  const renderPrice = (card) => {
    if (card.priceMin && card.priceMax) {
      return (
        <span>
          &#8377;{card.priceMin} - &#8377;{card.priceMax}
        </span>
      )
    }
    return <span>&#8377;{card.price}</span>
  }

  const scrollToPreview = () => {
    const target = document.getElementById('preview')
    if (!target) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="pricing">
      <div className="container">
        <p className="section-kicker">SERVICE VALUE</p>
        <h2>Real-world pricing, simplified</h2>
        <p className="section-sub">
          Understand what custom routines cost so the bundle value feels clear, calm, and transparent.
        </p>
        <div className="pricing-grid">
          {pricingCards.map((card) => (
            <article className="glass-card pricing-card" key={card.title}>
              <h3>{card.title}</h3>
              <div className="pricing-price">{renderPrice(card)}</div>
              <div className="pricing-meta">{card.meta}</div>
              <p className="pricing-desc">{card.desc}</p>
            </article>
          ))}
        </div>
        <div className="pricing-summary">
          <p>
            The bundle replaces multiple custom routines and saves a significant amount over time.
          </p>
          <p className="pricing-highlight">Unlock all steps for &#8377;499. Lifetime access.</p>
          <div className="pricing-actions">
            <button className="btn btn-cta" data-magnetic type="button" onClick={onBuyClick}>Get now</button>
            <button className="btn btn-ghost" data-magnetic type="button" onClick={scrollToPreview}>Preview steps</button>
          </div>
        </div>
      </div>
    </section>
  )
}
