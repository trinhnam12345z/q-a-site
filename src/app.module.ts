import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'trinhnam',
      password: '12345678',
      database: 'qasite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    QuestionsModule,
    AnswersModule,
    UsersModule,
  ],
})
export class AppModule {}
