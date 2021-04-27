import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/like/entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, User, Like])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule { }
