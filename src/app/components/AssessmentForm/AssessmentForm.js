// /app/components/AssessmentForm/AssessmentForm.js (VERSÃO FINAL COM CALENDLY)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AssessmentForm.module.css';
import CalendlyEmbed from '../CalendlyEmbed/CalendlyEmbed'; // 1. IMPORTAR O NOVO COMPONENTE

const AssessmentForm = ({ dictionary, formData }) => {
    // 2. NOVO ESTADO para controlar a exibição
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formState, setFormState] = useState({ fullName: '', email: '', country: '', revenue: '', countryCode: '', phone: '' });

    const sectionRef = useRef(null);
    const introContentRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(introContentRef.current, { opacity: 0, x: -50, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
            gsap.from(formRef.current, { opacity: 0, x: 50, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleInputChange = (e) => setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        try {
            const res = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formState) });
            if (!res.ok) throw new Error(dictionary.errorMessage);
            
            // 3. ATUALIZA O ESTADO EM CASO DE SUCESSO
            setIsSubmitted(true);

        } catch (error) {
            setErrorMessage(error.message || dictionary.errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Insira a URL do Calendly do seu cliente aqui
    const calendlyUrl = "https://calendly.com/seu-usuario/sua-reuniao";

    return (
        <section id="assessment-form" className={styles.formSection} ref={sectionRef}>
            <div className={styles.formWrapper}>
                {/* 4. LÓGICA DE RENDERIZAÇÃO CONDICIONAL */}
                {isSubmitted ? (
                    // Se o formulário foi enviado, mostra o Calendly
                    <CalendlyEmbed url={calendlyUrl} dictionary={dictionary} />
                ) : (
                    // Senão, mostra o conteúdo de introdução e o formulário
                    <>
                        <div className={styles.introContent} ref={introContentRef}>
                            <h2 className={styles.title}>{dictionary.introTitle}</h2>
                            <p className={styles.subtitle}>{dictionary.introText}</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                            <div className={styles.formGroup}>
                                <label htmlFor="fullName">{dictionary.fullNameLabel} *</label>
                                <input type="text" id="fullName" name="fullName" value={formState.fullName} onChange={handleInputChange} placeholder={dictionary.fullNamePlaceholder} required />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label htmlFor="email">{dictionary.businessEmailLabel} *</label>
                                <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} placeholder={dictionary.businessEmailPlaceholder} required />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="country">{dictionary.countryLabel} *</label>
                                    <select id="country" name="country" value={formState.country} onChange={handleInputChange} required>
                                        <option value="" disabled>{dictionary.countryPlaceholder}</option>
                                        {formData.countries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="revenue">{dictionary.annualRevenueLabel} *</label>
                                    <select id="revenue" name="revenue" value={formState.revenue} onChange={handleInputChange} required>
                                        <option value="" disabled>{dictionary.annualRevenuePlaceholder}</option>
                                        {formData.revenues.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={`${styles.formGroup} ${styles.countryCode}`}>
                                    <label htmlFor="countryCode">{dictionary.countryCodeLabel} *</label>
                                    <select id="countryCode" name="countryCode" value={formState.countryCode} onChange={handleInputChange} required>
                                        <option value="" disabled>{dictionary.countryCodePlaceholder}</option>
                                        {formData.countryCodes.map(cc => <option key={cc} value={cc}>{cc}</option>)}
                                    </select>
                                </div>
                                <div className={`${styles.formGroup} ${styles.phone}`}>
                                    <label htmlFor="phone">{dictionary.phoneLabel} *</label>
                                    <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleInputChange} placeholder={dictionary.phonePlaceholder} required />
                                </div>
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                {isSubmitting ? dictionary.submittingButton : dictionary.submitButton} →
                            </button>
                            {errorMessage && <p className={`${styles.formMessage} ${styles.error}`}>{errorMessage}</p>}
                            <p className={styles.privacyText}>{dictionary.privacyText}</p>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
};

export default AssessmentForm;