// src/components/Header/Header.js (ATUALIZADO COM ÍCONES SOCIAIS)
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import anime from 'animejs';
import styles from './Header.module.css';

// ===== MUDANÇA: Ícones SVG adicionados aqui =====
const SocialIcons = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  )
};
// ============================================

const Header = ({ dictionary }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const button = ctaButtonRef.current;
    if (!button) return;
    const mouseEnter = () => anime({ targets: button, scale: [1, 1.05], translateZ: 0, duration: 300, easing: 'easeOutElastic(1, .8)' });
    const mouseLeave = () => anime({ targets: button, scale: [1.05, 1], translateZ: 0, duration: 200, easing: 'easeOutQuad' });
    button.addEventListener('mouseenter', mouseEnter);
    button.addEventListener('mouseleave', mouseLeave);
    return () => {
      button.removeEventListener('mouseenter', mouseEnter);
      button.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    closeMenu();
  };

  if (!dictionary) return null;

  return (
    <header className={`${styles.headerContainer} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.png"
              alt="Keystone Consulting Logo"
              width={40}
              height={40}
              priority
              className={styles.logoImage}
            />
            <span className={styles.logoText}>Keystone Consulting</span>
          </Link>
          
          <ul className={styles.navLinks}>
            {Object.keys(dictionary.nav).map((key) => (
              <li key={key}>
                <a 
                  href={`#${key}`} 
                  onClick={(e) => handleNavClick(e, `#${key}`)}
                  className={styles.navLinkItem}
                >
                  {dictionary.nav[key]}
                </a>
              </li>
            ))}
          </ul>

          {/* ===== MUDANÇA: Container com os ícones sociais inserido aqui ===== */}
          <div className={styles.socialIcons}>
            <a href="https://www.linkedin.com/in/florianpass/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{SocialIcons.linkedin}</a>
            <a href="https://www.instagram.com/meetkeystone/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">{SocialIcons.instagram}</a>
          </div>
          {/* ============================================================== */}

          <a 
            href="#assessment-form"
            onClick={(e) => handleNavClick(e, '#assessment-form')}
            className={styles.ctaButton}
            ref={ctaButtonRef}
          >
            {dictionary.cta_button}
          </a>
          
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
      
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          {Object.keys(dictionary.nav).map((key) => (
            <li key={`mobile-${key}`}>
              <a href={`#${key}`} onClick={(e) => handleNavClick(e, `#${key}`)}>
                {dictionary.nav[key]}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#assessment-form" 
              className={styles.mobileCta} 
              onClick={(e) => handleNavClick(e, '#assessment-form')}
            >
              {dictionary.cta_button}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;