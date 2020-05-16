import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const router = express.Router()
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Time to document that Express API you built',
      version: '0.1.0',
      description:
          'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: ['./src/routes.ts']
}
const specs = swaggerJsdoc(options)
router.use('/', swaggerUi.serve)

router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true
  })
)
export = router
