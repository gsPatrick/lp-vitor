// src/components/CTASection/CTASection.js (COM CONTROLE DE QUEBRA DE LINHA)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './CTASection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CTASection = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const ctaButtonRef = useRef(null);

  // ===== MUDANÇA ESTRUTURAL: Agrupa o título em frases-chave =====
  // Isso nos dá controle total sobre onde as linhas podem quebrar.
  const titleWords = dictionary.title.split(' ');

  useEffect(() => {
    if (!titleRef.current || !ctaButtonRef.current) return;
    
    const ctx = gsap.context(() => {
      // A animação agora mira nos blocos de palavras, não em caracteres individuais.
      const titleBlocks = titleRef.current.querySelectorAll('span');
      const subtitle = sectionRef.current.querySelector(`.${styles.subtitle}`);
      const shockwave = ctaButtonRef.current.querySelector(`.${styles.shockwave}`);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(sectionRef.current, { '--spotlight-size': '0%', duration: 0.8, ease: 'power2.inOut' });

      // Animação de entrada dos blocos de texto
      if (titleBlocks.length > 0) {
        tl.from(titleBlocks, {
          duration: 0.8,
          opacity: 0,
          y: '50%',
          filter: 'blur(5px)',
          stagger: 0.1, // Anima cada bloco de palavra em sequência
          ease: 'power3.out',
        }, "-=0.5");
      }
      
      tl.from(subtitle, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, "-=0.5");
      tl.from(ctaButtonRef.current, { scale: 0.6, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, "-=0.4");
      tl.from(shockwave, { scale: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, "-=1.0");

    }, sectionRef);
    
    const button = ctaButtonRef.current;
    const mouseEnterHandler = () => anime({ targets: button, scale: 1.05, duration: 200, easing: 'easeOutQuad' });
    const mouseLeaveHandler = () => anime({ targets: button, scale: 1.0, duration: 400, easing: 'easeOutElastic(1, 0.6)' });
    button.addEventListener('mouseenter', mouseEnterHandler);
    button.addEventListener('mouseleave', mouseLeaveHandler);
    
    return () => {
        ctx.revert();
        button.removeEventListener('mouseenter', mouseEnterHandler);
        button.removeEventListener('mouseleave', mouseLeaveHandler);
    }
  }, [dictionary]);

  if (!dictionary) return null;
  
  return (
    <section id="cta" className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.vignette}></div>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title} ref={titleRef}>
          {/* Renderiza cada palavra (ou frase curta) dentro de um span inquebrável */}
          {titleWords.map((word, index) => (
            <span key={index} className={styles.titleWord}>{word}&nbsp;</span>
          ))}
        </h2>
        <p className={styles.subtitle}>
          {dictionary.subtitle}
        </p>
        <a
          href="#assessment-form"
          onClick={(e) => {
              e.preventDefault();
              document.querySelector('#assessment-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={styles.ctaButton}
          ref={ctaButtonRef}
        >
          {dictionary.button}
          <div className={styles.shockwave}></div>
        </a>
      </div>
    </section>
  );
};

export default CTASection;