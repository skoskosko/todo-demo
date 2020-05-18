// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Gets single Note from database
 */
export async function postNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  await noteManager.update(request.params.noteId, request.body)
  response.send('OK')
}
