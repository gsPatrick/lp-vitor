// src/components/Services/Services.js (VERSÃO FINAL REIMAGINADA E MULTILÍNGUE)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

// REMOVIDO: O array servicesData não é mais necessário aqui.
// Os dados agora virão do 'dictionary'.

const Services = ({ dictionary }) => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentViewerRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabsRef = useRef([]);
  // Refs para os elementos de conteúdo que serão animados
  const contentTitleRef = useRef(null);
  const contentDescRef = useRef(null);
  const contentLinkRef = useRef(null);

  // Se o dicionário não estiver carregado, evita renderizar com erro.
  if (!dictionary || !dictionary.tabs) {
    return null;
  }

  const handleTabClick = (index) => {
    if (index === activeService || gsap.isTweening(contentViewerRef.current)) return;

    const contentElements = [contentTitleRef.current, contentDescRef.current, contentLinkRef.current];
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveService(index);
      }
    });
    
    // Animação de Saída "Blur & Fade"
    tl.to(contentElements, {
      opacity: 0,
      filter: 'blur(5px)',
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
    });
  };

  useEffect(() => {
    // Animação de Entrada
    const contentElements = [contentTitleRef.current, contentDescRef.current, contentLinkRef.current];
    
    gsap.fromTo(contentElements, 
      { opacity: 0, y: 20, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.1, // Atraso para garantir que o estado do React foi atualizado
      }
    );
  }, [activeService]);

  useEffect(() => {
    // Animação da barra indicadora
    const activeTab = tabsRef.current[activeService];
    if (activeTab) {
      gsap.to(indicatorRef.current, {
        top: activeTab.offsetTop,
        height: activeTab.offsetHeight,
        duration: 0.5,
        ease: 'elastic.out(1, 0.75)',
      });
    }
  }, [activeService]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada do título (sem alterações na lógica)
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
            opacity: 0, y: 50, stagger: 0.2, duration: 0.8, ease: 'power3.out',
        });
      }
      // Animação de entrada dos blocos de conteúdo (sem alterações na lógica)
       gsap.from(`.${styles.tabs}, .${styles.contentViewer}`, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Seleciona o serviço atual a partir do dicionário
  const currentService = dictionary.tabs[activeService];

  return (
    <section id="services" className={styles.servicesSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header} ref={titleRef}>
          {/* Título e subtítulo agora vêm do dicionário */}
          <h2 className={styles.title}>{dictionary.title}</h2>
          <p className={styles.subtitle}>{dictionary.subtitle}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.tabs}>
            <div className={styles.indicator} ref={indicatorRef}></div>
            {/* Mapeia os serviços a partir do dicionário */}
            {dictionary.tabs.map((service, index) => (
              <div
                key={index}
                ref={(el) => (tabsRef.current[index] = el)}
                className={`${styles.tabItem} ${activeService === index ? styles.active : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <span className={styles.tabNumber}>{`0${index + 1}`}</span>
                <h3 className={styles.tabTitle}>{service.title}</h3>
              </div>
            ))}
          </div>
          <div className={styles.contentViewer} ref={contentViewerRef}>
            <div className={styles.contentWrapper}>
                {/* O conteúdo do visualizador é preenchido com o serviço ativo do dicionário */}
                <h3 ref={contentTitleRef} className={styles.contentTitle}>{currentService.title}</h3>
                <p ref={contentDescRef} className={styles.contentDescription}>{currentService.description}</p>
                <a ref={contentLinkRef} href="#cta" className={styles.contentLink}>{dictionary.link}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;