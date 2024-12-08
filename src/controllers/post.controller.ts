import postService from '@/services/post.service';
import { Request, Response } from 'express';

class PostController {
  async createPost(req: Request, res: Response) {
    const { title, content, author, image } = req.body;
    const { data, ...rest } = await postService.createPost({
      title,
      content,
      author,
      image,
    });
    const post = data!;
    res.send({
      ...rest,
      data: {
        post: post.post,
      },
    });
  }
  async getPosts(req: Request, res: Response) {
    res.send(await postService.getPosts());
  }
  async getPostById(req: Request, res: Response) {
    const { postId } = req.params;
    res.send(await postService.getPostById(postId));
  }
  async updatePost(req: Request, res: Response) {
    const { postId } = req.params;
    const { title, content, author, image } = req.body;
    res.send(
      await postService.updatePost({ postId, title, content, author, image }),
    );
  }
  async deletePost(req: Request, res: Response) {
    const { postId } = req.params;
    res.send(await postService.deletePost(postId));
  }
}

const postController = new PostController();
export default postController;
