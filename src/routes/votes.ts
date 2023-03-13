import { Router } from 'express';
import { voters, voteResults } from '../controllers/votes';
const router = Router({ mergeParams: true });

router.get('/voters', voters); // check username availability
router.get('/results', voteResults); // find username by address & solAddress

export default router;
