// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Gets single Note from database
 */
export async function getNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  const note = await noteManager.findOne(request.params.noteId, { relations: ['after', 'assignedTo'] })
  if (!note) {
    response.status(404)
    response.end()
    return
  }
  response.send(note)
}
