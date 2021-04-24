import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answerID: number;
  @Column({ type: 'varchar', length: 500 })
  content: string;
  @Column({ type: 'datetime' })
  postTime: Date;
  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn()
  question: Question;
  @ManyToOne(() => User, user => user.answers)
  @JoinColumn()
  user: User;
}
