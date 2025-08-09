// src/components/Footer/Footer.js (COM LOGO MAIOR)
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const SocialIcons = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  )
};

const Footer = ({ dictionary }) => {
  const currentYear = new Date().getFullYear();

  if (!dictionary) return null;

  const copyrightText = dictionary.copyright.replace('{year}', currentYear);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logoWrapper}>
              {/* ===== MUDANÇA AQUI: Dimensões da logo aumentadas ===== */}
              <Image 
                src="/images/logo.png" 
                alt="Keystone Consulting Logo" 
                width={50} // Aumentado de 40
                height={50} // Aumentado de 40
                className={styles.logoImage}
              />
              {/* ======================================================= */}
              <h3 className={styles.logoText}>{dictionary.logo}</h3>
            </Link>
            <p className={styles.tagline}>{dictionary.tagline}</p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/florianpass/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{SocialIcons.linkedin}</a>
              <a href="https://www.instagram.com/meetkeystone/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">{SocialIcons.instagram}</a>
            </div>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{dictionary.navigate.title}</h4>
            <ul className={styles.linkList}>
              {Object.entries(dictionary.navigate.links).map(([key, value]) => (
                <li key={key}><a href={`#${key}`}>{value}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{dictionary.legal.title}</h4>
            <ul className={styles.linkList}>
              {Object.entries(dictionary.legal.links).map(([key, value]) => (
                <li key={key}><a href="#">{value}</a></li>
              ))}
            </ul>
            <div className={styles.globalReach}>
                <h4 className={styles.columnTitle}>{dictionary.contact.global_reach_title}</h4>
                <p>{dictionary.contact.global_reach_text}</p>
            </div>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{dictionary.contact.title}</h4>
            <ul className={styles.linkList}>
              <li><a href={`mailto:${dictionary.contact.email}`}>{dictionary.contact.email}</a></li>
              <li><a href={`tel:${dictionary.contact.phone.replace(/\s/g, '')}`}>{dictionary.contact.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;