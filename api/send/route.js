// /app/api/send/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Instancia o Resend com a chave de API que está segura nas variáveis de ambiente
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, country, revenue, countryCode, phone } = body;

    // Validação básica no servidor
    if (!fullName || !email || !country || !revenue || !phone) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Financify <onboarding@resend.dev>', // SEU DOMÍNIO VERIFICADO NO RESEND
      to: ['seu-email-de-notificacao@exemplo.com'], // E-MAIL QUE RECEBERÁ A NOTIFICAÇÃO
      subject: `Nova Avaliação Agendada por ${fullName}`,
      react: ( // Você pode usar HTML ou texto simples aqui também
        <div>
          <h1>Nova Solicitação de Avaliação</h1>
          <p><strong>Nome:</strong> {fullName}</p>
          <p><strong>E-mail:</strong> {email}</p>
          <p><strong>País:</strong> {country}</p>
          <p><strong>Receita Anual:</strong> {revenue}</p>
          <p><strong>Telefone:</strong> {countryCode} {phone}</p>
        </div>
      ),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}