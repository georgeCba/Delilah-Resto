const {Router} = require('express');
const bodyParser = require('body-parser');

const router = Router();

const {getProducts,searchProduct,insertNewProduct,updateProductData,deleteProduct}=require("../BD/dbquery.js");
const {validateToken,secret4Token}=require("../middleware/middleware");

router.use(bodyParser.json());  


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/products',validateToken,(req,res)=>{
    //Se debe permitir al usuario obtener la informacion de la base de datos de productos
    getProducts(1,1).then(result=>{
        res.status(200).json(result);
    })
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/products/:productId',validateToken,(req,res)=>{
    //Se debe poder acceder al catalogo de productos por el Id de producto tanto cliente como administrador.
    const id = req.params.productId;
    getProducts("product_id",id).then(result=>{
        res.status(200).json(result);
    })
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/products',validateToken,(req,res)=>{
    //Se debera poder dar de alta un producto a la base de datos de productos.
    //Si existe un producto con el mismo nombre, se debera enviar un estado de servidor (XXX) con un mensaje de error
    //Si no existe el producto se debera responder con un estado de servidor (XXX) con un mensaje de producto creado correctamente en DB.
    const userData= req.tokenInfo;
    const {product_name,product_price,product_image,description}=req.body;        // obtengo los datos del body de la solicitud

    if(userData.tokenData.Scope==="admin"){  
        if(product_name && product_price && product_image && description){
            const isInDb=searchProduct(product_name);
            isInDb.then(resp=>{
                if(resp==false){               //si no lo encuentra lo podemos agregar
                    insertNewProduct(product_name,product_price,product_image,description).then(result=>{
                        console.log(JSON.stringify(result));
                        res.status(200).json({"State":"Product successfully added to database."});
                    })
                }else{
                    res.status(409).json({"State":"A product with that name already exists."});
                }
             });
        }
        else{res.status(400).json({"State":"Error validating data"});
        }
    }else{
        res.status(401).json("Unauthorized user");
    };
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/products/:productId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder modificar los datos de todos los productos
    const userData= req.tokenInfo;
    const id = req.params.productId;
    const {product_price,product_image,description}=req.body;

    if(userData.tokenData.Scope==="admin"){
        updateProductData(product_price,product_image,description,id).then(result=>{
            console.log(result);
            res.status(200).json("Successful operation");
        })  
    }else{
        res.status(401).json("Unauthorized user");
    };
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/products/:productId',validateToken,(req,res)=>{
    //Si el usuario es "Admin" debe poder eliminar un producto de la base de datos userDB
    const userData= req.tokenInfo;
    const id = req.params.productId;

    if(userData.tokenData.Scope==="admin"){
        deleteProduct(id).then(result=>{
            console.log(result);
            res.status(200).json("Status:The Product has been removed from database.");
        })
    }else{
        res.status(401).json("Unauthorized user");
    };
})

module.exports=router;





