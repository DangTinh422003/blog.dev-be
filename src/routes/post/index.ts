import express from 'express';
import { handleError } from '@/middlewares/handleError';
import { postController } from '@/controllers';
import { postValidation } from '@/validations';

const postRouter = express.Router();

postRouter.post(
  '/create',
  handleError(postValidation.createPost),
  handleError(postController.createPost),
);
postRouter.get('/posts', handleError(postController.getPosts));
postRouter.get('/detail/:postId', handleError(postController.getPostById));
postRouter.put(
  '/update/:postId',
  handleError(postValidation.updatePost),
  handleError(postController.updatePost),
);
postRouter.delete('/delete/:postId', handleError(postController.deletePost));

export default postRouter;
