import fs from "fs";

const setFile = async () => {
    try {
        let archivoEmail = './correo.dat'
        let file = fs.existsSync(archivoEmail)
        if (!file) {
            let email = 'kmsueldo@hotmail.com'
            await fs.promises.writeFile(archivoEmail, email) 
        }
    } catch (error) {
        console.log("No existe el archivo", error);
    }
}

export default {
    setFile
}








 