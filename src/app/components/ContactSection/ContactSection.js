// src/components/ContactSection/ContactSection.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// Os ícones e links são mantidos estáticos, pois não mudam com o idioma.
const staticChannelData = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
    link: 'mailto:contact@financify.com', // O link de email pode ser ajustado se necessário
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
    link: 'https://cal.com/link-para-agendamento', // Substituir pelo link real
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    link: 'https://www.linkedin.com', // Substituir pelo link real
  },
];

const ContactSection = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // As animações permanecem exatamente as mesmas
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    cards.forEach(card => {
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            anime({
                targets: card,
                rotateX: (y - centerY) / 15,
                rotateY: (centerX - x) / 15,
                scale: 1.03,
                duration: 200, easing: 'easeOutQuad'
            });
        };
        const handleMouseLeave = () => {
            anime({
                targets: card,
                rotateX: 0, rotateY: 0, scale: 1,
                duration: 500, easing: 'easeOutElastic(1, .5)'
            });
        };
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    });

    return () => ctx.revert();
  }, []);

  // Proteção para caso o dicionário não seja carregado a tempo
  if (!dictionary || !dictionary.channels) {
    return null;
  }

  // Combina os dados de texto do dicionário com os dados estáticos (ícones, links)
  const contactChannels = dictionary.channels.map((channel, index) => ({
    ...channel, // title, contact
    ...staticChannelData[index] // icon, link
  }));

  return (
    <section id="contact" className={styles.contactSection} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{dictionary.title}</h2>
          <p className={styles.subtitle}>
            {dictionary.subtitle}
          </p>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {contactChannels.map((channel, index) => (
            <a href={channel.link} key={index} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.iconWrapper}>{channel.icon}</div>
                <h3 className={styles.cardTitle}>{channel.title}</h3>
                <p className={styles.cardContact}>{channel.contact}</p>
                <span className={styles.cardArrow}>{dictionary.arrow}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;