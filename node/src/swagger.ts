import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const router = express.Router()
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo api documentation',
      version: '0.1.0',
      description:
          'Simple api for handling notes',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
      contact: {
        name: 'Todo Demo',
        url: 'https://github.com/skoskosko/todo-demo',
        email: 'esko.takku@gmail.com'
      }
    },
    servers: [
      {
        url: '/api'
      }
    ]
  },
  apis: ['./src/routes.ts', './src/entity/note.ts', './src/entity/user.ts', './dist/routes.js', './dist/entity/note.js', './dist/entity/user.js']
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
