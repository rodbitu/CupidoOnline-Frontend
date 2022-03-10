/**
 * yarn add nodemailer
 * Criar email teste e configurar segurança
 */

const nodemailer = require("nodemailer");

// Importação do arquivo smtp
const SMTP_CONFIG = require("./config/smtp");

// Sistema de transporte de mensagem, padrão do nodemailer
const transporter = nodemailer.createTransport({
  //Configurações do transporte 
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false, // False pra evitar configurar conexão segura com gmail, mas dá pra estabelecer conexão segura
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  // TLS tipo de conexão mais segura
  tls: {
    rejectUnauthorized: false, // Não rejeitar as conexões não autorizadas
  },
});

async function run() {
    const mailSent = await transporter.sendMail({
        text: 'Texto do E-mail',
        subject: 'Assunto do e-mail',
        from: 'test TESTE<test@gmail.com>', // De quem veio a mensagem; Pode botar outra coisa diferente do email cadastrado
        to: ["test@gmail.com"], // Pra quem quer enviar; Da pra enviar pra mais de uma pessoa
        html: `
        <html>
        <body>
          <strong>Mensagem de amor</strong></br>hehehehhe
        </body>
      </html> 
        `,
    });

    console.log(mailSent);
}

// Chamando função
run();
