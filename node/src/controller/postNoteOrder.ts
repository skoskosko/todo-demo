// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Updates Notes
 * Only for order
 */
export async function postNoteOrder (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  await noteManager.update(request.body.order, { after: null })
  const notes = await noteManager.find() 
  for (let i = 1; i < notes.length; i++) {
    await noteManager.update(request.body.order[i], { after: request.body.order[i - 1] })
  }
  response.send('OK')
}
