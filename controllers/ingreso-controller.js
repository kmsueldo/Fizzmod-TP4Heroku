import modelProducto from "../model/producto.js";
import sendMailResport from "../helpers/sendMail-helper.js";

const ingreso = async (req,res) => {
    let producto = req.body
    try {
        let productoNuevo = new modelProducto.producto(producto)
        await productoNuevo.save()
        let productos = await modelProducto.producto.find({}).lean()
        if (productos.length % 10 == 0) {
            await sendMailResport.sendEmail(productos)
        }
        res.status(200).send(`<h2 style="color:blue;"> Producto cargado correctamente</h2>`)
    } catch (error) {
        res.status(404).send(error)
    }
}

export default {
    ingreso
}