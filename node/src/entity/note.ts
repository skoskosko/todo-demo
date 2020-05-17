import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { User } from './user'

/** Notes Entity Class. */
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

  /** Notes last edit time. This will update on any change */
  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  lastEdited: Date;

  /** Notes initial creation time. This will not be edited after creation */
  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;
}
