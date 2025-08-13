// src/components/Header/Header.js (COM LOGO E TEXTO EMBAIXO)
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import anime from 'animejs';
import styles from './Header.module.css';

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
          {/* ===== MUDANÇA: Logo e texto agora em layout vertical ===== */}
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
          {/* ======================================================= */}

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