const express = require('express');
const bodyParser = require('body-parser');
const db = require("./BD/mysql_connection");


const app = express();


//settings
app.set('port', process.env.PORT || 3000);                 //Pregunto si el servidor me asigno un puerto uso ese sino seteo el puerto 3000, es para el caso de querer subirlo a la nube.        

//middlewares
app.use(bodyParser.json())                                //Para trabajar con archivos de tipo JSON

app.use(function(err, req, res, next) {                          //Middleware para manejar error de sintaxis del json body request.
  // our function to catch errors from body-parser
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ code: 400, message: "Error validating data" });
  } else next();
});

// Routes
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/api/v1/",userRoutes);
app.use("/api/v1/",productRoutes);
app.use("/api/v1/",orderRoutes);

db.init()                                                           //Comprobamos la conexion a la base de datos!
.then(async () => {
    console.log("Conexion exitosa a la base de datos!");
    //Starting the server
    app.listen(app.get('port'), ()=>{
    console.log("El servidor esta activo en el puerto 3000!");
})
 }).catch((err) => {
   console.log('Error al conectar a la base de datos', err);
   console.log("El servidor no esta activo por error de conexion con base de datos");
 });  
