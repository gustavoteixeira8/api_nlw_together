export type PayloadProtocol = Record<string, any>;

export interface TokenOptions {
  subject?: string;
  expiresIn: string | number;
}

export interface TokenProviderProtocol {
  sign(payload: PayloadProtocol, options?: TokenOptions): string;
  verify(token: string): PayloadProtocol;
}
