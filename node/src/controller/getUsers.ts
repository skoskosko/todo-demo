// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'

/**
 * Gets all Users from database
 */
export async function getUsers (_request: Request, response: Response) {
  const userManager = getManager().getRepository(User)
  const users = await userManager.find()
  response.send(users)
}
