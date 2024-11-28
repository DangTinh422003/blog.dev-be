import postService from '@/services/post.service';
import { Request, Response } from 'express';

class PostController {
  async createPost(req: Request, res: Response) {
    const { title, content, user, image } = req.body;
    res.send(await postService.createPost({ title, content, user, image }));
  }
  async getPosts(req: Request, res: Response) {
    res.send(await postService.getPosts());
  }
  async getPostById(req: Request, res: Response) {
    const { postId } = req.params;
    res.send(await postService.getPostById(postId));
  }
  async updatePost(req: Request, res: Response) {
    const { postId, title, content, user, image } = req.body;
    res.send(
      await postService.updatePost({ postId, title, content, user, image }),
    );
  }
  async deletePost(req: Request, res: Response) {
    const { postId } = req.params;
    res.send(await postService.deletePost(postId));
  }
}

const postController = new PostController();
export default postController;
