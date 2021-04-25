import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags("Answer")
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(@Headers("user_id") userId: number,@Body() createAnswerDto: CreateAnswerDto) {
  console.log(userId);
    return this.answersService.create(createAnswerDto,userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
