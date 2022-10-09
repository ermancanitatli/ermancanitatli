import express, {NextFunction, Request, Response} from 'express';

const router = express.Router();


/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {

    res.send('For Case Story - Erman Canıtatlı');

});

export default router;
