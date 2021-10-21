import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { Router } from 'express';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { ShowMeController } from '../controllers/ShowMeController';
import { ShowUserController } from '../controllers/ShowUserController';

const userRoutes = Router();

userRoutes.get('/me', ensureAuthentication, new ShowMeController().execute);
userRoutes.get('/:userId', new ShowUserController().execute);
userRoutes.delete('/', ensureAuthentication, new DeleteUserController().execute);

export { userRoutes };
