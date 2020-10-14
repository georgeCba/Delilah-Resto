const {Router} = require('express');
const bodyParser = require('body-parser');
const jsonWebToken = require('jsonWebToken');   //para el manejo de los tokens
const router = Router();

const {getQueryByParam,insertNewUser,goToLoggin,searchUser,allUsers,clientData,updateUserData,deleteUser}=require("../BD/dbquery.js");
const {validateToken,secret4Token}=require("../middleware/middleware");

let adminSecretWord="acamica";


router.use(bodyParser.json());


router.post('/users',(req,res)=>{
    //Se debera poder registrar un usuario a la base de datos.
    //Si existe un usuario con el mismo username o mail, se debera enviar un estado de servidor (XXX) con un mensaje de error
    //Si no existe el usuario se debera responder con un estado de servidor (XXX) con un mensaje de usuario creado correctamente.
    const {username,pwd,name,last_name,adress,email,phone,admin}=req.body;  // obtengo los datos del body de la solicitud
    
    if(username && pwd && name && last_name && adress && email && phone && admin){
        const isInDb=searchUser("users",username,email);
        isInDb.then(resp=>{
            if(resp==false){               //si no lo encuentra lo podemos agregar
                insertNewUser(username,pwd,name,last_name,adress,email,phone,admin,adminSecretWord).then(result=>{
                    console.log(JSON.stringify(result));
                    res.status(200).json({"State":"User successfully added to database"});
                })
            }else{
                res.status(409).json({"State":"Username already exists, please check again"});
            }
         });
    }
    else{res.status(400).json({"State":"Error validating data"});
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/users/login',(req,res)=>{
    //Se debe permitir al usuario hacer un loggin 
    //En caso de matchear username y pass con algun elemento de la base de datos debe debe gestionar un Token 
    //El token generado es distinto segun el tipo de usuario Admin o Client. 

    let userScope;
    
    const {userlog,password}=req.body;
    goToLoggin(userlog,password).then(result=>{
        if(Object.keys(result).length===0){
            res.status(400).json("Error validating data");
        }else{
            if(result[0].admin==="administrador"){
                userScope="admin";
            }else
            {
                userScope="client";
            }
            let tokenData={
                    "userId":result[0].user_id,
                    "username":userlog,                         //Generamos los datos que queremos en el payload del token
                    "Scope":userScope};
                
            const token = jsonWebToken.sign({tokenData},secret4Token,{ expiresIn: 900 });  //Generamos el token expira en 900s=15m
            res.status(200).json(`token:${token}`);
        }
    })
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/users',validateToken,(req,res)=>{
    //Se debe permitir al usuario obtener la informacion de la base de datos de userDB
    //Si el usuario es "Admin" se debe responder con todos los usuarios de la base de datos
    //Si el usuario es "Client" se debe responder solo con los datos del usuario "Client"
    const userdata= req.tokenInfo;
    
    if(userdata.tokenData.Scope==="admin"){
        allUsers(userdata).then(result=>{
            res.status(200).json(result);
        })
    }else{
        clientData(userdata).then(result=>{
            res.status(200).json(result);
        });
    };
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/users/:userId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder obtener los datos de cualquier usuario por el Id
    const userdata= req.tokenInfo;
    const id = req.params.userId;

    if(userdata.tokenData.Scope==="admin"){
        async function getUserId(id){
            const getUser= await getQueryByParam("users", "user_id",id);
            return getUser;
        }
        getUserId(id).then(result=>{
            console.log("Successful operation");
            res.status(200).json(result);
        })
        
    }else{
        res.status(401).json("Usuario no autorizado para esta peticion");
    };
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/users/',validateToken,(req,res)=>{
    //El usuario tanto "Admin" como "Client" deben poder modificar sus propios datos
    const userData= req.tokenInfo;
    const userId=userData.tokenData.userId;
    const {pwd,name,last_name,adress,phone}=req.body;
    updateUserData(pwd,name,last_name,adress,phone,userId).then(result=>{
        console.log(result);
        res.status(200).json("Successful operation");
    })   
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/users/:userId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder modificar los datos de todos los usuarios
    const userData= req.tokenInfo;
    const id = req.params.userId;
    const {pwd,name,last_name,adress,phone}=req.body;

    if(userData.tokenData.Scope==="admin"){
        updateUserData(pwd,name,last_name,adress,phone,id).then(r=>{
            console.log(r);
            res.status(200).json("Successful operation");
        })  
    }else{
        res.status(401).json("Unauthorized user");
    };

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/users/:userId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder eliminar un usuario de la base de datos userDB
    const userData= req.tokenInfo;
    const id = req.params.userId;

    if(userData.tokenData.Scope==="admin"){
        deleteUser(id).then(result=>{
            console.log(result)
            res.status(200).json("User deleted successfully");
        })
    }else{
        res.status(401).json("Unauthorized user");
    };

})

module.exports=router;





