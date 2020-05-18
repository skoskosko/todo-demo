// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Gets single Note from database
 */
export async function deleteNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  const note = await noteManager.delete(request.params.noteId)
  if (note.affected === 0) {
    response.status(404)
    response.end()
    return
  }
  response.status(202).send('Accepted')
}
