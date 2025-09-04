// middleware.js (VERSÃO FINAL E CORRETA)

import { NextResponse } from 'next/server';

const locales = ['en', 'pt', 'de'];
const defaultLocale = 'en';

function getLocale(request) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return defaultLocale;
  }
  const preferredLocale = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  return locales.includes(preferredLocale) ? preferredLocale : defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Verifica se o caminho já tem um idioma (ex: /pt/contato)
  // Se tiver, apenas continua para a página correta.
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Se não tem idioma, detectamos o melhor e redirecionamos.
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // Redireciona o navegador para a nova URL com o idioma.
  // Este é o passo que o Google AdsBot precisa.
  return NextResponse.redirect(newUrl);
}

// Define em quais rotas o middleware deve ser executado.
export const config = {
  matcher: [
    // Executa em todas as rotas, exceto as que são para arquivos ou APIs.
    '/((?!api|_next/static|_next/image|images|fonts|videos|favicon.ico).*)',
  ],
};