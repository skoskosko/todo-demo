// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Gets single Note from database
 */
export async function postNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  const oldNote: Note|null = await noteManager.findOne(request.params.noteId, { relations: ['after'] })
  if (!oldNote) {
    response.status(404).end()
    return
  }

  if (oldNote.after == null && request.body.after !== undefined) {
    // move current follower to follow this note
    const oldFollower: Note|null = await noteManager.findOne({ where: [{ after: request.body.after }] })
    const myOldFollower: Note|null = await noteManager.findOne({ where: [{ after: oldNote }] })
    if (oldFollower) { // old followers after needs to be updated
      await noteManager.update(oldFollower, { after: oldNote })
    }
    await noteManager.update(myOldFollower, { after: null })
  } else if (oldNote.after !== null && request.body.after !== null) {
    // move current follower to follow this note
    const oldFollower: Note|null = await noteManager.findOne({ where: [{ after: request.body.after }] })
    const myOldFollower: Note|null = await noteManager.findOne({ where: [{ after: oldNote }] })
    const iFollowed = oldNote.after
    if (myOldFollower) {
      await noteManager.update(myOldFollower, { after: null })
      await noteManager.update(oldFollower, { after: oldNote })
      await noteManager.update(oldNote, { after: request.body.after })
      await noteManager.update(myOldFollower, { after: iFollowed })
    } else {
      await noteManager.update(oldFollower, { after: oldNote })
    }
  }
  await noteManager.update(oldNote, request.body)
  response.send('OK')
}
