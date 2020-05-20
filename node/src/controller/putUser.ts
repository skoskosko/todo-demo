// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'

/**
 * Creates new user
 */
export async function putUser (request: Request, response: Response) {
  const userManager = getManager().getRepository(User)
  if (request.body.name) {
    const newUser: any = userManager.create(request.body)
    await userManager.save(newUser)
    response.status(201).send(newUser)
  } else {
    response.status(400).end()
  }
}
