// src/components/Advantage/Advantage.js (VERSÃO FINAL COM MULTILÍNGUE)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Advantage.module.css';

gsap.registerPlugin(ScrollTrigger);

const Advantage = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          toggleActions: 'play none none none',
        },
      });

      // Animação da imagem
      tl.from(imageWrapperRef.current, {
        scale: 1.1,
        filter: 'blur(10px)',
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });
      
      // Animação da moldura da imagem (linhas)
      tl.from(frameRef.current.children, {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.8");

      // Animação do texto
      tl.from(titleRef.current.querySelectorAll('span>span'), {
        y: '110%',
        skewY: 5,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      }, "-=1.2") // Sobrepõe para começar junto com a imagem
      .from(contentRef.current.querySelectorAll(`.${styles.text}, .${styles.benefitItem}`), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Previne erro caso o dicionário não seja carregado a tempo
  if (!dictionary) return null;

  return (
    // O container da seção agora só serve de âncora posicional
    <section id="advantage" className={styles.advantageSectionWrapper}>
      {/* NOVO: Divisor Curvo para a transição */}
      <div className={styles.curvedDivider}></div>
      
      <div className={styles.advantageSection} ref={sectionRef}>
        {/* NOVO: Forma geométrica de fundo */}
        <div className={styles.backgroundShape}></div>

        <div className={`container ${styles.container}`}>
          <div className={styles.grid}>
            <div className={styles.content} ref={contentRef}>
              <h2 className={styles.title} ref={titleRef}>
                <span className={styles.lineWrapper}><span>{dictionary.title_line1}</span></span>
                <span className={styles.lineWrapper}><span>{dictionary.title_line2}</span></span>
              </h2>
              <p className={styles.text}>
                {dictionary.text}
              </p>
              <ul className={styles.benefitsList}>
                {dictionary.benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper} ref={imageWrapperRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/advantage-image.jpg" alt="Strategic financial planning meeting" className={styles.image}/>
              </div>
              {/* NOVO: A moldura de design para a imagem */}
              <div className={styles.imageFrame} ref={frameRef}>
                <div className={`${styles.frameLine} ${styles.top}`}></div>
                <div className={`${styles.frameLine} ${styles.bottom}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantage;