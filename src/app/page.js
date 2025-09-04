// app/page.js (VERSÃO DE SEGURANÇA - SEM REDIRECIONAMENTO)
'use client';

// Este componente agora serve APENAS como uma tela de carregamento visual.
// O redirecionamento real é feito pelo middleware.js no servidor.
// Isso evita o erro de renderização que você observou.

const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0D1B2A' }}>
        <style jsx>{`.spinner { border: 4px solid rgba(255, 255, 255, 0.2); width: 36px; height: 36px; border-radius: 50%; border-left-color: #D4AF37; animation: spin 1s ease infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div className="spinner"></div>
    </div>
);

export default function RootPage() {
    // REMOVEMOS TODA A LÓGICA DE 'useEffect' E 'useRouter' DAQUI.
    // O componente agora só retorna o spinner.
    return <LoadingSpinner />;
}