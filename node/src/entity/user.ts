import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the user
 *        example:
 *           name: Swagger Name
 */
/** Users entity class */
@Entity()
export class User {
  /** Generated Id for User */
  @PrimaryGeneratedColumn()
  id: number;

  /** Users name */
  @Column({ type: 'varchar', length: 64 })
  name: string;
}
