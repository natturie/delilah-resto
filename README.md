# Backend de Delilah Restó 🍕

Proyecto final de Desarrollo Web Full Stack de Acamica y Globant.***

### Una API que permitirá administrar su propio restaurate

## Para comenzar 

Puedes descargar el repositorio en Github https://github.com/nattury/delilah-resto

o clonarlo:
$ git clone https://github.com/nattury/delilah-resto.git

### Pre-requisitos 

### Se deben instalar los siguientes programas:

### Node.js

Para [Node.js], Se puede descargar en (https://nodejs.org/) 

### Npm

La libreria publica es [npm](https://www.npmjs.com/), seguir los pasos en  ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Postman 

Para descargas en [Postman](https://www.postman.com/) - Herramienta para interactuar con APIs y realizar pruebas.

### Visual Studio Code

Para descargas en [VisualStudioCode](https://code.visualstudio.com/)

### MySql Community Server

Para descargas en en https://dev.mysql.com/downloads/mysql/ y escoger la version segun tu sistema operativo.

### MySql Workbench:

Interfaz grafica de MySQl. Configura los datos de conexion de la Base de Datos.

## Intalación de dependencias

En la terminal del Visual npm i o npm install

## Configuración Base de Datos

Los datos de la configuracion de la conexion, se ven aqui: 

![](/configmysql.jpg)

## Configuración automática

Despues de configurar la conexión en mi MySQL, en la terminal poner

cd baseDatos/setup
node index.js

Así se creará el esquema de la Base de datos de Delilah Restó, las tablas y también se importarán los datos de los usuaruios y productos contenitos en datasets.

## Ejecutar la API
Para volver a la carpeta principal del proyecto, ponermos en la terminal 
cd .. 
node index.js 

Esperar confirmación del Inicio del Servidor.

### Servidor Local
http://localhost:/v1/3000/

### Rutas:

### Usuarios.

**POST** /usuarios | Crear nuevo usuario.  
*ejemplo: http://localhost:3000/v1/usuarios/*

{
  "username": "super_mario",
  "firstname": "Mario",
  "lastname": "Bros",
  "password": "thankyoumario",
  "email": "mariobros@gmail.com",
  "address": "calle de la Luna",
  "phone_number": "2654477", 
  "is_admin": "1"
}

**POST** /login | Autenticar usuario.  
*ejemplo: http://localhost:3000/v1/usuarios/login*

{
  "username": "nattury",
  "password": "clave123"
}

**GET** /usuarios | Listar usuarios existentes.  | Solo se puede ver con el rol de  ADMINISTRADOR 
*ejemplo: http://localhost:3000/v1/usuarios/*
  

### Productos:  
  
  
**POST** /productos | Crear producto  | Solo el administrador puede crear un nuevo prodcto
*ejemplo: http://localhost:3000/v1/productos*

{
  "product_name": "Hmburguesa vegetariana",
  "product_photo": "[https://www.rachaelraymag.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTQ5MzEwMjU1NDI2MTg0NjQ1/double-cheeseburgers-with-special-ranch-0917-103053997.webp,https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/square-lauren-1558620434.png?crop=1xw:1xh;center,top&resize=768:*]",
  "product_price": 28000
}

**GET** /productos | Listado de todos los productos de Delilah Resto.  
*ejemplo: http://localhost:3000/v1/productos*

**PUT** /productos/{id} | Modifica un producto por su id. | Permitido solo para el administrador
*ejemplo: http://localhost:3000/v1/productos/2*
{
    "product_price": 111100
}

**DELETE** /productos/{id} | Borra un producto por id.  |  Permitido solo para el administrador
*ejemplo: http://localhost:3000/v1/productos/2*  
  
    

### Pedidos:  
  
  

**POST** /pedidos | Crear pedidos.  
*ejemplo: http://localhost:3000/v1/pedidos*

{
  "username": "nanita",
  "products":[{"productId" : 3, "quantity" : 1}, {"productId" : 2, "quantity" : 1}],
  "payment_method": "efectivo"
} 

**GET** /pedidos | Lista todos los pedidos de Delilah Resto.  |  Permitido solo para el administrador
*ejemplo: http://localhost:3000/v1/pedidos*

**PUT** /pedidos/{id} | Editar estado pedidos.|  Permitido solo para el administrador
*ejemplo: http://localhost:3000/v1/pedidos/1*  

{
  "status": "preparando"
}

**DELETE** /pedidos/{id} | Borrar pedidos. |  Permitido solo para el administrador
*ejemplo: http://localhost:3000/v1/pedidos/1*

## Dependencias utilizadas

- jsonwebtoken versión 8.5.1
- express versión 4.17.1
- mysql2 
- csv-parser versión 2.3.2
- sequelize  versión 5.21.5
- CORS versión 2.8.5

## Herramientas utilizadas

* [Visual Studio Code](https://code.visualstudio.com/) - El editor de codigo usado.
* [Mysql Workbench](https://www.mysql.com/products/workbench/) - Interfaz Gráfica de mysql.
* [Postman](https://www.postman.com/) - Herramienta para interactuar con APIs.
* [Trello](https://trello.com/b/KjGfIKwQ/tareas-clases) - Herramienta para Organizar actividades.
* [Swagger](https://editor.swagger.io/) - Herramienta para generar la especificacion y muchas cosas mas.

## Licencia 

Este proyecto está bajo la Licencia (MIT)
