import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    /** */
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({ type:'varchar', length: 300 })
    name: string;

    @OneToMany(() => Question, (question) => question.category, { eager: true })
    questions: Question[];
}
