/*
npm i express morgan 

Anexar "start": "nodemon index.js" en package.json
*/

const express = require("express");

var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* CORS <-> seteo manual
app.use((req, res, next) => {
  const origin = req.headers.origin;
  //TODO: HACER pruebas modificando las urls http://localhost:7555 por ejemplo
  //! Para ello RECORDAR es necesario CORTAR y volver a LEVANTAR el BACK (server)
  // Define los dominios permitidos
  const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"]; //* 5173 es a quien damos permiso del lado del client
  // Verifica si el origen de la solicitud está en la lista de dominios permitidos
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Agregado "Authorization" para mantener sesión abierta con token
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
  next();
});

//* Habilitar todas las CORS usando la librería "cors"
// const cors = require("cors");
// app.use(cors());

//* connect Routes <-> para modularizar las routes
// app.use("/", routes);

//* GET BIENVENIDA
app.get("/", function (req, res, next) {
  console.log("REQ --> ", req);
  res.status(200).json({
    success: true,
    message: "Bienvenidos a CODERHOUSE SERVER en NODE JS",
  });
});

//* GET ALL-PRODUCTS
const allProducts = require("./db/products.json");
app.get("/all_products", function (req, res, next) {
  try {
    if (allProducts && Object.keys(allProducts).length > 0) {
      res.status(200).json({
        success: true,
        products: allProducts,
      });
    } else {
      res.status(200).json({
        success: true,
        products: [],
        message: "La lista de productos se encuentra vacía",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: true,
      message: `ERROR: ${error}`,
    });
  }
});

//* POST DATA BY BODY
app.post("/data_by_body", function (req, res, next) {
  try {
    console.log("--- IN POST DATA BY BODY ---");
    console.log("REQ --> ", req);
    console.log("req.BODY ::: ", req.body);
    const { id, category, name, price, stock, description } = req.body;
    const newProduct = {
      id,
      category,
      name,
      price,
      stock,
      description,
    };
    allProducts.unshift(newProduct);
    res.status(200).json({
      success: true,
      message: "Nuevo producto agregado",
      products: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error al agregar un nuevo producto, ${error}`,
    });
  }
});

//* POST DATA DE FORM (input/s) + BY BODY
app.post("/data_form_by_body", function (req, res, next) {
    try {
        console.log("--- FORM IN POST DATA FORM PREV and next BY BODY ---");
        console.log("REQ --> ", req);
        console.log("req.BODY ::: ", req.body);
        const { id, category, name, price, stock, description } = req.body;
        const newProduct = {
          id,
          category,
          name,
          price,
          stock,
          description,
        };
        allProducts.unshift(newProduct);
        res.status(200).json({
          success: true,
          message: "Nuevo producto agregado",
          products: allProducts,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: `Error al agregar un nuevo producto, ${error}`,
        });
      }
});


module.exports = {
  app,
};






/*
!Por la complejidad de implementar el manejo extra de ERROR de las CORS y el tiempo no lo anexo a la clase de muestra
//* Para establecer el motor de plantillas predeterminado (para cuando corre createError de "http-errors")
// Importa el módulo de EJS
const ejs = require("ejs");

// Configura Express para usar EJS como motor de plantillas
app.set("view engine", "ejs");
//* Middelware para manejo de error tras no ingresar en ninguna ruta
// catch 404 and forward to error handler
//! y debe estar al final de todas las routes
app.use(function (req, res, next) {
  next(createError(404));
});

//* Error Handler -> Middelware para manejo de error tras no ingresar en ninguna ruta
//! y debe estar al final de todas las routes
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
*/
