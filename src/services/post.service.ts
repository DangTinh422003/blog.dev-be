import postModel from '@/models/post.model';
import { BadRequestError, ForbiddenError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import userModel from '@/models/user.model';

class PostService {
  async createPost({
    title,
    content,
    user,
    image,
  }: {
    title: string;
    content: string;
    user: string;
    image: string;
  }) {
    const checkUser = await userModel.findOne({ _id: user }).lean();
    if (!checkUser) {
      throw new ForbiddenError('User is not found');
    }
    const newPost = await postModel.create({
      title,
      content,
      user,
      image,
    });

    if (!newPost) {
      throw new BadRequestError('Create post failed');
    }
    return new OkResponse('Create post successfully');
  }

  async getPosts() {
    const posts = await postModel.find().populate('user', 'fullName').lean();
    if (!posts) {
      throw new BadRequestError('Get posts failed');
    }
    return new OkResponse('Get posts successfully', posts);
  }

  async getPostById(postId: string) {
    const post = await postModel
      .findById(postId)
      .populate('user', 'fullName')
      .lean();
    if (!post) {
      throw new BadRequestError('Post is not found');
    }
    return new OkResponse('Get post successfully', post);
  }

  async updatePost({
    postId,
    title,
    content,
    user,
    image,
  }: {
    postId: string;
    title: string;
    content: string;
    user: string;
    image: string;
  }) {
    const updatePost = await postModel.findByIdAndUpdate(postId, {
      title,
      content,
      user,
      image,
    });
    if (!updatePost) {
      throw new BadRequestError('Update post failed');
    }
    return new OkResponse('Update post successfully');
  }

  async deletePost(postId: string) {
    const deletePost = await postModel.findByIdAndDelete(postId);
    if (!deletePost) {
      throw new BadRequestError('Delete post failed');
    }
    return new OkResponse('Delete post successfully');
  }
}

const postService = new PostService();

export default postService;
