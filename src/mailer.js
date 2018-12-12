import nodemailer from 'nodemailer'
import ejs from 'ejs'
import { mailer as constants } from './config/constants'
import path from 'path'

export default async (req, res) => {    

    try {
       
        const transporter = nodemailer.createTransport(constants.SMTP)  
       
        const htmlMessage = await populateTemplate(req.body)
       
        const messageObj = buildMessageObject(req.body, htmlMessage)
     
        await transporter.sendMail(messageObj)

        res.json({message: 'Email Successfully sent!'})

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Something went wrong!', error })
    }

}

export const populateTemplate = async ({ language = null, template = 'contact', data = {}, service }) => {  

    const templatePath = path.join(
        `templates`,
        service ? service : '',
        constants.multilingual ? (language ? language : 'en_US') : '',
        `${template}.ejs`
    )
    
    //return populated ejs template with request data
    return await ejs.renderFile(templatePath, { ...data })       
        
}

export const buildMessageObject = ({transactional = false, data }, htmlMessage) =>({

    from:   transactional ? 
            constants.server_email : 
            `${data.name} <${data.email}>`,
            

    to:     transactional ? 
            data.email : 
            constants.server_email,


    //TODO: switch localized subject to i18n
    subject: `New message from ${data.name}`,


    html: htmlMessage

})

