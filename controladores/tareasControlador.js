const tareasModelo = require('../modelos/tareasModelo.js');
const mongoose = require('mongoose');

exports.crearTarea = (datos, callback) => {
	if(datos.user && datos.nombre && datos.tipo_duracion && datos.tiempo_duracion && datos.tiempo_restante  && datos.descripcion){
		let tarea = {
			_id:new mongoose.Types.ObjectId(),
			nombre:datos.nombre,
			tiempo_duracion:datos.tiempo_duracion,
			tiempo_restante:datos.tiempo_restante,
			tipo_duracion:datos.tipo_duracion,
			estatus:'Eliminada',
			descripcion:datos.descripcion,
			historial:[
				{
					_id:new mongoose.Types.ObjectId(),
					nombre:datos.nombre,
					tiempo_duracion:datos.tiempo_duracion,
					tiempo_restante:datos.tiempo_restante,
					tipo_duracion:datos.tipo_duracion,
					estatus:'En cola',
					descripcion:datos.descripcion,
					accion:'Se creó una nueva tarea'
				}
			]
		}
		let usr = {usuario:datos.user}
		tareasModelo.crearTarea(tarea, usr, function(err, res) {
			if(err){console.log(err)};
			callback(err, res);
		})
	}else{
		callback('Faltan datos', false);
	}
}

exports.actualizarTarea = (datos, callback) => {
	console.log('llego aqui');
	if(datos._id){
		let tarea = {
			nombre:datos.nombre,
			tiempo_duracion:datos.tiempo_duracion,
			tiempo_restante:datos.tiempo_restante,
			tipo_duracion:datos.tipo_duracion,
			estatus: datos.estatus,
			descripcion:datos.descripcion
			
		}
		let historial = {
			'$push':{
				historial:{
					_id:new mongoose.Types.ObjectId(),
					nombre:datos.nombre,
					tiempo_duracion:datos.tiempo_duracion,
					tiempo_restante:datos.tiempo_restante,
					tipo_duracion:datos.tipo_duracion,
					estatus:datos.status,
					descripcion:datos.descripcion,
					accion:'Se actualizó'
				}
			}
			
		}

		let id_tarea = {'$and':[{
			usuario:datos.user
			},
			{
				'tareas._id':new mongoose.Types.ObjectId(datos.id_tarea)
			}]
		};
		let info ={
			tarea,
			historial,
			id_tarea
		};
		console.log(info);
		tareasModelo.actualizarTarea(info, (err, result) => {
			console.log(err, result);

			callback(err, result);
		})

			
	}
		
}

exports.eliminarTarea = (datos, callback) => {

}

exports.obtenerListadoTareas = (datos, callback) => {
	if(datos.user){
		tareasModelo.obtenerListadoTareas(datos, (err, res) => {
			if(err){console.log(err)}
			callback(err, res[0]);
		})
	}
}