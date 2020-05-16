import express from 'express'

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/**
 * @swagger
 * path:
 *  /:
 *    get:
 *      summary: Does nothing
 *      responses:
 *        "200":
 *          description: Test rest response
 */
router.get('/', function (req, res) {
  res.status(200).send('Test Rest')
})

export = router
