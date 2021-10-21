import { Router } from 'express';
import { AuthenticateUserGithubController } from '../controllers/AuthenticateUserGithubController';
import { GithubCallbackController } from '../controllers/GithubCallbackController';
import { GithubRedirectController } from '../controllers/GithubRedirectController';

const authRoutes = Router();

authRoutes.get('/github/redirect', new GithubRedirectController().execute);

authRoutes.get('/github/callback', new GithubCallbackController().execute);

authRoutes.post('/github', new AuthenticateUserGithubController().execute);

export { authRoutes };
