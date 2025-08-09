// src/components/ContactSection/ContactSection.js (USANDO REACT-ICONS)
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import styles from './ContactSection.module.css';

// 1. IMPORTAR os ícones que vamos usar da biblioteca react-icons
import { MdOutlineEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// 2. SUBSTITUIR o array de SVGs estáticos pelos componentes de ícones importados.
// Adicionamos a prop 'size' para controlar o tamanho e garantir consistência.
const channelIcons = [
  <MdOutlineEmail key="email" size={40} />,
  <BsTelephone key="phone" size={40} />,
  <FaWhatsapp key="whatsapp" size={40} />
];

const ContactSection = ({ dictionary }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // A lógica de animação permanece exatamente a mesma.
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.from(gridRef.current.children, {
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        opacity: 0, y: 50, scale: 0.9, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });
    }, sectionRef);

    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    cards.forEach(card => {
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            anime({ targets: card, rotateX: (y - rect.height / 2) / 15, rotateY: (rect.width / 2 - x) / 15, scale: 1.03, duration: 200, easing: 'easeOutQuad' });
        };
        const handleMouseLeave = () => {
            anime({ targets: card, rotateX: 0, rotateY: 0, scale: 1, duration: 500, easing: 'easeOutElastic(1, .5)' });
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

  if (!dictionary || !dictionary.channels) return null;

  return (
    <section id="contact" className={styles.contactSection} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{dictionary.title}</h2>
          <p className={styles.subtitle}>{dictionary.subtitle}</p>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {dictionary.channels.map((channel, index) => (
            <a href={channel.link} key={index} target="_blank" rel="noopener noreferrer" className={styles.card}>
                {/* O ícone correspondente do novo array será renderizado aqui */}
                <div className={styles.iconWrapper}>{channelIcons[index]}</div>
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