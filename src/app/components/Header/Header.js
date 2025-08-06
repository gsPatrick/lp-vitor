// src/components/Header/Header.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import styles from './Header.module.css';

const Header = ({ dictionary }) => {
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

  // Se o dicionário não estiver carregado, não renderiza nada para evitar erros.
  if (!dictionary) {
    return null;
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
            {Object.keys(dictionary.nav).map((key) => (
              <li key={key}>
                <a href={`#${key}`} className={styles.navLinkItem}>
                  {dictionary.nav[key]}
                </a>
              </li>
            ))}
          </ul>

          <a 
            href="#contact" // Link do botão principal
            className={styles.ctaButton}
            ref={ctaButtonRef}
          >
            {dictionary.cta_button}
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
          {Object.keys(dictionary.nav).map((key) => (
            <li key={`mobile-${key}`}>
              <a href={`#${key}`} onClick={closeMenu}>
                {dictionary.nav[key]}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={styles.mobileCta} onClick={closeMenu}>
              {dictionary.cta_button}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;