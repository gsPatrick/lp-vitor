// src/components/Services/Services.js (VERSÃO FINAL REIMAGINADA)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

// O conteúdo permanece o mesmo
const servicesData = [
    { title: 'Fractional CFO Services', description: 'Get C-level strategic guidance without the full-time executive cost. We integrate with your team to drive financial strategy, planning, and performance.' },
    { title: 'Financial Modeling & Forecasting', description: 'Move beyond guesswork. We build robust, dynamic financial models that provide clear foresight for decision-making, fundraising, and strategic planning.' },
    { title: 'Cash Flow Management', description: 'Cash is king. We optimize your cash conversion cycle, manage liquidity, and implement treasury strategies to ensure your business is resilient and capitalized for growth.' },
    { title: 'M&A and Transaction Advisory', description: 'Navigate the complexities of buying or selling with confidence. We provide expert due diligence, valuation, and integration support to maximize transaction value.' },
];

const Services = () => {
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
      gsap.from(titleRef.current.children, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          opacity: 0, y: 50, stagger: 0.2, duration: 0.8, ease: 'power3.out',
      });
       gsap.from(`.${styles.tabs}, .${styles.contentViewer}`, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
          opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const currentService = servicesData[activeService];

  return (
    <section id="services" className={styles.servicesSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header} ref={titleRef}>
          <h2 className={styles.title}>Our Core Services</h2>
          <p className={styles.subtitle}>A suite of tailored financial services designed to scale with your ambition.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.tabs}>
            <div className={styles.indicator} ref={indicatorRef}></div>
            {servicesData.map((service, index) => (
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
                <h3 ref={contentTitleRef} className={styles.contentTitle}>{currentService.title}</h3>
                <p ref={contentDescRef} className={styles.contentDescription}>{currentService.description}</p>
                <a ref={contentLinkRef} href="#cta" className={styles.contentLink}>Learn More →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;