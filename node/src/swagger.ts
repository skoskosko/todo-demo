import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const router = express.Router()
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo template api documentation',
      version: '0.1.0',
      description:
          'Simple api for handling notes',
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
        url: 'http://localhost:8080/api'
      }
    ]
  },
  apis: ['./src/routes.ts', './src/entity/note.ts']
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
