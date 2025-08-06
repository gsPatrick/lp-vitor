import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Informa ao Next.js quais idiomas estão disponíveis para geração estática
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }, { lang: 'de' }];
}

export const metadata = {
  title: "Financify | Strategic CFO Services", // Título genérico, pode ser customizado por página
  description: "C-Level strategic expertise for ambitious global businesses.",
};

export default function RootLayout({ children, params }) {
  return (
    // Usa o parâmetro 'lang' para definir o idioma da página
    <html lang={params.lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}