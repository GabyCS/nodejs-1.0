const tareasModelo = require('../modelos/tareasModelo.js');
const mongoose = require('mongoose');

exports.crearTarea = (datos, callback) => {
	if(datos.usuario && datos.nombre && datos.fecha_inicio && datos.fecha_fin  && datos.descripcion){
		let tarea = {
			_id:new mongoose.Types.ObjectId(),
			nombre:datos.nombre,
			fecha_inicio: new Date(datos.fecha_inicio),
			fecha_fin: new Date(datos.fecha_fin),
			estatus:'En cola',
			descripcion:datos.descripcion,
			historial:[
				{
					_id:new mongoose.Types.ObjectId(),
					nombre:datos.nombre,
					fecha_inicio: new Date(datos.fecha_inicio),
					fecha_fin:new Date(datos.fecha_fin),
					estatus:'En cola',
					descripcion:datos.descripcion,
					accion:'Se creó una nueva tarea'
				}
			]
		}
		let usr = {usuario:datos.usuario}
		tareasModelo.crearTarea(tarea, usr, function(err, res) {
			if(err){console.log(err)};
			callback(err, res);
		})
	}else{
		callback('Faltan datos', false);
	}
}

exports.modificarTarea = (datos, callback) => {
	
}