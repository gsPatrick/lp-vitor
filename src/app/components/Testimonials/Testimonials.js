// src/components/Testimonials/Testimonials.js (VERSÃO OTIMIZADA E FLUIDA)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  { quote: "Working with Financify was a game-changer. Their strategic insights transformed our financial operations and unlocked growth we didn't think was possible.", name: 'Sarah Johnson', title: 'CEO, Tech Innovators Inc.', image: '/images/testimonial-01.jpg' },
  { quote: "The level of professionalism and expertise is unparalleled. Florian's team provided us with a clear financial roadmap that has been instrumental in our expansion into Europe.", name: 'Michael Chen', title: 'Founder, Global Exports Co.', image: '/images/testimonial-02.jpg' },
  { quote: "As a fast-growing startup, we needed more than just an accountant. We needed a strategic partner. Financify delivered exactly that, and more.", name: 'Emily Rodriguez', title: 'CTO, Creative Solutions', image: '/images/testimonial-03.jpg' },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const quoteContentRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isAnimating = useRef(false);

  // Função para mudar para o próximo ou anterior depoimento
  const changeTestimonial = (newIndex) => {
    if (isAnimating.current || newIndex === currentIndex) return;
    isAnimating.current = true;

    const currentImage = imageContainerRef.current.querySelector(`.${styles.authorImage}[data-index="${currentIndex}"]`);
    const nextImage = imageContainerRef.current.querySelector(`.${styles.authorImage}[data-index="${newIndex}"]`);

    const tl = gsap.timeline({
      onComplete: () => {
        // ATUALIZA O ESTADO APENAS QUANDO A ANIMAÇÃO DE SAÍDA TERMINA
        setCurrentIndex(newIndex);
        // A animação de entrada será acionada pelo useEffect
      }
    });

    // 1. Animação de Saída do Texto e Autor
    tl.to(quoteContentRef.current.children, {
      opacity: 0,
      y: 20,
      filter: 'blur(5px)',
      stagger: 0.05,
      duration: 0.4,
      ease: 'power2.in'
    })
    // 2. Animação de Fade da Imagem Atual
    .to(currentImage, { 
      opacity: 0, 
      duration: 0.4, 
      ease: 'power2.in' 
    }, 0); // Anima ao mesmo tempo que o texto
  };
  
  // Hook para disparar a animação de ENTRADA quando o currentIndex muda
  useEffect(() => {
    // Garante que o conteúdo já esteja montado
    if (!quoteContentRef.current || !imageContainerRef.current) return;
    
    const nextImage = imageContainerRef.current.querySelector(`.${styles.authorImage}[data-index="${currentIndex}"]`);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    // Animação de Entrada do novo conteúdo
    tl.fromTo(quoteContentRef.current.children, 
        { opacity: 0, y: -20, filter: 'blur(5px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          stagger: 0.1, duration: 0.5, ease: 'power2.out',
        }
      )
      .to(nextImage, { 
        opacity: 1, 
        duration: 0.5, 
        ease: 'power2.out' 
      }, 0); // Anima a imagem junto com o texto

  }, [currentIndex]);
  
  // Animação de entrada da seção (sem alterações)
  useEffect(() => {
    gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        opacity: 0, duration: 1.5, ease: 'power2.inOut'
    });
  }, []);

  const currentTestimonial = testimonialsData[currentIndex];

  const handleNavClick = (direction) => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % testimonialsData.length
      : (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
    changeTestimonial(newIndex);
  };
  
  const handleProgressClick = (index) => {
    changeTestimonial(index);
  }

  return (
    <section id="testimonials" className={styles.testimonialsSection} ref={sectionRef}>
      <div className={styles.backgroundEffect}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.imageContainer} ref={imageContainerRef}>
            <div className={styles.imageFrame}></div>
            {testimonialsData.map((t, index) => (
              <img
                key={index}
                src={t.image}
                alt={t.name}
                data-index={index}
                className={styles.authorImage}
                style={{ opacity: 0 }} // Opacidade inicial controlada pelo GSAP
              />
            ))}
          </div>
          <div className={styles.content}>
            <div className={styles.quoteContent} ref={quoteContentRef}>
              <p className={styles.quote}>{currentTestimonial.quote}</p>
              <div className={styles.author}>
                <span className={styles.authorName}>{currentTestimonial.name}</span>
                <span className={styles.authorTitle}>{currentTestimonial.title}</span>
              </div>
            </div>
            <div className={styles.navigation}>
              <div className={styles.progress}>
                {testimonialsData.map((_, index) => (
                  <div 
                    key={index} 
                    className={`${styles.progressBar} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => handleProgressClick(index)}
                  />
                ))}
              </div>
              <div className={styles.navButtons}>
                <button onClick={() => handleNavClick('prev')} className={styles.navButton} aria-label="Previous">←</button>
                <button onClick={() => handleNavClick('next')} className={styles.navButton} aria-label="Next">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;