--  Create database
CREATE DATABASE  IF NOT EXISTS `delilah_resto`;
USE `delilah_resto`;

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `is_admin` tinyint unsigned NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Insert data to table `users`
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'nattury','clave123','Nataly','Rodriguez','Avenida 7-45','natliegash@gmail.com','7030150',1),(2,'nanita','nana2020','Adriana','Moreno','Caracas con 49','nanananita@hotmail.com','2654205',0),(3,'tulioRecomienda','amanteDeLaCocina','Tulio','Zuluaga','Diagonal 26 con 89','tuliorecomienda@yahoo.com','3452323',1),(4,'catamayoq','soyElMejor','Camilo','Tamayo','Portal norte con calle 184','catamayoq@gmail.com','7301212',0);
UNLOCK TABLES;

-- Table structure for table `orders`
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_status` enum('nuevo','confirmado','preparando','encamino','entregado') NOT NULL DEFAULT 'nuevo',
  `order_description` varchar(45) NOT NULL,
  `order_amount` int unsigned NOT NULL,
  `payment_method` enum('efectivo','tarCredito') NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `orders` WRITE;
UNLOCK TABLES;

-- Table structure for table `products`
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `product_price` int unsigned NOT NULL,
  `product_photo` varchar(500) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Insert data to table `products`
LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (1,'Hamburguesa especial',15000,'[https://image.freepik.com/foto-gratis/hamburguesa-carne-res-hamburguesa-verduras-frescas-superficie-oscura_2829-5883.jpg]'),(2,'Gnocchi',38000,'[https://image.freepik.com/foto-gratis/pasta-noquis-estilo-rustico-cocina-italiana-pasta-vegetal-vegetariana-cocinar-almuerzo-plato-gourmet-vista-superior_2829-17219.jpg]'),(3,'Pizza napolitana',43000,'[https://image.freepik.com/foto-gratis/deliciosa-pizza-napolitana-bordo-tomates-cherry-espacio-libre-texto_78826-2849.jpg]'),(4,'Ensalada Cesar',19000,'[https://image.freepik.com/foto-gratis/vista-lateral-ensalada-cesar-pollo-parrilla-tomate-fresco-lechuga-queso-parmesano_141793-4785.jpg]'),(5,'Raviolis',32000,'[https://image.freepik.com/foto-gratis/raviolis-salsas-tomate-queso-rallado-tazon-ceramica-contra-mantel_23-2147926106.jpg]'),(6,'Tiramisu',8000,'[https://image.freepik.com/foto-gratis/postre-tiramissu-menta_1303-9604.jpg]'),(7,'Gelato',7000,'[https://image.freepik.com/foto-gratis/vista-superior-cono-helado-pistacho_23-2148425417.jpg]'),(8,'Pancakes',12000,'[https://image.freepik.com/foto-gratis/imagen-delicioso-desayuno-familia-pancacks-crema-agria-bayas-frescas-magdalenas-decoradas-frambuesas-arandanos_176532-2628.jpg]'),(9,'Coca Cola',4000,'[https://image.freepik.com/foto-gratis/vaso-cola-hielo_1339-2536.jpg]'),(10,'Limonada',5000,'[https://image.freepik.com/foto-gratis/vaso-limonada-casera-menta_1205-738.jpg]');
UNLOCK TABLES;


-- Table structure for table `order_products`
DROP TABLE IF EXISTS `orders_products`;
CREATE TABLE `orders_products` (
  `relationship_id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `product_quantity` int unsigned NOT NULL,
  PRIMARY KEY (`relationship_id`),
  KEY `order_id_idx` (`order_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `orders_products` WRITE;
UNLOCK TABLES;





