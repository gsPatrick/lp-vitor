// src/components/AboutFounder/AboutFounder.js (VERSÃO MULTILÍNGUE)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutFounder.module.css';

gsap.registerPlugin(ScrollTrigger);

const AboutFounder = ({ dictionary }) => { // Recebe o dicionário como prop
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);
  const signatureRef = useRef(null);
  const glintRef = useRef(null);
  const lightRaysRef = useRef(null);

  // A variável quoteText foi removida, usaremos dictionary.quote diretamente

  useEffect(() => {
    // Adiciona uma verificação para não executar a animação se os refs não estiverem prontos
    if (!sectionRef.current || !quoteRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Animação dos raios de luz de fundo
      tl.from(lightRaysRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: 'power3.out',
      });

      // 2. Revelação da imagem com máscara
      tl.from(imageWrapperRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
      }, "-=1.5");

      // 3. Animação do brilho na imagem
      tl.fromTo(glintRef.current, {
        x: '-200%',
        skewX: -30
      }, {
        x: '200%',
        duration: 1.2,
        ease: 'power1.inOut'
      }, "-=1.2");

      // 4. Revelação do texto com mais drama
      tl.from(contentRef.current.querySelectorAll(`.${styles.tagline}, .${styles.name}, .${styles.bio}`), {
        opacity: 0,
        y: 50,
        stagger: 0.25,
        duration: 1,
        ease: 'power3.out',
      }, "-=1");

      // 5. Animação da citação
      // Garante que a animação tenha os elementos para animar
      if (quoteRef.current.querySelectorAll('span').length > 0) {
        tl.from(quoteRef.current.querySelectorAll('span'), {
          opacity: 0,
          y: 20,
          stagger: { amount: 1.5, from: 'start' },
          ease: 'power2.out',
        }, "-=0.5");
      }

      // 6. Animação da assinatura
      tl.from(signatureRef.current.querySelectorAll('path'), {
        strokeDashoffset: (i, el) => el.getTotalLength(),
        strokeDasharray: (i, el) => el.getTotalLength(),
        duration: 1.5,
        ease: 'power2.inOut',
      }, "-=1.5");

    }, sectionRef);
    return () => ctx.revert();
  }, [dictionary]); // Adiciona dictionary como dependência para re-renderizar se o idioma mudar

  // Evita renderizar o componente se o dicionário não estiver pronto
  if (!dictionary) {
    return null;
  }

  return (
    <section id="about" className={styles.aboutSection} ref={sectionRef}>
      {/* Elementos de design de fundo (inalterados) */}
      <div className={styles.backgroundTexture}></div>
      <div className={styles.vignette}></div>
      <div className={styles.lightRays} ref={lightRaysRef}></div>
      <div className={styles.particles}></div>

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper} ref={imageWrapperRef}>
              <img src="/images/Florian.png" alt={dictionary.name} className={styles.image} />
              <div className={styles.glint} ref={glintRef}></div>
            </div>
          </div>
          <div className={styles.content} ref={contentRef}>
            <p className={styles.tagline}>{dictionary.tagline}</p>
            <h2 className={styles.name}>{dictionary.name}</h2>
            <p className={styles.bio}>
              {dictionary.bio}
            </p>
            <blockquote className={styles.quote} ref={quoteRef}>
              {/* O texto da citação agora vem do dicionário */}
              {dictionary.quote.split('').map((char, index) => (
                <span key={index} className={styles.quoteChar}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </blockquote>
            <div className={styles.signature} ref={signatureRef}>
              <svg width="150" height="50" viewBox="0 0 200 60">
                <path d="M10 40 C 20 20, 40 20, 50 40 C 60 60, 70 60, 80 40 S 100 20, 110 40 C 120 60, 130 60, 140 40" stroke="white" fill="transparent" strokeWidth="2" />
                <path d="M145 40 C 150 30, 160 30, 165 40 C 170 50, 180 50, 185 40" stroke="white" fill="transparent" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;