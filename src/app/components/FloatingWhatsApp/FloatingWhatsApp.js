// src/components/FloatingWhatsApp/FloatingWhatsApp.js
'use client';

import styles from './FloatingWhatsApp.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = ({ link }) => {
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default FloatingWhatsApp;