// src/components/Testimonials/Testimonials.js (VERSÃO EM GRADE, SEM IMAGENS)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const StarRating = () => (
  <div className={styles.starRating}>
    {'★★★★★'.split('').map((star, index) => <span key={index}>{star}</span>)}
  </div>
);

const Testimonials = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação para o título
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Animação para os cards da grade
      if (gridRef.current) {
        const cards = gsap.utils.toArray(gridRef.current.children);
        gsap.from(cards, {
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
          opacity: 0,
          y: 50,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!dictionary || !dictionary.items || dictionary.items.length === 0) {
    return null; // Não renderiza o componente se não houver dados
  }

  return (
    <section id="testimonials" className={styles.testimonialsSection} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>{dictionary.title}</h2>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {dictionary.items.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <StarRating />
                <svg className={styles.quoteIcon} width="24" height="24" viewBox="0 0 24 24"><path d="M6,17H18V19H6V17M13,5A3,3 0 0,1 16,8C16,9.13 15.39,10.09 14.5,10.63L13,12H11V8.81C11.88,8.28 12.5,7.23 12.5,6C12.5,5.56 12.63,5.16 12.86,4.81L13,5M8,5A3,3 0 0,1 11,8C11,9.13 10.39,10.09 9.5,10.63L8,12H6V8.81C6.88,8.28 7.5,7.23 7.5,6C7.5,5.56 7.63,5.16 7.86,4.81L8,5Z" fill="currentColor"/></svg>
              </div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.author}>
                <span className={styles.authorName}>{testimonial.name}</span>
                <span className={styles.authorTitle}>{testimonial.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;