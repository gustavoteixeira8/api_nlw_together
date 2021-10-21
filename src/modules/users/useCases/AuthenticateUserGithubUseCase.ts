import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { HttpRequestProviderProtocol } from '@shared/providers/requestProvider/HttpRequestProviderProtocol';
import { TokenProviderProtocol } from '@shared/providers/tokenProvider/TokenProviderProtocol';
import { inject, injectable } from 'tsyringe';
import { UserRepositoryProtocol } from '../domain/repositories/UserRepositoryProtocol';
import { AuthUserGithubRequest } from '../domain/useCases/AuthUserGithubRequest';
import { AuthUserResponse } from '../domain/useCases/AuthUserResponse';
import { GithubAccessTokenResponse } from '../domain/useCases/GithubAccessTokenReponse';
import { GithubUserResponse } from '../domain/useCases/GithubUserResponse';

@injectable()
export class AuthenticateUserGithubUseCase {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryProtocol,
    @inject('TokenProvider')
    private readonly _tokenProvider: TokenProviderProtocol,
    @inject('HttpRequestProvider')
    private readonly _httpRequest: HttpRequestProviderProtocol,
  ) {}

  public async execute({ code }: AuthUserGithubRequest): Promise<AuthUserResponse> {
    if (!code || typeof code !== 'string') throw new AppError('Github code are required', 400);

    const { data: accessToken } = await this._httpRequest
      .post<GithubAccessTokenResponse>(authConfig.github.urlToAccessToken, null, {
        params: {
          client_id: authConfig.github.clientId,
          client_secret: authConfig.github.clientSecret,
          code,
        },
        headers: { Accept: 'application/json' },
      })
      .catch((error) => {
        throw new AppError(error.message, error.response.status || 400);
      });

    const { data: userData } = await this._httpRequest
      .get<GithubUserResponse>(authConfig.github.urlToGetUser, {
        headers: { Authorization: `Bearer ${accessToken.access_token}` },
      })
      .catch((error) => {
        throw new AppError(error.message, error.response.status || 400);
      });

    const { id, login, avatar_url } = userData;

    let user = await this._userRepository.findByGithubId(userData.id);

    if (!user) {
      user = await this._userRepository.create({
        githubId: id,
        username: login,
        avatar: avatar_url,
        createdAt: new Date(),
      });
    }

    const token = this._tokenProvider.sign(
      { githubId: user.githubId, userId: user.id },
      { expiresIn: '2d' },
    );

    return { token, user };
  }
}
