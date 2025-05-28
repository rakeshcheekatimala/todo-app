const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'API documentation for the Todo List application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:4300',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the todo'
            },
            title: {
              type: 'string',
              description: 'The title of the todo'
            },
            description: {
              type: 'string',
              description: 'The description of the todo'
            },
            isCompleted: {
              type: 'boolean',
              description: 'The completion status of the todo',
              default: false
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation date of the todo'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    }
  },
  apis: ['./src/index.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec; 