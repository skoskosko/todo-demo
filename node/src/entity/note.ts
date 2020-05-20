import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { User } from './user'

/** Notes Entity Class. */
/**
 * @swagger
 *  components:
 *    schemas:
 *      Note:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *            description: Title of the note.
 *          text:
 *            type: string
 *            description: text body of the node.
 *          assignedTo:
 *            type: number
 *            description: Id of the user note is assigned to.
 *          after:
 *            type: number
 *            description: id of the note this note is placed under.
 *        example:
 *           title: Swagger Note
 *           text: This note was created with swagger
 */
@Entity()
export class Note {
  /** Generated Id for Note */
  @PrimaryGeneratedColumn()
  id: number;

  /** Notes title */
  @Column({ type: 'varchar', length: 100, default: 'New Note' })
  title: string;

  /** Notes body contents */
  @Column({ type: 'text', default: 'Note Body' })
  text: string;

  /** Id of User this note is assigned to */
  @ManyToOne(type => User)
  @JoinColumn()
  assignedTo: User;

  /** Notes order for the gui Id for the note whichafter this note is held. If Null note is treated as the first item. */
  @OneToOne(type => Note)
  @JoinColumn()
  after: Note;
}
