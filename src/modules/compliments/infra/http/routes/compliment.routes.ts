import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { Router } from 'express';
import { CreateComplimentController } from '../controllers/CreateComplimentController';
import { DeleteComplimentController } from '../controllers/DeleteComplimentController';
import { ListUserReceiveComplimentController } from '../controllers/ListUserReceiveComplimentController';
import { ListUserSendComplimentController } from '../controllers/ListUserSendComplimentController';

const complimentRoutes = Router();

complimentRoutes.post('/', ensureAuthentication, new CreateComplimentController().execute);
complimentRoutes.get(
  '/user_receive',
  ensureAuthentication,
  new ListUserReceiveComplimentController().execute,
);
complimentRoutes.delete(
  '/:complimentId',
  ensureAuthentication,
  new DeleteComplimentController().execute,
);
complimentRoutes.get(
  '/user_send',
  ensureAuthentication,
  new ListUserSendComplimentController().execute,
);

export { complimentRoutes };
