import fs from "fs";

const setCorreo = async (req,res,PORT) => {
    try {
        let email = req.body.email
        let archivoEmail = './correo.dat'
        await fs.promises.writeFile(archivoEmail, email)
        res.status(200).send(`<h2 style="color:blue;"> Email cargado correctamente</h2>`)
    
    } catch (error) {
        res.status(404).send(error)
    }
}


export default {
    setCorreo
}