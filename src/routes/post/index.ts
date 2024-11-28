import express from 'express';
import { handleError } from '@/middlewares/handleError';
import { isAuthenticated } from '@/middlewares/authentication';
import postValidation from '@/validations/post.validation';
import postController from '@/controllers/post.controller';

const postRouter = express.Router();

postRouter.post(
  '/create-post',
  handleError(postValidation.createPost),
  handleError(postController.createPost),
);
postRouter.get('/get-posts', handleError(postController.getPosts));
postRouter.get('/get-post/:postId', handleError(postController.getPostById));
postRouter.put(
  '/update-post',
  handleError(postValidation.updatePost),
  handleError(postController.updatePost),
);
postRouter.delete(
  '/delete-post/:postId',
  handleError(postController.deletePost),
);

export default postRouter;
