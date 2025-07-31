// src/components/Header/Header.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import styles from './Header.module.css';

const Header = () => {
  // Estado para controlar a sombra do header no scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // Estado para controlar a abertura do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const ctaButtonRef = useRef(null);

  // Efeito para adicionar e remover o event listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      // Adiciona a sombra se o scroll for maior que 10px
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Função de limpeza: remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // O array vazio garante que o efeito rode apenas uma vez (montagem/desmontagem)

  // Efeito para a animação do botão com anime.js
  useEffect(() => {
    const button = ctaButtonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      anime({
        targets: button,
        scale: [1, 1.05],
        translateZ: 0,
        duration: 300,
        easing: 'easeOutElastic(1, .8)'
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: button,
        scale: [1.05, 1],
        translateZ: 0,
        duration: 200,
        easing: 'easeOutQuad'
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className={`${styles.headerContainer} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Financify
          </Link>

          {/* Menu Desktop */}
          <ul className={styles.navLinks}>
            <li><a href="#services" className={styles.navLinkItem}>Services</a></li>
            <li><a href="#about" className={styles.navLinkItem}>About</a></li>
            <li><a href="#testimonials" className={styles.navLinkItem}>Testimonials</a></li>
            <li><a href="#faq" className={styles.navLinkItem}>FAQ</a></li>
          </ul>

          <a 
            href="https://wa.me/15551234567" 
            target="_blank" 
            className={styles.ctaButton}
            ref={ctaButtonRef}
          >
            Get a Quote
          </a>
          
          {/* Botão Hamburger (Menu Mobile) */}
          <button 
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
      
      {/* Overlay do Menu Mobile */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#testimonials" onClick={closeMenu}>Testimonials</a></li>
          <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
          <li>
            <a href="https://wa.me/15551234567" target="_blank" className={styles.mobileCta}>
              Schedule a Consultation
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;