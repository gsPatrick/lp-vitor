// /app/components/AssessmentForm/AssessmentForm.js (VERSÃO FINAL E CORRIGIDA)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AssessmentForm.module.css';

const AssessmentForm = ({ dictionary, formData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });
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
        setFormMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formState) });
            if (!res.ok) throw new Error('Failed');
            setFormMessage({ type: 'success', text: dictionary.successMessage });
            setFormState({ fullName: '', email: '', country: '', revenue: '', countryCode: '', phone: '' });
        } catch (error) {
            setFormMessage({ type: 'error', text: dictionary.errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="assessment-form" className={styles.formSection} ref={sectionRef}>
            <div className={styles.formWrapper}>
                <div className={styles.introContent} ref={introContentRef}>
                    <h2 className={styles.title}>{dictionary.introTitle}</h2>
                    <p className={styles.subtitle}>{dictionary.introText}</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                    {/* ===== GARANTINDO QUE TODOS OS CAMPOS TENHAM LABEL ===== */}
                    
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
                    {formMessage.text && <p className={`${styles.formMessage} ${styles[formMessage.type]}`}>{formMessage.text}</p>}
                    <p className={styles.privacyText}>{dictionary.privacyText}</p>
                </form>
            </div>
        </section>
    );
};

export default AssessmentForm;