const jwt = require('jsonwebtoken');


// El modulo jsonwebtoken no trabaja con promesa. Entonces
// Para usar el await en el auth "const token = await generarJWT(usuario.id)" es necesario crear una promesa. 
const generarJWT = ( uid = '' ) => {

    return new Promise((resolve, reject) => {
        
        const payload ={ uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        },(err,token) =>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        } )
    })

}




module.exports = {
    generarJWT
}



