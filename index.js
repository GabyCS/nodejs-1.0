const express = require('express');
const session  = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8000
const methodOverride = require('method-override');
const sesionCtrl = require('./controladores/sesionControlador');
const tareasCtrl = require('./controladores/tareasControlador')
const cors = require('cors');

let app = express(); 
app.use(session({
	secret:'477-5HJT-pQr54',
	resave:true,
	saveUninitialized:true
}))
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());


let router  = express.Router();

router.get('/', (req, res)=>{
	if(req.session.user){
		res.status(200).send('Hello World')
	}else{
		res.status(401).send('Inicia sesión');
	}
	
});



router.post('/iniciarSesion', (req, res) => {
	if(req.body.user){
		sesionCtrl.obtenerUsuario(req.body.user, (err, user) => {
			if(user === false || user === null || user === undefined){
				res.status(401).send({err:'el usuario no existe', res:false});
			}else{
				req.session.user=user.usuario;
				res.status(200).send({err:false, res:user.usuario})
			}
		})
	}else{
		res.status(401).send('falta informacion');
	}
	
})

router.post('/cerrarSesion', (req, res) => {
	req.session.destroy();
	res.status(200).send({err:false, res:'la sesion fue destruida'});
})

router.get('/obtenerListadoTareas', (req, res) => {
    
    res.setHeader('mode','no-cors');
	if(req.headers.authorization){
		tareasCtrl.obtenerListadoTareas({user:req.headers.authorization}, (err, listado) =>{
			if(err){
				res.status(401).send(err);
			}else{
				res.status(200).send({err:false, res:listado});
			}
		})
	}else{
		res.status(403).send('no tienes acceso');
	}
})

router.get('/tareas/:id_tarea', (req, res) => {
	if(req.headers.authorization){

		tareasCtrl.obtenerTarea(req.params, (err, tarea) => {
			if(err){
				res.status(401).send(err);
			}else{
				res.status(200).send(tarea);
			}
		})
	}else{
		res.status(403).send('no tienes acceso');
	}
	
})

router.get('/historial/:id_tarea', (req, res) =>{
	tareasCtrl.obtenerHistorial(req.params, (err, historial) => {
		if(err){
			res.status(401).send(err);
		}else{
			res.status(200).send(historial);
		}
	})
})

router.put('/crearTarea', (req, res) =>{
	if(req.headers.authorization){
		tareasCtrl.crearTarea(req.body, req.headers.authorization, (err, tarea) => {
			if(err){
				res.status(401).send('ocurrio un error al crear la tarea');
			}else{
				res.status(200).send({err:false,res:'La tarea se creo correctamente'});
			}
		})
	}else{
		res.status(403).send('No tienes acceso');
	}
	
})

router.put('/actualizarTarea', (req, res) =>{
	if(req.body.user){
		tareasCtrl.actualizarTarea(req.body, (err, tarea) => {
			if(err){
				res.status(401).send('Ocurrio un error al actualizar');
			}else{
				res.status(200).send('La tarea se actualizó correctamente');
			}
		})
	}else{
		res.status(403).send('No tienes acceso');
	}
})

router.delete('/eliminarTarea', (req, res) =>{
	if(req.body.user){
		tareasCtrl.eliminarTarea(req.body, (err, tarea) => {
			if(err){
				res.status(401).send('Ocurrio un error al actualizar');
			}else{
				res.status(200).send('La tarea se elimino correctamente');
			}
		})
	}else{
		res.status(403).send('No tienes acceso');
	}
})
app.use('/',router);

app.listen(PORT, ()=>{
	console.log("Node server running on 127.0.0.1:${PORT}");
})


