import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = new Question();
    const category = await this.categoryRepository.findOne({
      id: createQuestionDto.categoryId,
    });
    question.title = createQuestionDto.title;
    question.content = createQuestionDto.content;
    question.category = category;
    question.postTime = new Date();
    return this.questionRepository.save(question);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionRepository.findOne(id);
    const category = await this.categoryRepository.findOne({
      id: updateQuestionDto.categoryId,
    });
    question.title = updateQuestionDto.title;
    question.content = updateQuestionDto.content;
    question.category = category;
    return this.questionRepository.save(question);
  }

  findAll() {
    return this.questionRepository.find();
  }

  findOne(id: number) {
    return this.questionRepository.findOne(id);
  }

  remove(id: number) {
    return this.questionRepository.delete(id);
  }
}
