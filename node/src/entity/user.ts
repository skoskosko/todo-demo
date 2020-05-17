import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

/** Users entity class */
@Entity()
export class User {
  /** Generated Id for User */
  @PrimaryGeneratedColumn()
  id: number;

  /** Users name */
  @Column({ type: 'varchar', length: 64 })
  name: string;

  /** Users last edit time. This will update on any change */
  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  lastEdited: Date;

  /** Users initial creation time. This will not be edited after creation */
  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;
}
