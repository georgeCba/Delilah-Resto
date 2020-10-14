const jsonWebToken = require('jsonWebToken');   //para el manejo de los tokens
/////////////////////////////////////////////////////  Middleware
const secret4Token="my_secret_word";                //Palabra que solo debe conocer el servidor para la generacion del token

async function validateToken(req, res, next) {
	const token = req.headers.authorization.split(" ")[1];
    try {
        const verification = jsonWebToken.verify(token, secret4Token); // Verify automaticamente hace el check del exp date.
        req.tokenInfo=verification; //Si puedo verificar el token voy al siguiente path
        next();
		}
	 catch (e) {
		res.status(401).json("Unauthorized user");
	}
}

module.exports = {
    validateToken,
    secret4Token
    };