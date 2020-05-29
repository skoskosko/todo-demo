import request from 'supertest'
import app from '../src/app'
import { Note } from '../src/entity/note'
import { User } from '../src/entity/user'
import { createConnection } from 'typeorm'

describe('Executor', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'sqljs',
      entities: [
        Note,
        User
      ],
      logging: false,
      dropSchema: true, // Isolate each test case
      synchronize: true
    })
  })

  describe('get all users', () => {
    it('Should return empty array with 200', async () => {
      const res = await request(app)
        .get('/api/users')
        .send()
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(0)
    })
  })
  describe('put new user without body', () => {
    it('should return 400', async () => {
      const res = await request(app)
        .put('/api/users')
        .send({})
      expect(res.statusCode).toEqual(400)
    })
  })
  describe('put new user', () => {
    it('should return 201', async () => {
      const res = await request(app)
        .put('/api/users')
        .send({
          name: 'test user'
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('name')
    })
  })
  describe('get user', () => {
    it('should return our user', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .send()
      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual('test user')
    })
  })
  describe('put notes', () => {
    it('should return 201', async () => {
      for (var i = 1; i <= 5; i++) {
        const res = await request(app)
          .put('/api/notes')
          .send({
            title: 'Note ' + i,
            text: 'Text for the body'
          })
        expect(res.statusCode).toEqual(201)
      }
    })
  })
  describe('get 5 notes', () => {
    it('should return 200', async () => {
      for (var i = 1; i <= 5; i++) {
        const res = await request(app)
          .get('/api/notes')
          .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(5)
      }
    })
  })
  describe('Assign user to note', () => {
    it('should return 200', async () => {
      const res = await request(app)
        .post('/api/notes/3')
        .send({
          assignedTo: 1
        })
      expect(res.statusCode).toEqual(200)
    })
  })
  describe('Check assignee', () => {
    it('should return 200', async () => {
      const res = await request(app)
        .get('/api/notes/3')
        .send()
      expect(res.statusCode).toEqual(200)
      expect(res.body.assignedTo.id).toEqual(1)
    })
  })
  describe('Set Note order', () => {
    it('should return 200', async () => {
      const res = await request(app)
        .post('/api/notes/order')
        .send({
          order: [4, 1, 3, 2, 0]
        })
      expect(res.statusCode).toEqual(200)
    })
  })
  describe('Check Note order', () => {
    it('should return 200', async () => {
      const assumedOrder = [2, 4, 3, 1, null]
      for (var i = 1; i <= 5; i++) {
        const res = await request(app)
          .get('/api/notes/' + i)
          .send()
        expect(res.statusCode).toEqual(200)
        if (res.body.after) {
          expect(res.body.after.id).toEqual(assumedOrder[i])
        }
      }
    })
  })
  describe('Delete User', () => {
    it('should return 202', async () => {
      const res = await request(app)
        .delete('/api/users/1')
        .send()
      expect(res.statusCode).toEqual(202)
    })
  })
  describe('Delete Notes', () => {
    it('should return 202', async () => {
      for (var i = 1; i <= 5; i++) {
        const res = await request(app)
          .delete('/api/notes/' + i)
          .send()
        expect(res.statusCode).toEqual(202)
      }
    })
  })
})
