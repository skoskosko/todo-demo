// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'

/**
 * Deletes user
 */
export async function deleteUser (request: Request, response: Response) {
  const userManager = getManager().getRepository(User)
  const user: User|null = await userManager.findOne(request.params.userId)
  if (!user) {
    response.status(404).end()
    return
  }
  await userManager.delete(request.params.userId)
  response.status(202).send('Accepted')
}
