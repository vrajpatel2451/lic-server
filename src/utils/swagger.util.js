import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

function swaggerIgnite(applicationInstance) {
  const { PORT, APP_PATH } = process.env;
  // Swagger definition
  const swaggerDefinition = {
    info: {
      title: 'REST API for Madhav Insurence', // Title of the documentation
      version: '1.0.0', // Version of the app
      description: 'This is the REST API for LIC App', // short description of the app
    },
    host: `${APP_PATH}:${PORT}`, // the host or url of the app
    basePath: '/api', // the basepath of your endpoint
    schemes: ['https', 'http'],
  };

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./src/routes/*.js'],
  };
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);
  // use swagger-Ui-express for your app documentation endpoint
  applicationInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerIgnite;