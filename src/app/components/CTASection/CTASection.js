// src/components/CTASection/CTASection.js
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

  useEffect(() => {
    // É importante que esta lógica rode apenas quando o titleRef estiver preenchido com os spans
    // e o ctaButtonRef estiver disponível.
    if (!titleRef.current || !ctaButtonRef.current) return;
    
    const titleChars = titleRef.current.querySelectorAll('span');
    const subtitle = sectionRef.current.querySelector(`.${styles.subtitle}`);
    const shockwave = ctaButtonRef.current.querySelector(`.${styles.shockwave}`);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(sectionRef.current, {
      '--spotlight-size': '0%',
      duration: 0.8,
      ease: 'power2.inOut',
    });

    if (titleChars.length > 0) {
      tl.from(titleChars, {
        duration: 0.6,
        opacity: 0,
        scale: 0.8,
        filter: 'blur(5px)',
        stagger: {
          each: 0.03,
          from: 'center',
        },
        ease: 'power2.out',
      }, "-=0.5");
    }
    
    tl.from(subtitle, {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out'
    }, "-=0.3");

    tl.from(ctaButtonRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.4)',
    }, "-=0.4");
    
    tl.from(shockwave, {
        scale: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    }, "-=1.0");

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

  }, [dictionary]); // Adiciona dictionary como dependência para re-renderizar quando o idioma mudar

  // Evita renderizar se o dicionário não estiver pronto
  if (!dictionary) {
    return null;
  }
  
  return (
    <section id="cta" className={styles.ctaSection} ref={sectionRef}>
      <div className={styles.vignette}></div>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title} ref={titleRef}>
          {/* O texto do título agora vem do dicionário */}
          {dictionary.title.split('').map((char, index) => (
            <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className={styles.subtitle}>
          {dictionary.subtitle}
        </p>
        <a
          href="#contact" // Link pode ser ajustado se necessário
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