'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AhkSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const AhkSection = ({ dictionary, lang }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // ANIMAÇÃO DE IMPACTO
    const ctx = gsap.context(() => {
      const pedestals = gsap.utils.toArray(`.${styles.sealPedestal}`);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%', // Inicia a animação um pouco mais tarde para mais impacto
        },
      });

      // 1. Animação do título e texto
      tl.from([titleRef.current, textRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      // 2. Animação dos pedestais surgindo com escala e desfoque
      if (pedestals.length > 0) {
        tl.from(pedestals, {
          opacity: 0,
          scale: 0.85,
          filter: 'blur(15px)',
          y: 50,
          duration: 1,
          stagger: 0.2, // Garante que se houver dois, eles animem em sequência
          ease: 'power4.out',
        }, "-=0.5"); // Sobrepõe um pouco à animação do texto
      }

    }, sectionRef);
    return () => ctx.revert();
  }, [lang]); // Adicionado 'lang' ao array de dependência para re-acionar a animação se o idioma mudar

  if (!dictionary) {
    return null;
  }

  return (
    <section id="ahk" className={styles.ahkSection} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title} ref={titleRef}>{dictionary.title}</h2>
        <p className={styles.text} ref={textRef}>{dictionary.text}</p>
        
        <div className={styles.sealsContainer}>
          {/* A lógica condicional de exibição permanece a mesma */}
          {(lang === 'de' || lang === 'en') && (
            <div className={styles.sealPedestal}>
              <img 
                src="/images/ahk-logo.png" 
                alt={dictionary.seal1_alt} 
                className={styles.sealImage} 
              />
            </div>
          )}

          {lang === 'pt' && (
            <div className={styles.sealPedestal}>
              <img 
                src="/images/ahk-logo-2.png" 
                alt={dictionary.seal2_alt} 
                className={styles.sealImage} 
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AhkSection;