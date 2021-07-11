import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IColumnModel } from '../boards/board.model';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('jsonb')
  columns!: IColumnModel[];
}
