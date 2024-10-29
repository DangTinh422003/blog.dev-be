import { Request, Response } from 'express';
import accessService from '@/services/access.service';

class AccessController {
  async signUp(req: Request, res: Response) {
    res.send(await accessService.createAccount(req.body));
  }
}

const accessController = new AccessController();
export default accessController;
