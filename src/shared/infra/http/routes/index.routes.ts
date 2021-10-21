import { Router } from 'express';
import { authRoutes } from '@modules/users/infra/http/routes/auth.routes';
import { userRoutes } from '@modules/users/infra/http/routes/user.routes';
import { tagRoutes } from '@modules/tags/infra/http/routes/tag.routes';
import { complimentRoutes } from '@modules/compliments/infra/http/routes/compliment.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/tags', tagRoutes);
routes.use('/compliments', complimentRoutes);

export { routes };
