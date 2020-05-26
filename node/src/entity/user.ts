import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

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
/** Users entity class
 *  This class is quite useless atm.
 *  It will be more useful if application is extended to support authentication.
 */
@Entity()
@Unique(['name'])
export class User {
  /** Generated Id for User */
  @PrimaryGeneratedColumn()
  id: number;

  /** Users name */
  @Column({ type: 'varchar', length: 64 })
  name: string;
}
