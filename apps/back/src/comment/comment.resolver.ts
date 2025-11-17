/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity)
  createComment(
    @Context() Context,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId: number = Context.req.user.id;
    return this.commentService.create(createCommentInput, authorId);
  }

  @Query(() => Int)
  postCommentCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.commentService.count(postId);
  }

  @Query(() => [CommentEntity])
  getPostComments(
    @Args('postId', { type: () => Int! }) postId: number,
    @Args('take', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_PAGE_SIZE,
    })
    take: number,
    @Args('skip', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
    })
    skip: number,
  ) {
    return this.commentService.findOneByPost({ postId, take, skip });
  }
}
