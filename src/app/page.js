'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Spinner de carregamento (sem alterações)
const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0D1B2A' }}>
        <style jsx>{`.spinner { border: 4px solid rgba(255, 255, 255, 0.2); width: 36px; height: 36px; border-radius: 50%; border-left-color: #D4AF37; animation: spin 1s ease infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div className="spinner"></div>
    </div>
);

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        // Detecta o idioma do navegador (ex: "pt-BR", "de-DE", "en-US")
        const userLang = navigator.language.toLowerCase().split('-')[0];

        let targetLocale = 'en'; // Padrão é inglês

        if (userLang === 'pt') {
            targetLocale = 'pt';
        } else if (userLang === 'de') {
            targetLocale = 'de';
        }
        
        // *** ESTA É A MUDANÇA PRINCIPAL ***
        // Em vez de mudar o subdomínio, nós navegamos para o path correto.
        // ex: /pt, /de, /en
        // Usamos router.replace para que o usuário não possa "voltar" para a página de carregamento.
        router.replace(`/${targetLocale}`);

    }, [router]); // Array de dependência para rodar apenas uma vez.

    // Mostra o spinner enquanto o redirecionamento ocorre
    return <LoadingSpinner />;
}