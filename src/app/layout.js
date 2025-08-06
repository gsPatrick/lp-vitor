import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Financify",
  description: "Strategic CFO services for ambitious global businesses.",
};

export default function RootLayout({ children }) {
  // Este é o layout principal que envolve TODA a aplicação.
  // Note que ele não tem o atributo `lang` aqui, pois não sabemos o idioma neste nível.
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}