// src/components/CalendlyEmbed/CalendlyEmbed.js
'use client';

import React from 'react';
import { InlineWidget } from 'react-calendly';
import styles from './CalendlyEmbed.module.css';

const CalendlyEmbed = ({ url, dictionary }) => {
  return (
    <div className={styles.calendlyContainer}>
      {/* Usamos o dicionário para a mensagem de sucesso, que agora serve de título */}
      <h2 className={styles.successTitle}>{dictionary.successMessage}</h2>
      <p className={styles.successSubtitle}>Agora, basta escolher o melhor horário para a nossa conversa:</p>
      
      <div className={styles.widgetWrapper}>
        <InlineWidget
          url={url}
          styles={{
            height: '1000px', // Altura recomendada pelo Calendly para evitar barras de rolagem
            borderRadius: 'var(--border-radius)',
          }}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '0D1B2A', // Cor primária (azul escuro)
            textColor: '1B263B'      // Cor do texto
          }}
        />
      </div>
    </div>
  );
};

export default CalendlyEmbed;