import request from 'supertest'
import app from '../src/app'

// describe('Post Endpoints', () => {
//   it('should create a new post', async () => {
//     const res = await request(app)
//       .post('/api/posts')
//       .send({
//         userId: 1,
//         title: ''
//       })
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toHaveProperty('post')
//   })
// })

describe('Get Endpoints', () => {
  it('should return 200', async () => {
    const res = await request(app)
      .get('/api/')
      .send()
    expect(res.statusCode).toEqual(200)
  })
})
