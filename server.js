import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars'

import config from "./config/configServer.js";
import ingresoController from "./controllers/ingreso-controller.js";
import setCorreoController from "./controllers/setCorreo-controller.js";
import setFileCorreo from "./helpers/setFileCorreo-helper.js";
import modelProducto from "./model/producto.js";



const app = express()

app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || config.CONFIG_SERVER.port

app.engine('hbs', handlebars({extname:'.hbs', defaultLayout: 'index.hbs'}) )
app.set('views', './views')
app.set('view engine', 'hbs') 


app.get('/', (req,res) => {
    res.render('formulario');
})

app.post('/ingreso', async (req, res) => {
    ingresoController.ingreso(req,res)
}); 

app.get('/listar', async (req, res) => {
    try {
        let productos = await modelProducto.producto.find({}).lean()
        
        res.render('tabla', {productos}) 
    } catch (error) {
        res.status(404).send(error)
    }
}); 


app.get('/set-correo', (req,res) => {
    res.render('set-correo');
})


app.post('/set-correo', (req,res) => {
    setCorreoController.setCorreo(req,res)
})
 
 

mongoose.connect('mongodb+srv://kevin:Duby2021@cluster0.l9mnw.mongodb.net/fizzmodTP4?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
}, err => {
    if(err) throw new Error(`Error de conexión en la base de datos: ${err}`)

    console.log('Base de datos conectada!')    
    
    app.set('PUERTO', PORT)

    const server = app.listen(app.get('PUERTO'), () => {       
        setFileCorreo.setFile()
        console.log("*********************************************");
        console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
        console.log("*********************************************");
    })
    server.on('error', error => console.log(`Error en Servidor: ${error}`))
})
