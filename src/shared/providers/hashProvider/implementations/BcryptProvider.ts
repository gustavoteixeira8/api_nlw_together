import { HashProviderProtocol } from '../HashProviderProtocol';
import { compare, hash } from 'bcryptjs';

export class BcryptProvider implements HashProviderProtocol {
  private readonly _defaultSalt = 8;

  public async compare(hash: string, value: string): Promise<boolean> {
    return compare(value, hash);
  }

  public async generate(value: string): Promise<string> {
    return hash(value, this._defaultSalt);
  }
}
