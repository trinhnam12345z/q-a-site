import { Answer } from 'src/answers/entities/answer.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

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
  @ManyToOne(() => Category, (category) => category.questions)
  category: Category;
}
