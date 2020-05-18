// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Gets all Notes from database
 */
export async function getNotes (_request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  const notes = await noteManager.find()
  response.send(notes)
}
