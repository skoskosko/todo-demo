// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user'
import { Note } from '../entity/note'

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
  const noteManager = getManager().getRepository(Note)
  const assignedNotes: Note[]|Note|null = await noteManager.findOne({ where: [{ assignedTo: user }] })
  if (Array.isArray(assignedNotes)) {
    for (var note of assignedNotes) {
      await noteManager.update(note, { assignedTo: null })
    }
  } else if (assignedNotes) {
    await noteManager.update(assignedNotes, { assignedTo: null })
  }

  await userManager.delete(request.params.userId)
  response.status(202).send('Accepted')
}
