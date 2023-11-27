<h1>ecommerce-server</h1>
<h3>Objetivos generales</h3>
Crear una API capaz de establecer conexión con un clúster remoto en MongoDB. Interactuar con la base de datos mediante la implementación de un MVC donde el controlador reciba las peticiones del cliente e implemente la lógica de negocio necesaria para llamar al repositorio y obtener una respuesta de la DB. Crear los modelos y las llamadas para usuario, autenticación, producto, carrito y check-out. 
<h3>Tecnologías empleadas</h3>
Javascript, NodeJs, ExpressJs, BCrypt, JsonWebToken, MongoDB, Mongoose, CORS, Dotenv.
<h3>Alcances y limitaciones</h3>
Permitir al usuario crear su usuario e iniciar sesión, autenticar su sesión y añadir productos al carrito, modificarlo o eliminarlo. Obtener una lista de usuarios y usuario mediante su _id. Al usuario logueado, permitirle obtener sus datos, modificarlos y eliminarlos. Crear un producto, modificarlo y eliminarlo. Obtener una lista de todos los productos y un sólo producto a través de su _id. Al usuario logueado, crear un carrito de compra al añadir un primer producto, modificar su carrito y eliminarlo así como también visualizarlo mediante su _id. Realizar el check-out. TODO: autenticar rutas del check-out.
[Deploy]:(https://e-commerce-api-bwhg.onrender.com)
