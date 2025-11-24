import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create({
    createPostInput,
    authorId,
  }: {
    createPostInput: CreatePostInput;
    authorId: number;
  }) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        thumbnail: createPostInput.thumbnail ?? '',
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc', // 'desc' pour du plus récent au plus ancien
      },
      skip,
      take,
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async findByUser({
    userId,
    skip,
    take,
  }: {
    userId: number;
    skip: number;
    take: number;
  }) {
    return await this.prisma.post.findMany({
      orderBy: {
        updatedAt: 'desc', // 'desc' pour du plus récent au plus ancien, tri global liste des posts
      },
      where: {
        author: {
          id: userId,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true, // champ ajouter pout trier par date de mise a jour
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      take,
      skip,
    });
  }

  async userPostCount(userId: number) {
    return this.prisma.post.count({
      where: {
        authorId: userId,
      },
    });
  }

  async update({
    userId,
    updatePostInput,
  }: {
    userId: number;
    updatePostInput: UpdatePostInput;
  }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: updatePostInput.postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();
    const { postId, ...data } = updatePostInput;
    return await this.prisma.post.update({
      where: {
        id: updatePostInput.postId,
      },
      data: {
        ...data,
        updatedAt: new Date(), // ← S'assurer que c'est présent
        tags: {
          set: [],
          connectOrCreate: (updatePostInput.tags ?? []).map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async delete({ postId, userId }: { postId: number; userId: number }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    const result = await this.prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    return !!result;
  }
}
