import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answerID: number;
  @Column({ type: 'varchar', length: 500 })
  content: string;
  @Column({ type: 'datetime' })
  postTime: Date;
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
