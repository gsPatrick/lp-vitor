// src/components/Audience/Audience.js (COM ANIMAÇÃO DE HOVER 2D)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './Audience.module.css';

gsap.registerPlugin(ScrollTrigger);

const profileIcons = [
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11.18V22h10V11.18"/><path d="M19.26 7.64l-6.07-4.14a2 2 0 00-2.38 0l-6.07 4.14a2 2 0 00-1 1.73l.2 8.43a2 2 0 002 1.94h14.12a2 2 0 002-1.94l.2-8.43a2 2 0 00-1-1.73zM12 2v2.5"/><path d="M9 17h6"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20z"/><path d="M2 12h20"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 110-14h8.5a3.5 3.5 0 110 7H13"/><path d="M15 9l-3 3 3 3"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="14" width="18" height="8" rx="2"/><path d="M3 10V8a2 2 0 012-2h14a2 2 0 012 2v2"/><path d="M8 10V6a2 2 0 012-2h4a2 2 0 012 2v4"/></svg>
];

const Audience = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.from(gridRef.current.children, {
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        opacity: 0, y: 60, stagger: 0.15, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);

    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    
    // ===== ANIMAÇÃO DE HOVER ATUALIZADA PARA 2D =====
    const handleMouseEnter = (e) => {
      const card = e.currentTarget;
      anime.remove(card);
      anime({
        targets: card,
        translateY: -8, // Efeito de elevação
        scale: 1.03,
        duration: 300,
        easing: 'easeOutQuad'
      });
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      anime.remove(card);
      anime({
        targets: card,
        translateY: 0, // Retorna à posição original
        scale: 1,
        duration: 400,
        easing: 'easeOutQuad'
      });
    };
    // ===============================================

    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ctx.revert();
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  if (!dictionary) { return null; }

  let layoutClass = '';
  const cardCount = dictionary.profiles.length;
  if (cardCount === 3) {
    layoutClass = styles.gridLayout3;
  } else if (cardCount === 5) {
    layoutClass = styles.gridLayout5;
  }

  return (
    <section id="audience" className={styles.audienceSection} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{dictionary.title}</h2>
          <p className={styles.subtitle}>{dictionary.subtitle}</p>
        </div>
        <div className={`${styles.grid} ${layoutClass}`} ref={gridRef}>
          {dictionary.profiles.map((profile, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>{profileIcons[index]}</div>
                <h3 className={styles.cardTitle}>{profile.title}</h3>
                <p className={styles.cardDescription}>{profile.description}</p>
              </div>
              <div className={styles.cardShine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;