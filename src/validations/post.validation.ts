import { BadRequestError } from '@/core/error.response';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  postId: Joi.string(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  image: Joi.string().required(),
});

class PostValidation {
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title, content, author, image } = req.body;
    console.log(req.body);
    const { error } = schema.validate({
      title: title,
      content: content,
      author: author,
      image: image,
    });
    console.log(error);
    if (error) {
      throw new BadRequestError(error.message);
    }
    next();
  }
  async updatePost(req: Request, res: Response, next: NextFunction) {
    const { postId, title, content, author, image } = req.body;
    const { error } = schema.validate({
      postId,
      title,
      content,
      author,
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
