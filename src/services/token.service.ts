import JWT from 'jsonwebtoken';

class TokenService {
  async generateToken<T extends string | object | Buffer>(
    payload: T,
    privateKey: string,
    expiresIn: string,
  ) {
    return JWT.sign(payload, privateKey, { expiresIn, algorithm: 'HS256' });
  }

  async verifyToken<T>(token: string, privateKey: string) {
    return JWT.verify(token, privateKey) as T;
  }
}

const tokenService = new TokenService();
export default tokenService;
