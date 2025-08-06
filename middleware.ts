// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'pt', 'de'];
const defaultLocale = 'en';
const localeCookieName = 'NEXT_LOCALE';

// Mapeamento de países para idiomas
const countryToLocaleMap: Record<string, string> = {
  BR: 'pt',
  DE: 'de',
  AT: 'de', // Áustria
  CH: 'de', // Suíça
};

function getLocale(request: NextRequest): string {
  // 1. Prioridade Máxima: Verificar a preferência do usuário no cookie
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Segunda Prioridade: Detectar o país pelo IP (Vercel injeta o header 'x-vercel-ip-country')
  // O objeto 'request.geo' é a forma moderna e agnóstica de plataforma.
  const country = request.geo?.country;
  if (country && countryToLocaleMap[country]) {
    return countryToLocaleMap[country];
  }

  // 3. Fallback: Usar o idioma padrão
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host')!;

  // Extrai o subdomínio (ex: 'pt' de 'pt.meusite.com')
  const subdomain = hostname.split('.')[0];

  // Cenário 1: O usuário já está em um subdomínio de idioma válido (ex: pt.meusite.com)
  if (locales.includes(subdomain)) {
    const response = NextResponse.rewrite(new URL(`/${subdomain}${pathname}`, request.url));
    // Garante que o cookie esteja definido com o idioma correto para futuras visitas
    response.cookies.set(localeCookieName, subdomain, { path: '/' });
    return response;
  }

  // Cenário 2: O usuário acessa o domínio raiz (ex: meusite.com)
  // Esta é a lógica principal de redirecionamento geográfico.
  const determinedLocale = getLocale(request);
  
  // Constrói a nova URL com o subdomínio do idioma detectado
  const newHost = `${determinedLocale}.${hostname}`;
  const redirectUrl = new URL(pathname, `https://${newHost}`);

  // Redireciona o usuário para o subdomínio correto
  const response = NextResponse.redirect(redirectUrl);
  // Salva a preferência no cookie para que este redirecionamento não ocorra novamente
  response.cookies.set(localeCookieName, determinedLocale, { path: '/' });

  return response;
}

export const config = {
  // O matcher evita que o middleware rode em rotas de arquivos estáticos.
  matcher: [
    '/((?!api|_next/static|_next/image|images|videos|fonts|favicon.ico).*)',
  ],
};