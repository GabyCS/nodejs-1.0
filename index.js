const express = require('express');
const session  = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8000
const methodOverride = require('method-override');
const sesionCtrl = require('./controladores/sesionControlador');
const tareasCtrl = require('./controladores/tareasControlador')

let app = express(); 
app.use(session({
	secret:'477-5HJT-pQr54',
	resave:true,
	saveUninitialized:true
}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());


let router  = express.Router();

router.get('/', (req, res)=>{
	console.log(req.session);
	if(req.session.user){
		res.status(200).send('Hello World')
	}else{
		res.status(401).send('Inicia sesión');
	}
	
});

router.post('/iniciarSesion', (req, res) => {
	if(req.body.user){
		sesionCtrl.obtenerUsuario(req.body.user, (err, user) => {
			if(err){
				res.status(401).send({err:'el usuario no existe', res:false});
			}else{
				console.log(user);
				req.session.user=user.usuario;
				console.log(req.session);
				res.status(200).send({err:false, res:'se inicio correctamente'})
			}
		})
	}else{
		res.status(401).send('falta informacion');
	}
	
})

router.post('/cerrarSesion', (req, res) => {
	req.session.destroy();
	res.status(200).send('la sesion fue destruida');
})

router.put('/crearTarea', (req, res) =>{
	console.log('entro crear');
	tareasCtrl.crearTarea(req.body, (err, tarea) => {
		if(err){
			res.status(401).send('ocurrio un error al crear la tarea');
		}else{
			res.status(200).send('La tarea se creo correctamente');
		}
	})
})

router.put('/modificarTarea', (req, res) =>{
	console.log('entro modificar');
	res.status(200).send('Se modificó la tarea');
})

router.delete('/eliminarTarea', (req, res) =>{
	console.log('entro eliminar');
	res.status(200).send('Se eliminó la tarea');
})
app.use('/',router);

app.listen(PORT, ()=>{
	console.log("Node server running on 127.0.0.1:${PORT}");
})


