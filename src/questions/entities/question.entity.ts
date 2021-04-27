import { Answer } from 'src/answers/entities/answer.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  questionID: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  content: string;

  @Column({ type: 'datetime' })
  postTime: Date;

  @OneToMany(() => Answer, (answer) => answer.question, { eager: true })
  answers: Answer[];

  @OneToMany(() => Like, (like) => like.question, { eager: true })
  likes: Like[];
  
  @ManyToOne(() => User, user => user.questions, { eager: true })
  @JoinColumn()
  user: User;

}
