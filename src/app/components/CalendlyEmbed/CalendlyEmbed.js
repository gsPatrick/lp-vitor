// /app/components/CalendlyEmbed/CalendlyEmbed.js (ATUALIZADO)
'use client';

import React from 'react';
import { InlineWidget } from 'react-calendly';
import styles from './CalendlyEmbed.module.css';

const CalendlyEmbed = ({ dictionary }) => {
  const calendlyUrl = "https://calendly.com/florianpass/meet";

  return (
    <section className={styles.calendlySection}>
      <div className="container">
        <div className={styles.calendlyContainer}>
          <h2 className={styles.title}>{dictionary.successMessage || 'Obrigado!'}</h2>
          <p className={styles.subtitle}>
            Sua solicitação foi enviada com sucesso. Agora, basta escolher abaixo o melhor horário para nossa conversa estratégica.
          </p>
          
          <div className={styles.widgetWrapper}>
            <InlineWidget
              url={calendlyUrl}
              styles={{
                /* ===== ALTERAÇÃO PRINCIPAL AQUI ===== */
                height: '1000px', // Aumentado de 700px para 1000px para evitar scroll
                /* ======================================= */
                width: '100%',
                borderRadius: 'var(--border-radius)',
              }}
              pageSettings={{
                backgroundColor: 'F8F9FA',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '0D1B2A',
                textColor: '1B263B'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlyEmbed;