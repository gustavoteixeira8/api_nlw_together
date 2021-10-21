export interface HashProviderProtocol {
  compare(hash: string, value: string): Promise<boolean>;
  generate(value: string): Promise<string>;
}
