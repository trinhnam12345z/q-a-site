import { Answer } from 'src/answers/entities/answer.entity';
import { Like } from 'src/like/entities/like.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 250 })
    fullName: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @Column({ type: 'varchar', length: 250 })
    password: string;

    @OneToMany(() => Question, question => question.user)
    questions: Question[];

    @OneToMany(() => Answer, answer => answer.user)
    answers: Answer[];

    @OneToMany(() => Like, (like) => like.user)
    liked: Like[];

}
