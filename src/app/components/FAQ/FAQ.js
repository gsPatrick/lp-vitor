// src/components/FAQ/FAQ.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FAQ.module.css';

gsap.registerPlugin(ScrollTrigger);

// O componente filho 'FAQItem' não precisa saber sobre o dicionário.
// Ele apenas renderiza os dados que recebe (item, isOpen, onToggle).
// Nenhuma alteração é necessária aqui.
const FAQItem = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.5,
      ease: 'power3.inOut',
    });
  }, [isOpen]);

  return (
    <div className={styles.faqItem}>
      <div className={styles.questionWrapper} onClick={onToggle}>
        <h3 className={styles.question}>{item.question}</h3>
        <div className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.answerWrapper} ref={contentRef}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
};


// O componente principal agora recebe o 'dictionary'
const FAQ = ({ dictionary }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const headerRef = useRef(null); // Ref para o cabeçalho

  // Animações de entrada com GSAP (sem alterações na lógica)
  useEffect(() => {
    // Adiciona uma verificação para garantir que os refs existem
    if (!listRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // Animação do cabeçalho
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      });

      // Animação de revelação "wipe" dos itens
      const items = listRef.current.children;
      gsap.from(items, {
        '--wipe-height': '0%',
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Verificação para evitar erro caso o dicionário ainda não tenha sido carregado
  if (!dictionary || !dictionary.items) {
    return null;
  }

  return (
    <section id="faq" className={styles.faqSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          {/* Título e subtítulo agora vêm do dicionário */}
          <h2 className={styles.title}>{dictionary.title}</h2>
          <p className={styles.subtitle}>{dictionary.subtitle}</p>
        </div>
        <div className={styles.faqList} ref={listRef}>
          {/* Mapeia os itens do dicionário em vez do array 'faqData' */}
          {dictionary.items.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;