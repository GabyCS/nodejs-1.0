const mongoose = require('mongoose');
const c = require('../configuracion');
console.log(c.db.conexionMongoDB);
const conn = mongoose.createConnection(c.db.conexionMongoDB, { useNewUrlParser: true });
const tareaSchema = mongoose.Schema(c.db.schemaMongo);
const usuariosModelo = require('./usuariosModelo');

exports.crearTarea = (tarea, usuario, callback)=>{
	usuariosModelo.obtenerUsuario(usuario, (err, usr) => {
		console.log(tarea);
		if(usr.tareas && usr.tareas.length >= 0){
			console.log('entro aqui');
			usr.tareas.push(tarea);
		}else{
			usr.tareas = tarea;
		}
		console.log(usr);
		usr.save((err, res) =>{
			if(err) throw err;
			console.log('Se agrego la tarea exitosamente');
			callback(err, res);
		})
	} )
}