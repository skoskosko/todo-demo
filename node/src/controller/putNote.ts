// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Gets single Note from database
 */
export async function putNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  if (request.body) {
    const newNote = noteManager.create(request.body)
    await noteManager.save(newNote)
    response.send(newNote)
  } else {
    response.status(400)
    response.end()
  }
}
