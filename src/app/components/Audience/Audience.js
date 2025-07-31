// src/components/Audience/Audience.js (VERSÃO COM INTERAÇÃO INVERTIDA)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './Audience.module.css';

gsap.registerPlugin(ScrollTrigger);

const audienceProfiles = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11.18V22h10V11.18"/><path d="M19.26 7.64l-6.07-4.14a2 2 0 00-2.38 0l-6.07 4.14a2 2 0 00-1 1.73l.2 8.43a2 2 0 002 1.94h14.12a2 2 0 002-1.94l.2-8.43a2 2 0 00-1-1.73zM12 2v2.5"/><path d="M9 17h6"/></svg>, title: 'Ambitious Startups', description: 'Targeting rapid, sustainable scaling and preparing for Series A/B funding rounds.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20z"/><path d="M2 12h20"/></svg>, title: 'Global Scale-Ups', description: 'Established SMEs preparing for international expansion, market entry, or cross-border M&A.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 110-14h8.5a3.5 3.5 0 110 7H13"/><path d="M15 9l-3 3 3 3"/></svg>, title: 'Tech Companies', description: 'SaaS, FinTech, and Deep Tech firms seeking strategic financial leadership to fuel innovation.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>, title: 'Complex Operations', description: 'Businesses with sophisticated supply chains or multi-entity structures requiring expert oversight.' },
];

const Audience = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.from(gridRef.current.children, {
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        opacity: 0,
        y: 60,
        // Remove a rotação inicial do GSAP, pois o CSS cuidará disso
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    
    const handleMouseEnter = (e) => {
      const card = e.currentTarget;
      anime.remove(card); // Remove animações em andamento no mesmo elemento
      anime({
        targets: card,
        // ANIMAÇÃO PARA O ESTADO RETO (2D)
        rotateX: 0,
        rotateY: 0,
        scale: 1.05,
        duration: 400,
        easing: 'easeOutQuad'
      });
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      anime.remove(card);
      anime({
        targets: card,
        // ANIMAÇÃO DE VOLTA PARA O ESTADO INCLINADO (3D)
        rotateX: -10,
        rotateY: 10,
        scale: 1,
        duration: 600,
        easing: 'easeOutElastic(1, .6)'
      });
    };

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

  return (
    <section id="audience" className={styles.audienceSection} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Designed for Visionaries</h2>
          <p className={styles.subtitle}>We thrive when partnering with leaders who are building the future.</p>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {audienceProfiles.map((profile, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>{profile.icon}</div>
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