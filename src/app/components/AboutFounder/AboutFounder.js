// src/components/AboutFounder/AboutFounder.js (VOLTANDO AO LAYOUT ORIGINAL, MAS REFINADO)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutFounder.module.css';

gsap.registerPlugin(ScrollTrigger);

const AboutFounder = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);
  const signatureRef = useRef(null);
  const glintRef = useRef(null);
  const lightRaysRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
      tl.from(lightRaysRef.current, { opacity: 0, scale: 0.8, duration: 2, ease: 'power3.out' });
      tl.from(imageWrapperRef.current, { clipPath: 'inset(0 100% 0 0)', duration: 1.5, ease: 'power4.inOut' }, "-=1.5");
      tl.fromTo(glintRef.current, { x: '-200%', skewX: -30 }, { x: '200%', duration: 1.2, ease: 'power1.inOut' }, "-=1.2");
      // Animação de entrada para os elementos na ordem correta
      tl.from(contentRef.current.children, {
        opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      }, "-=1");
    }, sectionRef);
    return () => ctx.revert();
  }, [dictionary]);

  if (!dictionary) return null;

  return (
    <section id="about" className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.backgroundTexture}></div>
      <div className={styles.vignette}></div>
      <div className={styles.lightRays} ref={lightRaysRef}></div>

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper} ref={imageWrapperRef}>
              <img src="/images/Florian.png" alt={dictionary.name} className={styles.image} />
              <div className={styles.glint} ref={glintRef}></div>
            </div>
          </div>
          {/* A div .content agora renderiza os filhos em uma única coluna vertical */}
          <div className={styles.content} ref={contentRef}>
            <p className={styles.tagline}>{dictionary.tagline}</p>
            <h2 className={styles.name}>{dictionary.name}</h2>
            <p className={styles.bio}>{dictionary.bio_intro}</p>
            <div className={styles.highlights}>
              <h4 className={styles.highlightsTitle}>{dictionary.bio_highlights_title}</h4>
              <ul className={styles.highlightsList}>
                {dictionary.bio_highlights.map((item, index) => (
                  <li key={index} className={styles.highlightItem}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className={styles.quote} ref={quoteRef}>
              {dictionary.quote.split('').map((char, index) => (
                <span key={index} className={styles.quoteChar}>{char === ' ' ? '\u00A0' : char}</span>
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