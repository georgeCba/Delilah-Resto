# Delilah Restó REST API V 1.0.0

_"Delilah Restó" - REST API es el tercer proyecto del curso Full Stack Developer de ACAMICA._
Es aplicacion que implementa una REST API para el manejo de un local de comidas con la cual se puede crear usuarios en una base de datos, realizar un login para realizar pedidos y si se cuentan con privilegios de administrador, tambien se podra gestionar los productos,los pedidos y acceder a toda la base de datos de los usuarios.

## Comenzando 🚀

Para obtener una copia del proyecto te recomendamos clonar el repositorio desde el [siguiente link](https://github.com/george_Cba/delilah-resto).
Desde la consola de git `git clone https://github.com/george_Cba/delilah-resto.git .`


### Pre-requisitos 📋

Para poder probar la API de "Delilah Restó" vas a necesitar tener instalado:
* NODEJS
* XAMPP (por comodidad), sino tambien puede ser LAMPP en Linux.  
* POSTMAN

### Instalación 🔧

* _Primero que nada, instalemos **NODEJS**, para ello visita el sitio de [NodeJS](https://nodejs.org/es/) y descarga la ultima version_
* _Luego instalaremos **XAMPP**, para ello visita el sitio de [apachefrieds](https://www.apachefriends.org/es/index.html) para su descarga ya sea para **Windows/Linux/OS X**_
* _Una vez instalado, ejecuta XAMMP Control Panel y asegurate de tener levantados los servicios de los modulos **Apache** y **MySQL**, este ultimo en el puerto 3306_
* _Para poder hacer las peticiones a nuestra API te recomendamos utilizar **POSTMAN**, hemos creado una coleccion de peticiones para que te sea mas facil entender como funciona nuesta API.**[Descargar]**_
* En este momento podemos instalar las dependencias de nuestro proyecto:
    * express
    * body-parser
    * jsonwebtoken
    * mysql2
    * sequelize
    * nodemon

 _Para ello, desde la **consola** nos posicionamos en nuestro directorio del proyecto y ejecutamos lo siguiente:_
```
npm install
```
_En este momento tenemos casi todo lo necesario para poder comenzar las pruebas, solo nos falta crear la base de datos y las tablas para que la API funcione._

_La manera mas simple de hacerlo, es mediante **phpmyadmin**, para ello desde el **XAMPP Control Panel** podes hacer click sobre el boton **Admin** del modulo **MySQL** y accederas desde el navegador al panel de administracion de nuestra base de datos_

_Otra manera de acceder es pegando en la barra de navegacion de tu navegador web lo siguiente:_
```
http://localhost:80/phpmyadmin/
```
_Por defecto el servidor **Apache** se instala en el puerto 80, pero podria ser el puerto que configures_

_Ya en en navegador, en la pantalla principal de **phpmyadmin** podras ir al boton **Importar**, luego en la seccion "Archivo a importar" haz click sobre el boton **Seleccionar archivo** y selecciona el siguiente achivo:_
```
Delilah Resto v1\BD\Documentos\DB creation.sql
```
_Ve al final de la pagina y haz click sobre el boton **Continuar**_
_Esto creara las tablas necesarias para la base de datos agregando **usuarios** y **productos** para poder agilizar las pruebas._

_Por ultimo, si no aparecieron errores durante la instalacion de las dependencias, ejecutaremos el siguiente comando para levantar nuestro **servidor**_

```
nodemon .\server.js
```

_Ya estamos en condiciones de realizar las pruebas, podras dar de alta usuarios,logear un usuario, realizar pedidos y si eres un **Administrador** ademas podras dar de alta nuevos productos, modificar estados de pedidos, acceder a toda la base de datos de **Usuarios** y algunas cosas mas._

## Realizando las pruebas ⚙️

_Para realizar las pruebas te recomendamos [**Postman**](https://www.postman.com/) descarga la ultima version._
_Hemos creado una coleccion de requests para hacer el test de nuestra REST-API. Lo podrás descargar e importar en tu **Postman**_

## Construido con 🛠️

_Para crear este proyecto se utilizaron las siguientes herramientas:_

* [Visual Studio Code](https://code.visualstudio.com/download) - El editor de codigo
* [Postman](https://www.postman.com/) - Para gestionar las pruebas con la API
* [Swagger](https://swagger.io/) -  Para diseñar y documentar nuestra RESTful API.
* [NodeJs](https://nodejs.org/es/) - Para implementar la capa del servidor en javascript de nuestra aplicacion (Backend).
* [ExpressJS](https://www.npmjs.com/package/express) - Framework de aplicación web de back-end para Node.js (Servidor)
* [JWT](https://www.npmjs.com/package/jwt) - Para la creación de tokens de acceso que permiten la propagación de identidad y privilegios para nuestra API.
* [Body-parser](https://www.npmjs.com/package/body-parser) - Middleware para parsear los request body.
* [MySQL2](https://www.npmjs.com/package/mysql2) - Cliente MySQL para Node.js
* [Sequelize](https://www.npmjs.com/package/sequelize) - Sequelize es un ORM (Object-Relational mapping) de Node.js basado en promesas utilizar con nuestra base de datos MySQL. 
* [Nodemon](https://www.npmjs.com/package/nodemon) -  Herramienta que nos ayuda a desarrollar aplicaciones basadas en node.js reiniciando automáticamente la aplicación cuando se detectan cambios de archivo.
* [Git](https://git-scm.com/downloads) - Software de control de versiones.
* [GitHub](https://github.com/) - El servidor para alojar el proyecto utilizando el sistema de control de versiones Git.

## Autor ✒️

_Este proyecto fue realizado para completar los estudios del curso FullStack Developer de **ACAMICA**_

* **Jorge Peirone** - *Delilah Restó V1.0.0 REST-API- Modulo 3 del curso DWFS-COR-14* - [georgeCba](https://github.com/georgeCba)

## Gracias! 🎁

* Quiero agradecer a mis compañeros de cursado y a mis mentores de la carrera, pilares fundamentales para que este proyecto haya sido posible 🤓.

