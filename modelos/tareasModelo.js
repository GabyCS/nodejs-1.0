const mongoose = require('mongoose');
const c = require('../configuracion');
console.log(c.db.conexionMongoDB);
const conn = mongoose.createConnection(c.db.conexionMongoDB, { useNewUrlParser: true });
const tareaSchema = mongoose.Schema(c.db.schemaMongo);
const usuariosModelo = require('./usuariosModelo');
const coleccion = conn.model('sistema_de_tareas', tareaSchema);
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

exports.obtenerListadoTareas = (datos, callback) => {
	let query =[{ "$unwind" : "$tareas"}, 
	        {"$match" : {"$and" : [
	                    { "usuario" : datos.user}, 
	                    {"tareas.estatus" : {"$ne" : "Eliminada"}}
	                ]
	            }
	        }, 
	        {"$group" : {
	                "_id" : {"id" : "_id"}, 
	                "tareas" : {"$push" : "$tareas"}
	            }
	        }, 
	        {"$project" : {
	                "_id" : 0, 
	                "tareas" : 1
	            }
	        }
	    ]
	coleccion.aggregate(query, (err, result) => {
		if(err) console.log(err);
		callback(err, result);
	})
}

exports.actualizarTarea = (info, callback) => {
	console.log('entro aqui');
	coleccion.where(info.id_tarea).update(info.tarea, info.historial).exec((err, result) =>{
		console.log(err, result);
		callback(err, result);
	})
}