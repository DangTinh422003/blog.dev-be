import { Request, Response } from 'express';
import ms from 'ms';

import { OkResponse } from '@/core/success.response';
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

  async signOut(req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.send(new OkResponse('Sign out successfully'));
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    const { data, ...rest } = await accessService.refreshToken(refreshToken);

    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('3h'),
    });

    res.send({ data, ...rest });
  }
}

const accessController = new AccessController();
export default accessController;
