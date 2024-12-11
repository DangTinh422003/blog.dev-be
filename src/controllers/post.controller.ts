import { postService } from '@/services';
import { Request, Response } from 'express';

class PostController {
  async createPost(req: Request, res: Response) {
    const { title, content, author, image } = req.body;
    const { data, message, status } = await postService.createPost({
      title,
      content,
      author,
      image,
    });
    const post = data!;
    res.send({
      message: message,
      status: status,
      data: {
        post: post.post,
      },
    });
  }
  async getPosts(req: Request, res: Response) {
    const { data } = await postService.getPosts();
    const postHolder = data!;
    res.send({
      data: {
        posts: postHolder.posts,
      },
    });
  }
  async getPostById(req: Request, res: Response) {
    const { postId } = req.params;
    const { data } = await postService.getPostById(postId);
    const postHolder = data!;
    res.send({
      data: {
        post: postHolder.post,
      },
    });
  }
  async updatePost(req: Request, res: Response) {
    const { postId } = req.params;
    const { title, content, author, image } = req.body;
    const { data } = await postService.updatePost({
      postId,
      title,
      content,
      author,
      image,
    });
    const postHolder = data!;
    res.send({
      data: {
        post: postHolder.post,
      },
    });
  }
  async deletePost(req: Request, res: Response) {
    const { postId } = req.params;
    const { data } = await postService.deletePost(postId);
    const postHolder = data!;
    res.send({
      data: {
        post: postHolder.post,
      },
    });
  }
}

const postController = new PostController();
export default postController;
