import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'pt', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // Pega o hostname (ex: pt.meusite.com)
  const hostname = request.headers.get('host')!;

  // Extrai o subdomínio (ex: 'pt')
  // Assume que o domínio principal tem 2 partes (meusite.com)
  const subdomain = hostname.split('.')[0];

  // Verifica se o subdomínio corresponde a um idioma válido
  if (locales.includes(subdomain)) {
    // Reescreve a URL para incluir o locale, mas mantém o subdomínio na barra do navegador
    // Ex: Acessar 'pt.meusite.com/sobre' internamente vira '/pt/sobre'
    const url = request.nextUrl.clone();
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Se não houver subdomínio ou for um subdomínio inválido (ex: 'www'),
  // redireciona para o idioma padrão (ou trata como desejar)
  // Aqui, vamos reescrever para o defaultLocale, assumindo o domínio principal
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // O matcher define em quais rotas o middleware será executado.
  // Evita que rode em rotas de arquivos estáticos como imagens, fontes, etc.
  matcher: [
    '/((?!api|_next/static|_next/image|images|videos|fonts|favicon.ico).*)',
  ],
};