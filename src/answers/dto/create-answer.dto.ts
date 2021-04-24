import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  question: number;
}
