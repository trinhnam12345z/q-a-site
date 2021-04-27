import { type } from 'node:os';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    /** */
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'varchar', length: 300 })
    name: string;

    @ManyToOne(type => Category, category => category.subcategory)
    category: Category;

    @OneToMany(type => Category, category => category.category)
    subcategory: Category[];

    @OneToMany(type => Question, (question) => question.category, { eager:true })
    questions: Question[];
}
