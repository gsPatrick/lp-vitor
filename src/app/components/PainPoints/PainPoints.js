// src/components/PainPoints/PainPoints.js (VERSÃO COMPLETA E ATUALIZADA)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PainPoints.module.css';

gsap.registerPlugin(ScrollTrigger);

const painPointsData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.1 6.8 9.5"></path><path d="m14.2 14.2 4.6 4.6"></path><path d="M12 8v4h4"></path></svg>
    ),
    title: 'Lack of Financial Clarity',
    description: 'Struggling with complex spreadsheets and unclear reports? You\'re flying blind, making it impossible to see real-time profitability.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18.24-1.39-1.39a2 2 0 0 0-2.82 0l-1.42 1.42a2 2 0 0 1-2.82 0L9.88 15.1a2 2 0 0 1 0-2.82l1.42-1.42a2 2 0 0 0 0-2.82L9.88 6.61a2 2 0 0 0-2.82 0L5.67 8.01a2 2 0 0 0 0 2.82l1.42 1.42a2 2 0 0 1 0 2.82L5.67 16.5a2 2 0 0 1-2.82 0l-1.42-1.42a2 2 0 0 0-2.82 0L1.23 16.5a2 2 0 0 0 0 2.82l1.39 1.39a2 2 0 0 0 2.82 0l1.42-1.42a2 2 0 0 1 2.82 0l1.41 1.41a2 2 0 0 1 2.82 0l1.41-1.41a2 2 0 0 1 2.82 0l1.42 1.42a2 2 0 0 0 2.82 0l1.39-1.39a2 2 0 0 0 0-2.82z"></path><path d="M12 12 8 8"></path></svg>
    ),
    title: 'Inefficient Processes',
    description: 'Are you or your team bogged down by manual financial tasks? This wasted time costs you money and focus on strategic growth.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    ),
    title: 'Decisions Based on Hope',
    description: 'Making critical business decisions without a solid financial forecast is a gamble. Avoid costly mistakes with data-driven insights.',
  },
];

const PainPoints = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do cabeçalho da seção
      gsap.from(titleRef.current.children, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        skewY: 3,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Animação para cada card individualmente
      const cards = gsap.utils.toArray(`.${styles.card}`);
      cards.forEach((card, index) => {
        const cardContent = card.querySelector(`.${styles.cardContent}`);
        const cardElements = card.querySelectorAll(`.${styles.iconWrapper}, .${styles.cardTitle}, .${styles.cardDescription}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.to(card, { '--wipe-width': '100%', duration: 0.6, ease: 'power2.inOut' }) // 1. Wipe ON
          .to(cardContent, { opacity: 1, duration: 0.01 }) // 2. Revela o conteúdo (invisível ainda)
          .to(card, { '--wipe-left': '100%', duration: 0.6, ease: 'power2.inOut' }) // 3. Wipe OFF
          .from(cardElements, { // 4. Anima o conteúdo interno
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: 'power3.out',
          }, "-=0.5"); // O overlap cria uma transição suave
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pain-points" className={styles.painPointsSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header} ref={titleRef}>
          <h2 className={styles.title}>Are You Navigating a Financial Maze?</h2>
          <p className={styles.subtitle}>
            Many ambitious businesses hit the same roadblocks. We turn these common challenges into growth opportunities.
          </p>
        </div>

        <div className={styles.grid}>
          {painPointsData.map((point, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>{point.icon}</div>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDescription}>{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;