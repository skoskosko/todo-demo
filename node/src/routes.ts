import express from 'express'
import { getNotes } from './controller/getNotes'
import { getNote } from './controller/getNote'
import { putNote } from './controller/putNote'
import { deleteNote } from './controller/deleteNote'
import { postNote } from './controller/postNote'

import { getUsers } from './controller/getUsers'
import { getUser } from './controller/getUser'
import { putUser } from './controller/putUser'
import { deleteUser } from './controller/deleteUser'
import { postUser } from './controller/postUser'

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now(), ' ', req.originalUrl)
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

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Handling Notes
 */

/**
 * @swagger
 * path:
 *  /notes:
 *    get:
 *      summary: Gets all notes
 *      tags: [Notes]
 *      responses:
 *        "200":
 *          description: Array of all notes
 */
router.get('/notes', getNotes)

/**
 * @swagger
 * path:
 *  /notes/{noteId}:
 *    get:
 *      summary: Gets specific note
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: noteId
 *          schema:
 *            type: number
 *          requred: true
 *          description: Id of the note.
 *      responses:
 *        "200":
 *          description: single note object
 *        "404":
 *          description: Item with given id was not found
 */
router.get('/notes/:noteId', getNote)

/**
 * @swagger
 * path:
 *  /notes/:
 *    put:
 *      summary: Create a new note
 *      tags: [Notes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      responses:
 *        "200":
 *          description: A note schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Note'
 *        "400":
 *          description: Body not found
 */
router.put('/notes', putNote)

/**
 * @swagger
 * path:
 *  /notes/{noteId}:
 *    delete:
 *      summary: Deletes Note
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: noteId
 *          schema:
 *            type: number
 *          requred: true
 *          description: Id of the note to be deleted.
 *      responses:
 *        "202":
 *          description: Object deleted
 *        "404":
 *          description: Item with given id was not found
 */
router.delete('/notes/:noteId', deleteNote)

/**
 * @swagger
 * path:
 *  /notes/{noteId}:
 *    post:
 *      summary: Create a new note
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: noteId
 *          schema:
 *            type: number
 *          requred: true
 *          description: Id of the note to be edited.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      responses:
 *        "200":
 *          description: A note schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Note'
 *        "400":
 *          description: Body not found
 */
router.post('/notes/:noteId', postNote)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Handling Users
 */

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      summary: Gets all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: Array of all users
 */
router.get('/users', getUsers)

/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    get:
 *      summary: Gets specific note
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: number
 *          requred: true
 *          description: Id of the user.
 *      responses:
 *        "200":
 *          description: single user object
 *        "404":
 *          description: Item with given id was not found
 */
router.get('/users/:userId', getUser)

/**
 * @swagger
 * path:
 *  /users/:
 *    put:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "400":
 *          description: Body not found
 */
router.put('/users', putUser)

/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    delete:
 *      summary: Deletes user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: number
 *          requred: true
 *          description: Id of the user to be deleted.
 *      responses:
 *        "202":
 *          description: Object deleted
 *        "404":
 *          description: Item with given id was not found
 */
router.delete('/users/:userId', deleteUser)

/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    post:
 *      summary: Create a new note
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: number
 *          requred: true
 *          description: Id of the user to be edited.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "400":
 *          description: Body not found
 */
router.post('/users/:userId', postUser)

export = router
