// src/components/Hero/Hero.js (ATUALIZADO COM ÍCONES SOCIAIS)
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

// Ícones copiados do componente Footer para consistência
const SocialIcons = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  )
};

const Hero = ({ dictionary, lang }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const scrollArrowRef = useRef(null);
  const socialLinksRef = useRef(null); // Ref para os links sociais

  if (!dictionary) {
    return null;
  }

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.5 }
    });
    
    timeline.fromTo(headlineRef.current.children, {
      y: '120%', skewY: 7, opacity: 0,
    }, {
      y: '0%', skewY: 0, opacity: 1, stagger: 0.2
    });

    timeline.fromTo(subheadlineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1.0"
    );

    timeline.fromTo(ctaButtonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'elastic.out(1, 0.75)' },
      "-=0.8"
    );

    // Animação para os links sociais
    timeline.fromTo(socialLinksRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.6"
    );

    timeline.fromTo(scrollArrowRef.current,
      { y: -20, opacity: 0},
      { y: 0, opacity: 1},
      "-=0.5"
    );

    gsap.to(contentRef.current, {
      yPercent: -40, opacity: 0, ease: 'power2.inOut',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1, },
    });
    
    const button = ctaButtonRef.current;
    if (button) {
      const handleMouseEnter = () => { anime({ targets: button, scale: 1.05, duration: 300, easing: 'easeOutQuad' }); };
      const handleMouseLeave = () => { anime({ targets: button, scale: 1, duration: 300, easing: 'easeOutQuad' }); };
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section id="hero" className={styles.heroSection} ref={heroRef}>
      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline src="/videos/hero-background.mp4" />
      </div>
      <div className={styles.overlay}></div>

      <div className={styles.heroContent} ref={contentRef}>
        <h1 
          className={`${styles.headline} ${lang === 'en' ? styles.headline_en : ''} ${lang === 'de' ? styles.headline_de : ''}`} 
          ref={headlineRef}
        >
          <span className={`${styles.lineWrapper} ${styles.headline_line1}`}>
            <span>{dictionary.headline_line1}</span>
          </span>
          <span className={`${styles.lineWrapper} ${styles.headline_line2}`}>
            <span>{dictionary.headline_line2}</span>
          </span>
        </h1>
        <p className={styles.subheadline} ref={subheadlineRef}>
          {dictionary.subheadline}
        </p>
        <a
          href="#assessment-form"
          className={styles.ctaButton}
          ref={ctaButtonRef}
        >
          {dictionary.cta_button}
        </a>
        
        {/* ===== MUDANÇA: Adição dos links sociais ===== */}
        <div className={styles.socialLinks} ref={socialLinksRef}>
          <a href="https://www.linkedin.com/in/florianpass/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{SocialIcons.linkedin}</a>
          <a href="https://www.instagram.com/meetkeystone/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">{SocialIcons.instagram}</a>
        </div>
        {/* =============================================== */}
      </div>

      <a href="#pain-points" className={styles.scrollDownArrow} ref={scrollArrowRef} aria-label="Scroll down">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 13 12 18 17 13"></polyline>
          <polyline points="7 6 12 11 17 6"></polyline>
        </svg>
      </a>
    </section>
  );
};

export default Hero;