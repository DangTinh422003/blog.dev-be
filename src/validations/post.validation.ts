import { BadRequestError } from '@/core/error.response';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  postId: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  user: Joi.string().required(),
  image: Joi.string().required(),
});

class PostValidation {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content, user, image } = req.body;
    const { error } = schema.validate({
      title,
      content,
      user,
      image,
    });
    if (error) {
      throw new BadRequestError(error.message);
    }
    next();
  }
  async updatePost(req: Request, res: Response, next: NextFunction) {
    const { postId, title, content, user, image } = req.body;
    const { error } = schema.validate({
      postId,
      title,
      content,
      user,
      image,
    });
    if (error) {
      throw new BadRequestError(error.message);
    }
    next();
  }
  async deletePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { error } = schema.validate({
      postId,
    });
    if (error) {
      throw new BadRequestError(error.message);
    }
    next();
  }
}

const postValidation = new PostValidation();
export default postValidation;
