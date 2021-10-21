import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { Router } from 'express';
import { CreateTagController } from '../controllers/CreateTagController';
import { DeleteTagController } from '../controllers/DeleteTagController';
import { ListAllTagsController } from '../controllers/ListAllTagsController';

const tagRoutes = Router();

tagRoutes.post('/', ensureAuthentication, new CreateTagController().execute);
tagRoutes.get('/', new ListAllTagsController().execute);
tagRoutes.delete('/:tagId', ensureAuthentication, new DeleteTagController().execute);

export { tagRoutes };
