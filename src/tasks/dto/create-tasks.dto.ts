import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  columnId: string;
}
