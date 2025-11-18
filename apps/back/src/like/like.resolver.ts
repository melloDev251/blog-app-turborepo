/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.likePost({ postId, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.unlikePost({ postId, userId });
  }

  @Query(() => Int)
  postLikesCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.likeService.getPostLikesCount(postId);
  }

  // @Query(() => Object) // ou créez un type spécifique
  // async getPostLikeData(@Args('postId', { type: () => Int! }) postId: number) {
  //   const likeCount = await this.likeService.getPostLikesCount(postId);

  //   // Pour les utilisateurs non connectés, userLikedPost est toujours false
  //   return {
  //     likeCount,
  //     userLikedPost: false,
  //   };
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikedPost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.userLikedPost({ postId, userId });
  }
}
