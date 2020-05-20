// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Note } from '../entity/note'

/**
 * Creates new note
 * Also hanfles placement of the note if defined on creation.
 * This should not be defined in normal situations so this action is kind of useless
 */
export async function putNote (request: Request, response: Response) {
  const noteManager = getManager().getRepository(Note)
  if (request.body) {
    var after : Note|null = null
    if (request.body.after !== undefined) {
      after = request.body.after
      request.body.after = null
    }
    const newNote: any = noteManager.create(request.body)
    await noteManager.save(newNote)
    if (after) {
      const afterNote: Note|null = await noteManager.findOne(after)
      const oldFollower: Note|null = await noteManager.findOne({ where: [{ after: after }] })
      if (oldFollower) { // old followers after needs to be updated
        await noteManager.update(oldFollower, { after: newNote.id })
      }
      await noteManager.update(newNote, { after: afterNote })
    }
    response.status(201).send(newNote)
  } else {
    response.status(400)
    response.end()
  }
}
