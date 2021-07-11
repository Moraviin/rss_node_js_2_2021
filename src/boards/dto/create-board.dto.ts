import { ApiProperty } from '@nestjs/swagger';
import { IColumnModel } from '../board.model';

export class CreateBoardDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  columns: IColumnModel[];
}
