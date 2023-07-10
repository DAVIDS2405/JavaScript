import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Vet",
      version: "1.0.0",
      descripcion: "Documentation Api Vet",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormar: "JWT",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-API-Key",
        },
      },
    },
    security:[{
      bearerAuth:[],
      apiKeyAuth:[]
    }]
  },
  apis: ["src/routers/*.js", "src/database.js"],
};

const specs = swaggerJSDoc(options);

const SwaggerV1 = (app) =>{
    app.use('/api/apis-docs',swaggerUi.serve, swaggerUi.setup(specs));
    console.log("Api Docs in http://localhost:3000/api/apis-docs")
}

export default SwaggerV1