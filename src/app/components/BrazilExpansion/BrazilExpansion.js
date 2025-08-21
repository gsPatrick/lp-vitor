// /app/components/BrazilExpansion/BrazilExpansion.js (VERSÃO MINIMALISTA SOFISTICADA)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrazilExpansion.module.css';
import { FiArrowRight } from 'react-icons/fi';
import { FaShieldAlt, FaNetworkWired, FaUserTie, FaGlobeAmericas } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// Qualificações-chave (CV) para o card de destaque
const qualifications = [
  { 
    icon: <FaUserTie size={24} />,
    text: "Representação Legal e Administrativa"
  },
  { 
    icon: <FaGlobeAmericas size={24} />,
    text: "Proficiência cultural e idiomática (Português)"
  },
  { 
    icon: <FaNetworkWired size={24} />,
    text: "Rede estratégica de parceiros locais"
  },
  { 
    icon: <FaShieldAlt size={24} />,
    text: "Expertise em compliance fiscal e regulatório"
  }
];

const BrazilExpansion = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do cabeçalho
      gsap.from(headerRef.current.children, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out'
      });

      // Animação da grade principal (texto e card)
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power3.out'
        });
      }
      
      // Animação sutil das sombras das folhas
      gsap.to(`.${styles.leafShadow}`, {
        x: '+=20',
        y: '+=10',
        rotation: 2,
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!dictionary) return null;

  return (
    <section id="brazil-expansion" className={styles.section} ref={sectionRef}>
      {/* Sombras de folhas para criar a atmosfera */}
      <div className={`${styles.leafShadow} ${styles.leaf1}`}></div>
      <div className={`${styles.leafShadow} ${styles.leaf2}`}></div>

      <div className={`container ${styles.container}`}>
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>{dictionary.title}</h2>
          <p className={styles.subtitle}>{dictionary.subtitle}</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {/* Coluna de texto */}
          <div className={styles.content}>
            <p className={styles.introText}>{dictionary.intro_text}</p>
            <ul className={styles.servicesList}>
              {dictionary.services_list.map((item, index) => (
                <li key={index}><span>{item}</span></li>
              ))}
            </ul>
            <p className={styles.punchline}>{dictionary.punchline}</p>
            <a href="#contact" className={styles.ctaLink}>
              {dictionary.cta_text}
              <FiArrowRight />
            </a>
          </div>

          {/* Coluna do card de qualificações */}
          <div className={styles.qualCard}>
            <div className={styles.qualCardGlow}></div>
            <h3 className={styles.qualCardTitle}>Expertise Local Comprovada</h3>
            <ul className={styles.qualsList}>
              {qualifications.map((qual, index) => (
                <li key={index} className={styles.qualItem}>
                  <div className={styles.qualIcon}>{qual.icon}</div>
                  <span>{qual.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrazilExpansion;