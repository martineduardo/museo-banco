var con = require('../BD_Conexion');
const mysql = require('mysql');
const res = require('express/lib/response');

class TransaccionRepositorio{
    guardar(Datos) {
        //var Datos  = {id_transaccion: 1, Fecha: mysql.raw('NOW()'), Monto: 20000.00, NumCuenta: 6341090898};
        //Datos.Fecha =  mysql.raw('NOW()');
        
        //Experimento #1
        var query2 = con.query("SELECT numTarjeta FROM Tarjeta WHERE numTarjeta = "+ Datos.tarjetaDestino, function (err, rows){
            console.log(query2);
            var tarjeta = rows[0].numTarjeta;
            if(tarjeta == Datos.tarjetaDestino){
                var query = con.query('INSERT INTO transaccion SET ?', Datos, function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                    });
                    console.log(query.sql); // INSERT INTO transaccion SET `id` = 1, `title` = 'Hello MySQL'
            }
        });
    }

    async enviar(id, fecha){
        const callback = new Promise((resolve, reject) => (
            con.query(
                'SELECT * FROM transaccion WHERE Tarjetaorigen = ? AND fecha = ?',
                [id,
                fecha],
                function (error, results, fields) {
                    if (error) reject(error);
        
                    resolve(results);
                }
            ))
        )
        return callback.then(res => res).catch(err => {throw err})
        
    }
    
}


module.exports = TransaccionRepositorio; 