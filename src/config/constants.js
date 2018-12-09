require('dotenv').config()

export const server = {
    PORT: process.env.PORT || 3000
}

export const mailer = {
    server_email: process.env.SERVER_EMAIL || 'iamwtk <me@iamwtk.com>',
    SMTP: {
        host: process.env.SMTP_HOST || 'smtp.host.com',
        port: process.env.SMTP_PORT || '465',
        secure: process.env.SMTP_SECURE || true,
        auth: {
            user: process.env.SMTP_AUTH_USER || 'user',
            pass: process.env.SMTP_AUTH_PASS || 'password'
        }
    },
    multilingual: false 
}


