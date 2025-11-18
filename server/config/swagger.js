import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Recruiter API",
      version: "1.0.0",
    },
    servers: [{ url: "/api" }],
  },
  apis: ["./src/routes/*.js"], // you can annotate routes with JSDoc later
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
