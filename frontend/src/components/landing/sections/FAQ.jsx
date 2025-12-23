import React, { useState, useEffect, useRef } from 'react';
import { revealUp } from '../gsapHelpers';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRef = useRef(null);

  useEffect(() => {
    if (faqRef.current) {
      revealUp(faqRef.current.children, { stagger: 0.1 });
    }
  }, []);

  const faqs = [
    {
      question: "What's included in the ₹499 offer?",
      answer: "Lifetime access to 639 premium dance steps (all levels), Tamil video training, real-time song practice, and dedicated WhatsApp support."
    },
    {
      question: "Is it really a one-time payment?",
      answer: "Yes, once you pay ₹499, you get lifetime access with no monthly subscriptions or hidden charges. Learn at your own pace forever."
    },
    {
      question: "Are the videos in Tamil?",
      answer: "Absolutely. All training instructions and step breakdowns are provided in clear Tamil, designed specifically for our Tamil-speaking community."
    },
    {
      question: "Can beginners join this program?",
      answer: "Definitely! We have 194 dedicated 'Easy' steps to help beginners build a strong foundation before moving to intermediate and advanced levels."
    },
    {
      question: "How do I access the content?",
      answer: "Immediately after payment, you'll receive login credentials via email to access your personalized dashboard containing all 639 steps."
    },
    {
      question: "What if I need help during training?",
      answer: "We provide priority WhatsApp support. Our expert team is always ready to assist you with any technical or dance-related queries."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-spacing" id="faq">
      <div className="container-custom">
        <h2 className="section-title gsap-reveal">Got Questions?</h2>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div ref={faqRef}>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item gsap-reveal">
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'} small opacity-50`}></i>
                  </div>

                  {activeIndex === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;