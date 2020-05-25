// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Updates Notes
 * Not updating after
 */
export async function postNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  if (request.body.after) delete request.body.after
  await noteManager.update(request.params.noteId, request.body)
  response.send('OK')
}
