import express, {NextFunction, Request, Response} from 'express';
import { getLogger } from '@/utils/loggers';
const router = express.Router();
const logger = getLogger('INDEX_ROUTE');

/* GET home page. */
router.get('/', function (req:Request, res:Response, next:NextFunction) {

  logger.info('hello Express');
  res.render('index', { title: 'Express' });
});

export default router;
