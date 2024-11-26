import { Request, Response } from 'express';
import ms from 'ms';

import { OkResponse } from '@/core/success.response';
import accessService from '@/services/access.service';

class AccessController {
  async signUp(req: Request, res: Response) {
    res.send(await accessService.signUp(req.body));
  }

  async signIn(req: Request, res: Response) {
    const { data } = await accessService.signIn(req.body);
    const userHolder = data!;

    res.cookie('accessToken', userHolder.token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.cookie('refreshToken', userHolder.token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.send({
      data: {
        user: userHolder.user,
      },
    });
  }

  async signOut(req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.send(new OkResponse('Sign out successfully'));
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const { data, ...rest } = await accessService.refreshToken(refreshToken);

    res.cookie('accessToken', data!.token.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.cookie('refreshToken', data!.token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    console.log('🚀 ~ AccessController ~ refreshToken ~ data:', data);

    res.send({ data });
  }
}

const accessController = new AccessController();
export default accessController;
