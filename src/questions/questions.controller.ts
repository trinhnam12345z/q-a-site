import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Headers } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Question")
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  create(@Headers("user_id") userId: number, @Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto, userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Get()
  findAll(@Headers("user_id") userId: number) {
    // console.log(userId);
    return this.questionsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionsService.remove(+id);
  }
}
