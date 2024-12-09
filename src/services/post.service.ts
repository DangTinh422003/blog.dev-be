import { BadRequestError, NotFoundError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import { postRepo, userRepo } from '@/repository';

class PostService {
  async createPost({
    title,
    content,
    author,
    image,
  }: {
    title: string;
    content: string;
    author: string;
    image: string;
  }) {
    const checkAuthor = await userRepo.findUserById(author);
    if (!checkAuthor) {
      throw new NotFoundError('User is not found');
    }
    const newPost = await postRepo.createPost({
      title,
      content,
      author,
      image,
    });

    if (!newPost) {
      throw new BadRequestError('Create post failed');
    }
    return new OkResponse('Create post successfully', { post: newPost });
  }

  async getPosts() {
    const posts = await postRepo.getAllPostWithAuthor();
    if (!posts) {
      throw new BadRequestError('Get posts failed');
    }
    return new OkResponse('Get posts successfully', { posts });
  }

  async getPostById(postId: string) {
    const post = await postRepo.getPostDetailByIdWithAuthor(postId);
    if (!post) {
      throw new BadRequestError('Post is not found');
    }
    return new OkResponse('Get post successfully', { post });
  }

  async updatePost({
    postId,
    title,
    content,
    author,
    image,
  }: {
    postId: string;
    title: string;
    content: string;
    author: string;
    image: string;
  }) {
    const needUpdatePost = await postRepo.getPostById(postId);
    if (!needUpdatePost) {
      throw new NotFoundError('Post is not found');
    }
    if (needUpdatePost.author.toString() !== author) {
      throw new BadRequestError('You dont have permission to update this post');
    }
    const updatePost = await postRepo.updatePostById(postId, {
      title,
      content,
      author,
      image,
    });
    if (!updatePost) {
      throw new BadRequestError('Update post failed');
    }
    return new OkResponse('Update post successfully', { post: updatePost });
  }

  async deletePost(postId: string) {
    const deletePost = await postRepo.deletePostById(postId);
    if (!deletePost) {
      throw new BadRequestError('Delete post failed');
    }
    return new OkResponse('Delete post successfully', { post: deletePost });
  }
}

const postService = new PostService();

export default postService;
