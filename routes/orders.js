const {Router} = require('express');
const bodyParser = require('body-parser');
const router = Router();

const {insertNewOrder,getOrders,getOrderById,updateState,deleteOrder}=require("../BD/dbquery.js");
const {validateToken,secret4Token}=require("../middleware/middleware");

router.use(bodyParser.json());  

const { json } = require('body-parser');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/orders',validateToken,(req,res)=>{
    //Se debera poder dar de alta una orden a la base de datos de ordenes.

    const userData= req.tokenInfo;
    const {products,payment_method}=req.body;                           // obtengo los datos del body de la solicitud

    if(products && payment_method){

        const Nproducts=Object.keys(products).length;                 //La cantidad de productos que tiene la orden
        const userID=userData.tokenData.userId;                             //El user id de la persona que quiere hacer la orden
        const order_date=new Date().toISOString().slice(0, 19).replace('T', ' ');

        insertNewOrder(userID,"1",order_date,"",0,payment_method,Nproducts,products).then(result=>{
            res.status(200).json("Tu numero de order es: "+result);
        })
    }else{
        res.status(400).json({"State":"Error validating data"});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/orders',validateToken,(req,res)=>{
    //Se debe permitir al usuario obtener la informacion de la base de datos de ordenes
    const userData= req.tokenInfo;

    if(userData.tokenData.Scope==="admin"){
        getOrders().then(result=>{
            res.status(200).json(result);
        })
    }else{
        res.status(401).json("Unauthorized user");
    };
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/orders/:orderId',validateToken,(req,res)=>{
    //Se debe poder acceder una orden por el Id - administrador.
    const id = req.params.orderId;
    const userData= req.tokenInfo;

    if(userData.tokenData.Scope==="admin"){
        getOrderById(id).then(result=>{
            res.status(200).json(result);
        })
    }else{
        res.status(401).json("Unauthorized user");
    };
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/orders/:orderId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder modificar los datos de todos los productos
    const userData= req.tokenInfo;
    const id = req.params.orderId;
    const {order_Status}=req.body;

    if(order_Status){
        if(userData.tokenData.Scope==="admin"){
            updateState(id,order_Status).then(r=>{
                console.log(r);
                res.json("Successful operation");
            })  
        }else{
            res.status(401).json("Unauthorized user");
        };
    }else{
        res.status(400).json({"State":"Error validating data"});
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/orders/:orderId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder eliminar un usuario de la base de datos userDB
    const userData= req.tokenInfo;
    const id = req.params.orderId;
    if(userData.tokenData.Scope==="admin"){
        deleteOrder(id).then(r=>{
            console.log(r);
            res.status(200).json("The Order has been removed from database.");
        })
    }else{
        res.status(401).json("Unauthorized user");
    };
})

module.exports=router;