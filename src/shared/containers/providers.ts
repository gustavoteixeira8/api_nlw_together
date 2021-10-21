import { HttpRequestProviderProtocol } from '@shared/providers/requestProvider/HttpRequestProviderProtocol';
import { AxiosProvider } from '@shared/providers/requestProvider/implementations/AxiosProvider';
import { container } from 'tsyringe';
import { HashProviderProtocol } from '../providers/hashProvider/HashProviderProtocol';
import { BcryptProvider } from '../providers/hashProvider/implementations/BcryptProvider';
import { JsonWebTokenProvider } from '../providers/tokenProvider/implementations/JsonWebTokenProvider';
import { TokenProviderProtocol } from '../providers/tokenProvider/TokenProviderProtocol';

container.registerSingleton<HashProviderProtocol>('HashProvider', BcryptProvider);
container.registerSingleton<TokenProviderProtocol>('TokenProvider', JsonWebTokenProvider);
container.registerSingleton<HttpRequestProviderProtocol>('HttpRequestProvider', AxiosProvider);
