const mongoose = require('mongoose');
module.exports=(function() {
	const conexionMongoDB = 'mongodb://gaby_casillas:HerokuCa$illas7@ds137611.mlab.com:37611/heroku_n2h2smts';
	const schemaMongo = {
		_id:mongoose.Schema.Types.ObjectId,
		usuario:String,
		nombre:String,
		tareas:[
			{
				_id:mongoose.Schema.Types.ObjectId,
				nombre:{
					type:String,
					required:true
				},
				fecha_inicio:{
					type:Date,
					required:true
				},
				fecha_fin:{
					type:Date,
					required:true
				},
				estatus:{
					type:String,
					required:true
				},
				descripcion:{
					type:String,
					required:true
				},
				fecha_creacion:{
					type:Date,
					default:Date.now,
					required:true
				},
				historial:[
					{
						_id:mongoose.Schema.Types.ObjectId,
						nombre:{
							type:String,
							required:true
						},
						fecha_inicio:{
							type:Date,
							required:true
						},
						fecha_fin:{
							type:Date,
							required:true
						},
						estatus:{
							type:String,
							required:true
						},
						descripcion:{
							type:String,
							required:true
						},
						fecha_creado:{
							type:Date,
							default:Date.now,
							required:true
						}

					}
				]
			}
		]
	};

	return{
		'db':{
			conexionMongoDB:conexionMongoDB,
			schemaMongo:schemaMongo
		}
	}

})();