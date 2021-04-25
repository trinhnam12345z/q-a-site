import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createAnswerDto: CreateAnswerDto, userId: number): Promise<Answer> {
    const answer = new Answer();
    const question = await this.questionRepository.findOne({ questionID: createAnswerDto.question, });
    const user = await this.userRepository.findOne(userId);
    answer.content = createAnswerDto.content;
    answer.question = question;
    answer.postTime = new Date();
    answer.user = user;
    return this.answerRepository.save(answer);
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOne(id);
    const question = await this.questionRepository.findOne({
      questionID: updateAnswerDto.question,
    });
    answer.content = updateAnswerDto.content;
    answer.question = question;
    answer.postTime = new Date();
    return this.answerRepository.save(answer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  findOne(id: number) {
    return this.answerRepository.findOne(id);
  }

  remove(id: number) {
    return this.answerRepository.delete(id);
  }
}
