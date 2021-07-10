import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'text', nullable: true })
  userId!: string;

  @Column()
  boardId!: string;

  @Column({ type: 'text', nullable: true })
  columnId!: string;
}
