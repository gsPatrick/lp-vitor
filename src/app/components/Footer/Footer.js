// src/components/Footer/Footer.js (VERSÃO MODIFICADA PARA MULTILÍNGUE)
'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

// Ícones SVG para as redes sociais (permanecem os mesmos)
const SocialIcons = {
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
  ),
};

// O componente agora recebe 'dictionary' como propriedade
const Footer = ({ dictionary }) => {
  const currentYear = new Date().getFullYear();

  // Se o dicionário não estiver carregado, não renderiza nada para evitar erros.
  if (!dictionary) {
    return null;
  }

  // Substitui o placeholder {year} pelo ano atual no texto de copyright
  const copyrightText = dictionary.copyright.replace('{year}', currentYear);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Coluna 1: Marca e Redes Sociais */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              {dictionary.logo}
            </Link>
            <p className={styles.tagline}>
              {dictionary.tagline}
            </p>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{SocialIcons.linkedin}</a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">{SocialIcons.twitter}</a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{dictionary.navigate.title}</h4>
            <ul className={styles.linkList}>
              {Object.entries(dictionary.navigate.links).map(([key, value]) => (
                <li key={key}><a href={`#${key}`}>{value}</a></li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Legal */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{dictionary.legal.title}</h4>
            <ul className={styles.linkList}>
              {Object.entries(dictionary.legal.links).map(([key, value]) => (
                <li key={key}><a href="#">{value}</a></li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{dictionary.contact.title}</h4>
            <ul className={styles.linkList}>
              <li><a href={`mailto:${dictionary.contact.email}`}>{dictionary.contact.email}</a></li>
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