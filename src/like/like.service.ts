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

  async like(createLikeDto: CreateLikeDto, userId: number): Promise<Like> {
    const like = new Like();
    const user = await this.userRepository.findOne(userId);
    const question = await this.questionRepository.findOne({ questionID: createLikeDto.questionId, }); 
    like.user = user;
    like.question = question;
    return this.likeRepository.save(like);
  }





  async create(createLikeDto: CreateLikeDto, userId: number): Promise<Like> {
    const like = new Like();
    const user = await this.userRepository.findOne(userId);
    const question = await this.questionRepository.findOne({ questionID: createLikeDto.questionId, }); 
    console.log(user);
    console.log(question);
    like.user = user;
    like.question = question;
    return this.likeRepository.save(like);
  }

  async delete(id: number, updateLikeDto: UpdateLikeDto): Promise<Like> {
    const like = await this.likeRepository.findOne(id);
    like.isDelete = true;
    return this.likeRepository.save(like);
  }

  findAll() {
    return this.likeRepository.find({isDelete:false});
  }

  findOne(id: number) {
    return this.likeRepository.findOne(id);
  }
}
