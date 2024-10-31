import { Request, Response } from 'express';
import ms from 'ms';

import accessService from '@/services/access.service';

class AccessController {
  async signUp(req: Request, res: Response) {
    res.send(await accessService.createAccount(req.body));
  }

  async signIn(req: Request, res: Response) {
    const { data, ...rest } = await accessService.login(req.body);

    res.cookie('accessToken', data.token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('3h'),
    });

    res.cookie('refreshToken', data.token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.send({ data, ...rest });
  }
}

const accessController = new AccessController();
export default accessController;
