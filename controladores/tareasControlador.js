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
	if(datos){
		let tarea = {
			'tareas.$.nombre':datos.nombre,
			'tareas.$.tiempo_duracion':datos.tiempo_duracion,
			'tareas.$.tiempo_restante':datos.tiempo_restante,
			'tareas.$.tipo_duracion':datos.tipo_duracion,
			'tareas.$.estatus': datos.estatus,
			'tareas.$.descripcion':datos.descripcion
		}
		let historial = {
			'tareas.$.historial':{
				'_id':new mongoose.Types.ObjectId(),
				'nombre':datos.nombre,
				'tiempo_duracion':datos.tiempo_duracion,
				'tiempo_restante':datos.tiempo_restante,
				'tipo_duracion':datos.tipo_duracion,
				'estatus':datos.estatus,
				'descripcion':datos.descripcion,
				'accion':'Se actualizó'
			}
		}

		let where = {usuario:datos.user,'tareas._id': mongoose.Types.ObjectId(datos.id_tarea)};
		let info ={
			tarea,
			historial,
			where
		};
		tareasModelo.actualizarTarea(info, (err, result) => {
			if(err){console.log(err)};
			if(result.nModified > 0){
				callback(err,'Se actualizó el registro');
			}else{
				callback(err, 'No hubó actualizaciones');
			}
			
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