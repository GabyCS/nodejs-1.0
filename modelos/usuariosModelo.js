const mongoose = require('mongoose');
const c = require('../configuracion');
console.log(c.db.conexionMongoDB);
const conn = mongoose.createConnection(c.db.conexionMongoDB, { useNewUrlParser: true });
const tareaSchema = mongoose.Schema(c.db.schemaMongo);

exports.obtenerUsuario = (datos, callback) =>{
	console.log(datos);
	const coleccion = conn.model('sistema_de_tareas', tareaSchema);
	coleccion.findOne(datos, (err, docs) => {
		if(err){
			console.log(err);
		}
		callback(err, docs);
	})
}

