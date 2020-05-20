// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'

/**
 * Updates User
 */
export async function postUser (request: Request, response: Response) {
  const userManager = getManager().getRepository(User)
  const oldUser: User|null = await userManager.findOne(request.params.userId)
  if (!oldUser) {
    response.status(404).end()
    return
  }
  await userManager.update(oldUser, request.body)
  response.send('OK')
}
