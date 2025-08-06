// Este layout agora é "aninhado" dentro do RootLayout.
// Sua principal função é passar os filhos adiante.
// Ele ainda é útil para gerar os parâmetros estáticos de idioma.

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }, { lang: 'de' }];
}

// A metadata aqui pode sobrescrever ou complementar a do layout raiz.
export const metadata = {
  title: "Financify | Strategic CFO Services",
  description: "C-Level strategic expertise for ambitious global businesses.",
};

export default function LangLayout({ children, params }) {
  // Não renderizamos mais as tags <html> e <body> aqui.
  // Apenas retornamos os componentes filhos que serão inseridos
  // no {children} do RootLayout.
  return (
    <>
      {children}
    </>
  );
}