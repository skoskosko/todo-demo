// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'

/**
 * Gets single User from database
 */
export async function getUser (request: Request, response: Response) {
  const userManager = getManager().getRepository(User)
  const user = await userManager.findOne(request.params.userId)
  if (!user) {
    response.status(404)
    response.end()
    return
  }
  response.send(user)
}
