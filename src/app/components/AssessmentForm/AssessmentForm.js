// /app/components/AssessmentForm/AssessmentForm.js (CORREÇÃO FINAL)
'use client';

import { useState } from 'react';
// 1. REMOVEMOS o 'useParams' daqui
import { useRouter } from 'next/navigation';
import styles from './AssessmentForm.module.css';

// 2. O componente agora aceita 'lang' como uma prop
const AssessmentForm = ({ dictionary, formData, lang }) => { 
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [revenue, setRevenue] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    
    const router = useRouter();
    // 3. REMOVEMOS a linha 'const params = useParams();'

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const submissionData = {
            fullName, email, country, revenue, countryCode, phone,
        };
        
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/send`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'An unknown error occurred.');
            }
            
            // 4. USAMOS a prop 'lang' diretamente para construir a URL
            // Isso garante que o idioma correto seja sempre usado.
            const successUrl = `/${lang || 'en'}/assessment/success`;

            router.push(successUrl);

        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(dictionary.errorMessage);
        }
    };

    return (
        // O JSX do formulário continua o mesmo
        <section id="assessment-form" className={styles.formSection}>
            <div className={`container ${styles.formContainer}`}>
                <div className={styles.intro}>
                    <h2 className={styles.title}>{dictionary.introTitle}</h2>
                    <p className={styles.text}>{dictionary.introText}</p>
                </div>
                <div className={styles.formWrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {status === 'error' && (
                            <div className={styles.errorBox}>{errorMessage}</div>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="fullName">{dictionary.fullNameLabel}</label>
                            <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={dictionary.fullNamePlaceholder} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="businessEmail">{dictionary.businessEmailLabel}</label>
                            <input type="email" id="businessEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={dictionary.businessEmailPlaceholder} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="country">{dictionary.countryLabel}</label>
                            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required>
                                <option value="" disabled>{dictionary.countryPlaceholder}</option>
                                {formData.countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="annualRevenue">{dictionary.annualRevenueLabel}</label>
                            <select id="annualRevenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} required>
                                <option value="" disabled>{dictionary.annualRevenuePlaceholder}</option>
                                {formData.revenues.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        <div className={styles.phoneGroup}>
                             <div className={`${styles.formGroup} ${styles.countryCode}`}>
                                <label htmlFor="countryCode">{dictionary.countryCodeLabel}</label>
                                <select id="countryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required>
                                    <option value="" disabled>{dictionary.countryCodePlaceholder}</option>
                                    {formData.countryCodes.map(cc => <option key={cc} value={cc}>{cc}</option>)}
                                </select>
                             </div>
                             <div className={`${styles.formGroup} ${styles.phoneNumber}`}>
                                <label htmlFor="phone">{dictionary.phoneLabel}</label>
                                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={dictionary.phonePlaceholder} required />
                             </div>
                        </div>
                        <button type="submit" disabled={status === 'submitting'} className={styles.submitButton}>
                            {status === 'submitting' ? dictionary.submittingButton : dictionary.submitButton}
                        </button>
                        <p className={styles.privacyText}>{dictionary.privacyText}</p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AssessmentForm;