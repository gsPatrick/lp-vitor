// src/components/FAQ/FAQ.js (VERSÃO COMPLETA)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.css';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: 'What is a Fractional CFO?',
    answer: 'A Fractional CFO is an experienced chief financial officer who works with businesses on a part-time, "fractional" basis. This provides you with C-level strategic expertise, financial oversight, and data-driven insights without the cost and commitment of a full-time executive salary.',
  },
  {
    question: 'How do you work with international clients?',
    answer: 'Our team is fully remote and operates across multiple time zones. We leverage modern cloud-based accounting and communication tools to provide seamless, real-time collaboration regardless of your location in the US, Brazil, or Europe.',
  },
  {
    question: 'What size of business do you typically work with?',
    answer: 'We specialize in partnering with ambitious companies, from high-growth startups seeking their first round of funding to established SMEs with annual revenues between $5M and $50M who are planning for major growth events.',
  },
  {
    question: 'How is this different from a standard accounting service?',
    answer: 'Standard accounting focuses on historical data—recording transactions and ensuring compliance. We are forward-looking. We use your financial data to build strategic roadmaps, model future scenarios, and provide the insights you need to make proactive, informed decisions.',
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  }, [isOpen]);

  return (
    <div className={styles.faqItem}>
      <div className={styles.questionWrapper} onClick={onToggle}>
        <h3 className={styles.question}>{item.question}</h3>
        <div className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.answerWrapper} ref={contentRef}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de revelação "wipe" dos itens
      const items = listRef.current.children;
      gsap.from(items, {
        '--wipe-height': '0%',
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>Quick answers to common questions. For anything else, we're just a message away.</p>
        </div>
        <div className={styles.faqList} ref={listRef}>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;