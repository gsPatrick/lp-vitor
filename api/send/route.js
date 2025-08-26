// /app/api/send/route.js (ATUALIZADO PARA ENVIAR DOIS E-MAILS)
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
// É crucial que estas variáveis de ambiente estejam configuradas
const notificationEmail = process.env.RESEND_NOTIFICATION_EMAIL;
const fromEmail = process.env.RESEND_FROM_EMAIL;

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, country, revenue, countryCode, phone } = body;

    // Validação básica no servidor
    if (!fullName || !email || !country || !revenue || !phone || !notificationEmail || !fromEmail) {
        console.error("Missing required fields or environment variables");
        return NextResponse.json({ error: 'Missing required fields or server configuration' }, { status: 400 });
    }

    // Promessa para enviar os dois e-mails em paralelo
    const [notificationResponse, confirmationResponse] = await Promise.all([
      // 1. E-mail de notificação para Florian
      resend.emails.send({
        from: `Keystone New Lead <${fromEmail}>`,
        to: [notificationEmail], // E-mail do Florian
        subject: `Nova Avaliação Estratégica Agendada por ${fullName}`,
        react: (
          <div>
            <h1>Nova Solicitação de Avaliação Estratégica</h1>
            <p>Um novo lead preencheu o formulário no site.</p>
            <hr />
            <h2>Detalhes do Lead:</h2>
            <p><strong>Nome:</strong> {fullName}</p>
            <p><strong>E-mail:</strong> {email}</p>
            <p><strong>País:</strong> {country}</p>
            <p><strong>Receita Anual (USD):</strong> {revenue}</p>
            <p><strong>Telefone:</strong> {countryCode} {phone}</p>
            <hr />
            <p>O lead foi redirecionado para o Calendly para agendar a reunião.</p>
          </div>
        ),
      }),
      // 2. E-mail de confirmação para o Lead
      resend.emails.send({
        from: `Keystone Consulting <${fromEmail}>`,
        to: [email], // E-mail do lead
        subject: `Próximo passo: Agende sua Avaliação Estratégica na Keystone`,
        react: (
          <div>
            <h1>Obrigado, {fullName}!</h1>
            <p>Recebemos suas informações com sucesso. O primeiro passo para escalar seu negócio com clareza foi dado.</p>
            <p><strong>O próximo passo é agendar sua avaliação gratuita no nosso Calendly.</strong> Você já foi redirecionado para a página de agendamento.</p>
            <hr />
            <h3>Resumo das suas informações:</h3>
            <p><strong>Nome:</strong> {fullName}</p>
            <p><strong>E-mail:</strong> {email}</p>
            <p><strong>País:</strong> {country}</p>
            <p><strong>Receita Anual (USD):</strong> {revenue}</p>
            <p><strong>Telefone:</strong> {countryCode} {phone}</p>
            <hr />
            <p>Atenciosamente,</p>
            <p>Equipe Keystone Consulting</p>
          </div>
        ),
      }),
    ]);

    // Verificação de sucesso de ambos os e-mails
    if (notificationResponse.error || confirmationResponse.error) {
        console.error("Error sending emails:", { notificationResponse, confirmationResponse });
        return NextResponse.json({ 
            error: "An error occurred while sending emails.", 
            details: { notification: notificationResponse.error, confirmation: confirmationResponse.error } 
        }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { notificationResponse, confirmationResponse } });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}