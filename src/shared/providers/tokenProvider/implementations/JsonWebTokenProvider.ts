import { authConfig } from '@config/auth';
import { sign, verify } from 'jsonwebtoken';
import { PayloadProtocol, TokenOptions, TokenProviderProtocol } from '../TokenProviderProtocol';

export class JsonWebTokenProvider implements TokenProviderProtocol {
  private readonly _jwtSecret = authConfig.jwt.secretKey;

  public sign(payload: PayloadProtocol, options?: TokenOptions): string {
    return sign(payload, this._jwtSecret, options);
  }

  public verify(token: string): PayloadProtocol {
    return verify(token, this._jwtSecret) as PayloadProtocol;
  }
}
