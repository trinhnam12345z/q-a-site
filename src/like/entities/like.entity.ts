import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default : false})
    isDelete:boolean;

    @Column()
    questionQuestionID : number;
    
    @Column()
    userId : number;

    @ManyToOne(() => Question, (question) => question.likes)
    @JoinColumn()
    question: Question;

    @ManyToOne(() => User, (user) => user.liked, { eager: true } )
    @JoinColumn()
    user: User;
}
