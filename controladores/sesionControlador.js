const usuariosModelo = require('../modelos/usuariosModelo.js');


exports.obtenerUsuario = (datos, callback) => {
	let query = { "usuario": datos }
	usuariosModelo.obtenerUsuario(query, (err, res) => {
		if(err){
			console.log(err);
		}
		callback(err, res);
	})
}