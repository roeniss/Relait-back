import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  info: {
    title: "Relait Backend API",
    version: "1.0.0",
    description: "Relait에서 사용하는 API 리스트입니다.",
  },
  host: "3.136.159.199:9000",
  basePath: "/",
  schemes: ["http"],

  tags: [
    {
      name: "Auth",
      description: "유저 관련",
    },
    {
      name: "Seat",
      description: "자리 관련",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["**/routes/*Router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
