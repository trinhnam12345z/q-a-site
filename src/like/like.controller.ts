import { Controller, Get, Post, Body, Patch, Param, Delete ,Headers} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Like")
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Headers("user_id") userId: number,@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto,userId);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }


}
