const mongoose = require('mongoose');
const c = require('../configuracion');
console.log(c.db.conexionMongoDB);
const conn = mongoose.createConnection(c.db.conexionMongoDB, { useNewUrlParser: true });
const tareaSchema = mongoose.Schema(c.db.schemaMongo);
const usuariosModelo = require('./usuariosModelo');
const coleccion = conn.model('sistema_de_tareas', tareaSchema);
exports.crearTarea = (tarea, usuario, callback)=>{
	usuariosModelo.obtenerUsuario(usuario, (err, usr) => {
		if(usr.tareas && usr.tareas.length >= 0){
			console.log('entro aqui');
			usr.tareas.push(tarea);
		}else{
			usr.tareas = tarea;
		}
		usr.save((err, res) =>{
			if(err) throw err;
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
	coleccion.updateOne(info.where,{'$set':info.tarea,'$addToSet':info.historial}).exec((err, result) =>{
		callback(err, result);
	})
}