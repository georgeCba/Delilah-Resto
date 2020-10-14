-- Drop database
DROP DATABASE IF EXISTS delilah_resto;
-- Create Database
CREATE DATABASE delilah_resto;
USE delilah_resto;
-- Table Creation
CREATE TABLE `users` (
  `user_id` INT unsigned AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `admin` enum('administrador','usuario'),
  PRIMARY KEY (`user_id`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `orders` (
  `order_id` INT unsigned NOT NULL AUTO_INCREMENT,
  `user_id` INT unsigned NOT NULL,
  `order_status` enum('recibido','preparando','enviado','entregado'),
  `order_date` TIMESTAMP NOT NULL,
  `order_description` varchar(500),
  `order_amount` FLOAT NOT NULL,
  `payment` enum('credito','debito','mercado_pago','efectivo'),
  PRIMARY KEY (`order_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `products` (
  `product_id` INT unsigned AUTO_INCREMENT,
  `product_name` varchar(60) NOT NULL,
  `product_price` FLOAT NOT NULL,
  `product_image` varchar(300),
  `description` varchar(200),
  PRIMARY KEY (`product_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `intermediate_order` (
  `intermediate_order_id` INT unsigned AUTO_INCREMENT,
  `order_id` INT unsigned,
  `product_id` INT unsigned,
  `product_quantity` INT NOT NULL,
  PRIMARY KEY (`intermediate_order_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert users in database for test
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Heidi','ECQ67YLC8BR','Neil','Manning','5510 Nullam Street','velit.in.aliquet@blanditmattis.com','1-454-568-2475',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Alvin','GIT01AJB4QW','Jada','Serrano','749-2954 Laoreet St.','feugiat.Lorem@acorciUt.edu','1-950-757-7240',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Nichole','JHQ54KDL5NN','Mariam','Mcintosh','P.O. Box 547, 999 Quisque Rd.','Sed.id.risus@turpisNulla.com','1-852-599-2475',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Reece','YAL98YSG6TZ','Kathleen','Harmon','Ap #405-5881 Vestibulum Ave','malesuada@massa.org','1-518-954-4479',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Nina','PFG84FUG8XC','Hiram','Wells','302-8740 Auctor, Av.','tempor.erat.neque@utpharetrased.net','1-313-953-4052',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Castor','LRL42OFW8MJ','Armand','Jennings','1113 Commodo Road','dui.Cum.sociis@turpis.ca','1-866-571-4059',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Kadeem','ZAP60NDN5VE','Vera','Hensley','487-2993 Mus. Av.','lorem.luctus@egestas.edu','1-258-710-5160',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Davis','VTD82YSI1DI','Gay','Wooten','P.O. Box 492, 2976 Pellentesque Rd.','leo.elementum@turpis.co.uk','1-385-722-2896',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Vielka','RTF98VEL2KV','Audrey','Hopper','873-9845 Interdum St.','tincidunt.Donec@gravida.ca','1-912-686-4301',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Phelan','HGM18AVN7XM','Alea','Oneill','7878 Eget, Avenue','vehicula.Pellentesque@pedeultrices.ca','1-119-208-8903',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Travis','VGX46OME1IS','Wendy','Suarez','Ap #500-7787 Consectetuer Rd.','diam@metus.com','1-978-752-9901',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Oleg','XNZ44MJG6BK','Marshall','Sanders','Ap #769-2164 Eget Rd.','diam.lorem.auctor@nonmagnaNam.co.uk','1-301-132-2444',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Ruby','FDB11QKH5IO','Hayley','Malone','9515 Euismod Road','eu.tempor@hendreritDonecporttitor.com','1-290-800-2831',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Gabriel','BIU53CRN5UO','Myles','Henry','7536 Ut Road','orci@tincidunt.com','1-962-440-3108',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Stone','CNR79AZH4RR','Ezekiel','Dejesus','399-4290 Turpis Avenue','Donec@loremauctorquis.org','1-459-280-8621',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Knox','KTF79HDM3DC','Leonard','Shepherd','P.O. Box 624, 6749 Lectus Avenue','odio@Suspendisse.co.uk','1-306-255-4621',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Ulysses','ZDP52MMM4XJ','Julie','Schultz','716-3782 Nulla Ave','lorem.semper@non.ca','1-256-233-6965',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Nigel','JEV33WSM6ZI','Lars','Marsh','Ap #321-6328 Penatibus St.','eu.arcu@idsapien.ca','1-328-610-7845',1);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Hoyt','NYN61EPW5ES','Zachery','Larsen','P.O. Box 942, 2939 Aenean St.','nec@Nunc.co.uk','1-112-705-8623',2);
INSERT INTO users(username,pwd,name,last_name,adress,email,phone,admin) VALUES ('Nadine','TOE14YKW4GK','Gage','Rowe','Ap #722-6566 Egestas. Av.','est@nullaCras.ca','1-405-105-6863',2);
-- Insert products in database for test
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Shawarma',300,'https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg','Shawarma es un plato de la Gastronomía de Medio Oriente que se prepara cortando finas rebanadas de carne apiladas en forma de cono y asadas en un asador vertical que gira lentamente.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Tortilla Española',250,'https://www.themealdb.com/images/media/meals/quuxsx1511476154.jpg','La tortilla española —también llamada tortilla de papas en Hispanoamérica y Canarias— es una tortilla ​ con papas aunque también se le puede añadir más ingredientes como cebolla.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Tacos',350,'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg','Un taco es una preparación mexicana​ que en su forma estándar consiste en una tortilla enrollada que contiene algún alimento dentro y algún tipo de salsa.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Espageti Mediterraneo',370,'https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg','El espagueti es un tipo de pasta italiana elaborada con harina de grano duro y agua tiene como agregado frutos de mar como calamares y camarones.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Hamburguesa completa',375,'https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg','Una hamburguesa es un tipo de sándwich hecho a base de carne molida aglutinada en forma de filete cocinado a la parrilla o a la plancha aunque también puede freírse u hornearse.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Guiso Argentino',366.50,'https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg','Un guiso es la cocción en un medio semigraso de un o varios alimento. Consiste en preparar los alimentos haciéndolos cocer en una salsa después de rehogados.​');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Canelones de ricota',323.70,'https://www.themealdb.com/images/media/meals/wspuvp1511303478.jpg','Los canelones son una pasta ancha de forma rectangular que se emplea a menudo en la cocina italiana para hacer platos con carne picada verdura queso y espinacas o incluso pescado en su interior.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Ensalada de atun',334,'https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg','La ensalada de atún es una mezcla de típicamente tres ingredientes: atún huevo y algún tipo de mayonesa o sucedáneo como mostaza.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Pancakes',250,'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg','El panqueque es una especie de crepe utilizado en las cocinas argentina chilena uruguaya y paraguaya para hacer preparaciones dulces.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Budin de pan',265,'https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg','El budín de pan es un postre popular en las cocinas de diversos países de todo el mundo. El budín de pan no debe confundirse con el budín de pan y mantequilla.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Sprite 1l',160,'https://www.thecocktaildb.com/images/ingredients/Lemon-lime%20soda.png','Gaseosa Sprite de 1 litro.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Coca Cola lata',60,'https://www.thecocktaildb.com/images/ingredients/Coca-Cola.png','Gaseosa Coca Cola en lata de 500ml.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Schweppers 1l',150,'https://www.thecocktaildb.com/images/ingredients/Tonic%20Water.png','Agua tonica Schweppers de 1 litro.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Soda 1l',100,'https://www.thecocktaildb.com/images/ingredients/Soda%20Water.png','Agua con gas marca Polar de 1l.');
INSERT INTO products(product_name,product_price,product_image,description) VALUES ('Campari 1.5l',250,'https://www.thecocktaildb.com/images/ingredients/Campari.png','Campari es una bebida alcohólica de grado medio tonificante y refrescante calificable como aperitivo de característico color rojo y sabor amargo.');