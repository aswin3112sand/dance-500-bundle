import { useState } from 'react'

const items = [
  {
    question: 'Payment safe?',
    answer: 'Yes. Razorpay handles the payment flow with bank-grade encryption.'
  },
  {
    question: 'After payment unlock time?',
    answer: 'Instant. Your bundle unlocks right after successful payment verification.'
  },
  {
    question: 'Works on mobile?',
    answer: 'Yes. The full bundle works smoothly on mobile, tablet, and desktop.'
  },
  {
    question: 'Lifetime access?',
    answer: 'Yes. One-time payment gives you lifetime access to all steps.'
  },
  {
    question: 'Refund policy',
    answer: 'No refunds once the bundle is unlocked. Please review the previews first.'
  }
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <section className="faq">
      <div className="container">
        <p className="section-kicker">FAQ</p>
        <h2>Questions, answered</h2>
        <p className="section-sub">Everything you need to know before unlocking the bundle.</p>
        <div className="accordion" id="faqAccordion">
          {items.map((item, index) => {
            const isOpen = activeIndex === index
            const collapseId = `faq-collapse-${index}`
            const headingId = `faq-heading-${index}`

            return (
              <div className="accordion-item" key={item.question}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={collapseId}
                    onClick={() => toggle(index)}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}
                  aria-labelledby={headingId}
                >
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
