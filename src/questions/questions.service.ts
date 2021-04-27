import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) { }

  async create(createQuestionDto: CreateQuestionDto, userId: number): Promise<Question> {
    const user = await this.userRepository.findOne(userId);
    const question = new Question();
    question.title = createQuestionDto.title;
    question.content = createQuestionDto.content;
    question.postTime = new Date();
    question.user = user;
    return this.questionRepository.save(question);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionRepository.findOne(id);
    question.title = updateQuestionDto.title;
    question.content = updateQuestionDto.content;
    return this.questionRepository.save(question);
  }

  async findAll() {
    const qs = await this.questionRepository.find();
    return qs.map(q => {
      q.likes = q.likes.filter(l => !l.isDelete);
      return q;
    })
  }

  findOne(id: number) {
    return this.questionRepository.findOne(id);
  }

  remove(id: number) {
    return this.questionRepository.delete(id);
  }
}
