// src/components/CTASection/CTASection.js (VERSÃO COM ANIMAÇÃO ACELERADA)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './CTASection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    const titleChars = titleRef.current.querySelectorAll('span');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%', // Inicia um pouco mais cedo
        toggleActions: 'play none none reverse',
      },
    });

    // 1. Animação de entrada do fundo (mais rápida)
    tl.from(sectionRef.current, {
      '--spotlight-size': '0%',
      duration: 0.8, // DURAÇÃO AJUSTADA
      ease: 'power2.inOut',
    });

    // 2. Animação de construção do título (mais rápida)
    tl.from(titleChars, {
      duration: 0.6, // DURAÇÃO AJUSTADA
      opacity: 0,
      scale: 0.8,
      filter: 'blur(5px)',
      stagger: {
        each: 0.03, // DURAÇÃO AJUSTADA
        from: 'center',
      },
      ease: 'power2.out',
    }, "-=0.5");
    
    // 3. Animação do subtítulo (mais rápida)
    tl.from(`.${styles.subtitle}`, {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' // DURAÇÃO AJUSTADA
    }, "-=0.3");

    // 4. Animação de aterrissagem do botão (mais impactante)
    tl.from(ctaButtonRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 1.2, // Mantém a duração elástica para impacto
      ease: 'elastic.out(1, 0.4)', // Elasticidade ajustada
    }, "-=0.4");
    
    // 5. Animação da "onda de choque" (mais rápida)
    tl.from(ctaButtonRef.current.querySelector(`.${styles.shockwave}`), {
        scale: 0,
        opacity: 1,
        duration: 0.5, // DURAÇÃO AJUSTADA
        ease: 'power2.out'
    }, "-=1.0"); // Acontece mais próximo da aterrissagem do botão

    // Efeito de hover no botão com Anime.js (sem alterações)
    const button = ctaButtonRef.current;
    if (button) {
        const mouseEnterHandler = () => {
          anime({ targets: button, scale: 1.05, duration: 200, easing: 'easeOutQuad' });
        };
        const mouseLeaveHandler = () => {
          anime({ targets: button, scale: 1.0, duration: 400, easing: 'easeOutElastic(1, 0.6)' });
        };
        button.addEventListener('mouseenter', mouseEnterHandler);
        button.addEventListener('mouseleave', mouseLeaveHandler);
        
        return () => {
            button.removeEventListener('mouseenter', mouseEnterHandler);
            button.removeEventListener('mouseleave', mouseLeaveHandler);
        }
    }

  }, []);

  const titleText = "Your Journey to Financial Clarity Begins Now.";
  
  return (
    <section id="cta" className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.vignette}></div>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title} ref={titleRef}>
          {titleText.split('').map((char, index) => (
            <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className={styles.subtitle}>
          Stop guessing, start building. Let's craft the financial framework your ambition deserves.
        </p>
        <a
          href="https://wa.me/15551234567"
          target="_blank"
          className={styles.ctaButton}
          ref={ctaButtonRef}
        >
          Schedule Your Strategic Consultation
          <div className={styles.shockwave}></div>
        </a>
      </div>
    </section>
  );
};

export default CTASection;