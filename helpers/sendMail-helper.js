import nodemailer from "nodemailer";
import fs from "fs";

const sendEmail = async (productos) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kmstaie@gmail.com',
            pass: 'Ruty2019'
        }
    })
    let archivoEmail = './correo.dat'
    let email = await fs.promises.readFile(archivoEmail, 'utf-8')
    let text = ''
    for (let i = 0; i < productos.length; i++) {
        
        text += `<div >`;     
        text += '<span style = "color: red">NOMBRE: </span>'  + productos[i].nombre
        text += '<br>'
        text += '<span style = "color: red">PRECIO: </span>' + productos[i].precio
        text += '<br>'
        text += '<span style = "color: red">DESCRIPCION: </span>' + productos[i].descripcion
        text += '<br>'
        text += '<span style = "color: red">URL Imagen: </span>' + productos[i].url
        text += '<br>'
        text += `<br><br>`;
        text += `</div>`;
    }
    
    const mailOptions = {
        from: 'kmstaie@gmail.com',
        to: email,
        subject: 'Mail con listado completo de productos',
        html: text
      }  
       
        transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info)
        })
}

export default {
    sendEmail
}
