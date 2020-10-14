const Sequelize = require("sequelize");
const db = require("../BD/mysql_connection");
/*----------------------------------------------DB QUERYS FOR USERS-------------------------------------------------------------------*/

async function getQueryByParam(table, tableParam,entryParam){

    const resultado=await db.sequelize.query(`SELECT * FROM ${table} WHERE ${tableParam} = :replacementParam`,
                { 
                  replacements: {replacementParam: entryParam}, 
                  type: db.Sequelize.QueryTypes.SELECT,
                  raw: true, 
                  plain: false, 
                  logging: console.log 
                }
  );
  //return console.log(resultado);
  return resultado;
  }
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function goToLoggin(userLog,password){

  const resultado=await db.sequelize.query(`SELECT * FROM users WHERE (username = '${userLog}' OR email='${userLog}') AND pwd='${password}'`,
              { 
                type: db.Sequelize.QueryTypes.SELECT,
                raw: true, 
                plain: false, 
                logging: console.log 
              }
);
  if(Object.keys(resultado).length===0){
    console.log("No coincide el usuario y la contraseña");
    return 0; // False = no se puede loggear 
  }else
  {
    console.log(resultado);
    return resultado;
  }
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function insertNewUser(username,pwd,name,last_name,adress,email,phone,admin,adminSecretWord){
  let isAdmin;
  if(admin===adminSecretWord){
    isAdmin=1; //Enum('administrador','usuario'); 1 = Administrador
  }else{
    isAdmin=2;  //2 = usuario
  }
    const resultado = await db.query(`INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES('${username}', '${pwd}', '${name}','${last_name}', '${adress}','${email}' ,'${phone}',${isAdmin})`);
    return resultado;
  }    
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function searchUser(dataBaseTable,username,email){
  const existing_username= await getQueryByParam(dataBaseTable, "username",username);
  const existing_email= await getQueryByParam(dataBaseTable, "email",email);
  console.log(JSON.stringify(existing_username));
  console.log(JSON.stringify(existing_email));

  if (Object.keys(existing_username).length===0 && Object.keys(existing_email).length===0){
      console.log("El usuario o email puede agregarse a la base de datos");
      return false;
  }else
  {
      console.log("El usuario o email ya existe en la base de datos");
      return true;                   //Si encuentro el mail o username retorno true
  }  
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function allUsers(userdata){
  const allUsersData= await getQueryByParam("users", 1,1);
  return allUsersData;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function clientData(userdata){
  const clientData= await getQueryByParam("users", "user_id",userdata.tokenData.userId);
  return clientData;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function updateUserData(pwd,name,last_name,adress,phone,id){
  const result = await db.query(`UPDATE users SET pwd = '${pwd}',name = '${name}',last_name= '${last_name}',adress = '${adress}',phone = '${phone}' WHERE user_id = ${id}`);
  return result; 
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function deleteUser(id){
  const result = await db.query(`DELETE FROM users WHERE user_id = ${id}`)
  return result;
}
/*----------------------------------------------DB QUERYS FOR PRODUCTS-------------------------------------------------------------------*/
async function getProducts(param,value){
  const allProducts= await getQueryByParam("products", param,value);
  return allProducts;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function searchProduct(productName){
  const existing_product= await getQueryByParam("products", "product_name",productName);
  console.log(JSON.stringify(existing_product));

  if (Object.keys(existing_product).length===0){
      console.log("El producto puede agregarse a la base de datos");
      return false;
  }else
  {
      console.log("El producto ya existe en la base de datos");
      return true;                   //Si encuentro el mail o username retorno true
  }  
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function insertNewProduct(product_name,product_price,product_image,description){
    const resultado = await db.query(`INSERT INTO products(product_name,product_price,product_image,description) VALUES('${product_name}', '${product_price}', '${product_image}','${description}')`);
    return resultado;
  }    
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function updateProductData(product_price,product_image,description,id){
  const result = await db.query(`UPDATE products SET product_price = '${product_price}',product_image = '${product_image}',description= '${description}' WHERE product_id = ${id}`);
  return result; 
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function deleteProduct(id){
  const result = await db.query(`DELETE FROM products WHERE product_id = ${id}`)
  return result;
}
/*----------------------------------------------DB QUERYS FOR ORDERS-------------------------------------------------------------------*/
async function insertNewOrder(user_id,order_status,order_date,order_description,order_amount,payment,Nproducts,productObj){
  const order_id = await db.query(`INSERT INTO orders(user_id,order_status,order_date,order_description,order_amount,payment) VALUES('${user_id}', '${order_status}', '${order_date}','${order_description}','${order_amount}','${payment}')`);
  await insertIntermediaOrder(Nproducts,order_id,productObj)
  //console.log(resultado);
  return order_id;
} 
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function insertIntermediaOrder(Nproducts,order_id,productObj){

  let productDescription="";
  let productInfo=[];
  let subtotal=0;

  for(i=0;i<Nproducts;i++){
    await db.query(`INSERT INTO intermediate_order(order_id,product_id,product_quantity) VALUES('${order_id}', '${productObj[i].product_id}', '${productObj[i].Q}')`);
    productInfo = await getQueryByParam("products", "product_id",productObj[i].product_id);
    productDescription+=productInfo[0].product_name+" x"+productObj[0].Q+" ";
    subtotal+=(productInfo[0].product_price)*(productObj[0].Q);
  }

  await db.query(`UPDATE orders SET order_description = '${productDescription}',order_amount = '${subtotal}' WHERE order_id = ${order_id}`);
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function getOrders(){
  const orders= await db.query(`SELECT users.username,users.adress,orders.order_id,order_status,order_date,order_description,order_amount,payment
                                FROM users INNER JOIN orders ON users.user_id = orders.user_id 
                                ORDER BY  users.username;`);
  return orders;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function getOrderById(order_id){
  const order= await db.query(`SELECT users.username,users.adress,orders.order_id,order_status,order_date,order_description,order_amount,payment
                                FROM users INNER JOIN orders ON users.user_id = orders.user_id WHERE order_id=${order_id}`);
  return order;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function updateState(order_id,status){
  const update=await db.query(`UPDATE orders SET order_status = '${status}' WHERE order_id = ${order_id}`);
  return update;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
async function deleteOrder(id){
  await db.query(`DELETE FROM intermediate_order WHERE order_id = ${id}`)
  const opStatus=await db.query(`DELETE FROM orders WHERE order_id = ${id}`)
  return opStatus;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
module.exports = {
getQueryByParam,
insertNewUser,
goToLoggin,
searchUser,
allUsers,
clientData,
updateUserData,
deleteUser,
getProducts,
searchProduct,
insertNewProduct,
updateProductData,
deleteProduct,
insertNewOrder,
insertIntermediaOrder,
getOrders,
getOrderById,
updateState,
deleteOrder
};
