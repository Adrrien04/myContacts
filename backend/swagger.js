import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "MyContacts API",
  },
  host: "localhost:5000",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Entrez le token JWT: Bearer <token>",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
