// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Deletes Note
 * Also includes custom handling for ordering of the notes.
 * If note with followers is deleted. Notes current folowers (null or defined) will be transferred
 */
export async function deleteNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  const note: Note|null = await noteManager.findOne(request.params.noteId, { relations: ['after'] })
  if (!note) {
    response.status(404).end()
    return
  }
  const myOldFollower: Note|null = await noteManager.findOne({ where: [{ after: note }] })
  if (myOldFollower) {
    const iWasAfter: Note|null = note.after
    await noteManager.update(note, { after: null })
    await noteManager.update(myOldFollower, { after: iWasAfter })
  }
  await noteManager.delete(request.params.noteId)
  response.status(202).send('Accepted')
}
