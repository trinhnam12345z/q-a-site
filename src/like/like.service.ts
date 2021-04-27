import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }

  async create(createLikeDto: CreateLikeDto, userId: number): Promise<Like> {
    let like = await this.likeRepository.findOne({ where: { questionQuestionID: createLikeDto.questionId, userId } });
    console.log(like);
    if (!like) {
      like = new Like();
      const user = await this.userRepository.findOne(userId);
      const question = await this.questionRepository.findOne({ questionID: createLikeDto.questionId, });
      like.user = user;
      like.question = question;
      return this.likeRepository.save(like);
    } else {

      await this.likeRepository.update(
        {
          id: like.id
        },
        { isDelete: !like.isDelete });

        return like;
    }
  }

  async delete(id: number, updateLikeDto: UpdateLikeDto): Promise<Like> {
    const like = await this.likeRepository.findOne(id);
    like.isDelete = true;
    return this.likeRepository.save(like);
  }

  findAll() {
    return this.likeRepository.find({ isDelete: false });
  }

  findOne(id: number) {
    return this.likeRepository.findOne(id);
  }
}
