import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class AppModule {}
